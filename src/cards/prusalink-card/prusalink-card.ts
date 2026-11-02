import { html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import setupCustomlocalize from '../../localize';
import { getDeviceEntityIds, isPrusaLinkEntity, PRUSALINK_PLATFORM } from '../../utils/deviceEntities';
import { renderIcon } from '../../utils/icons';
import { activeImageId, isFresh, needsResolve } from '../../utils/media';
import {
  formatPercent,
  formatTemperature,
  isButtonAvailable,
  isJobActive,
  isPowerOffAllowed,
  isValidState,
  parseFinish,
  pickMainControl,
  progressText,
  toNumber,
} from '../../utils/printerDisplay';
import { resolvePrinterEntities } from '../../utils/printerEntities';
import { PrusaLinkCardStyles } from './prusalink-card-styles';
import type { HomeAssistant } from '../../types/HomeAssistant';
import type { PrinterEntities } from '../../utils/printerEntities';
import type { HassEntity } from 'home-assistant-js-websocket';
import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import './prusalink-card-editor';

const CARD_TAG = 'prusalink-card';
const TICK_MS = 30 * 1000;

type Confirm = 'power_off' | 'cancel_print' | 'printer_busy';

@customElement(CARD_TAG)
export class PrusaLinkCard extends LitElement {
  @property({ attribute: false })
  public hass?: HomeAssistant;

  @state()
  private _config?: PrusaLinkCardConfig;

  @state()
  private _now = new Date();

  @state()
  private _confirm?: Confirm;

  @state()
  private _previewOpen = false;

  // picture URL that failed to load (the camera has no image while the printer is idle); a new URL is tried again
  @state()
  private _previewFailed?: string;

  // URL of the socket picture (the media-source id of the config, resolved to a signed URL)
  @state()
  private _imageUrl?: string;

  private _imageId?: string;
  private _imageResolvedAt = 0;
  private _imageResolving = false;
  private _imageRetried = false;

  private _timer?: ReturnType<typeof setInterval>;

  public static styles: CSSResultGroup = PrusaLinkCardStyles;

  public setConfig(config: PrusaLinkCardConfig): void {
    if (!config?.entity) {
      throw new Error(`${CARD_TAG}: "entity" is required`);
    }
    this._config = config;
  }

  // Sections view: the printer block takes 2 grid rows, the socket block (a Tile card copy) 1 more.
  public getGridOptions(): { columns: number; min_columns: number; rows: number; min_rows: number } {
    const rows = this._hasSwitch ? 3 : 2;
    return { columns: 12, min_columns: 6, rows, min_rows: rows };
  }

  // Masonry view: same number of rows as in the sections view
  public getCardSize(): number {
    return this._hasSwitch ? 3 : 2;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('prusalink-card-editor');
  }

  public static getStubConfig(hass: HomeAssistant, entities: string[], entitiesFallback: string[]): PrusaLinkCardConfig {
    const entityId = [...entities, ...entitiesFallback].find((id) => isPrusaLinkEntity(hass, id));
    if (!entityId) {
      throw new Error(`No ${PRUSALINK_PLATFORM} entity available`);
    }
    return { type: `custom:${CARD_TAG}`, entity: resolvePrinterEntities(getDeviceEntityIds(hass, entityId)).state ?? entityId };
  }

  public static getEntitySuggestion(hass: HomeAssistant, entityId: string): { label: string; config: PrusaLinkCardConfig } | null {
    return isPrusaLinkEntity(hass, entityId) ? { label: 'PrusaLink printer', config: { type: `custom:${CARD_TAG}`, entity: entityId } } : null;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    // "time remaining" is derived from the finish timestamp, which doesn't change while the clock ticks
    this._timer = setInterval(() => {
      this._now = new Date();
    }, TICK_MS);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    clearInterval(this._timer);
  }

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    this._updateMarquee();
    void this._syncImage();
  }

  // Resolves the configured picture to a URL: media-source ids become signed URLs that expire, so they are
  // resolved again after MEDIA_REFRESH_MS and when the picture fails to load (once per picture).
  private async _syncImage(): Promise<void> {
    const id = activeImageId(this._config);
    if (!id) {
      this._imageUrl = undefined;
      this._imageId = undefined;
      return;
    }
    if (this._imageResolving || isFresh(id, this._imageId, this._imageResolvedAt, Date.now())) return;
    if (id !== this._imageId) this._imageRetried = false;
    if (!needsResolve(id)) {
      this._imageId = id;
      this._imageResolvedAt = Date.now();
      this._imageUrl = id;
      return;
    }
    if (!this.hass) return;
    this._imageResolving = true;
    try {
      const resolved = await this.hass.callWS<{ url: string }>({ type: 'media_source/resolve_media', media_content_id: id });
      this._imageUrl = resolved.url;
    } catch {
      this._imageUrl = undefined;
    } finally {
      this._imageId = id;
      this._imageResolvedAt = Date.now();
      this._imageResolving = false;
    }
  }

  private _imageFailed(): void {
    if (this._imageRetried) {
      this._imageUrl = undefined;
      return;
    }
    this._imageRetried = true;
    this._imageResolvedAt = 0;
    void this._syncImage();
  }

  private get _hasSwitch(): boolean {
    return !!this._config?.switch_entity;
  }

  private get _entities(): PrinterEntities {
    return this.hass && this._config ? resolvePrinterEntities(getDeviceEntityIds(this.hass, this._config.entity)) : {};
  }

  // The preview picture, if the camera offers one that is loadable.
  private _previewPicture(entities: PrinterEntities): string | undefined {
    const picture = this._stateOf(entities.preview)?.attributes.entity_picture as string | undefined;
    return picture && picture !== this._previewFailed ? picture : undefined;
  }

  private _stateOf(entityId: string | undefined): HassEntity | undefined {
    return entityId ? this.hass?.states[entityId] : undefined;
  }

  // The file name scrolls back and forth only if it doesn't fit; the distance is the hidden overflow.
  private _updateMarquee(): void {
    const wrap = this.renderRoot.querySelector<HTMLElement>('.file-wrap');
    const file = this.renderRoot.querySelector<HTMLElement>('.file');
    if (!wrap || !file) return;
    const overflow = Math.ceil(file.scrollWidth - wrap.clientWidth);
    if (overflow > 0) {
      file.style.setProperty('--scroll-distance', `-${overflow}px`);
      file.style.setProperty('--scroll-duration', `${Math.max(6, overflow / 15 + 4)}s`);
      file.classList.add('marquee');
    } else {
      file.classList.remove('marquee');
    }
  }

  private _press(entityId: string | undefined): void {
    if (entityId) void this.hass?.callService('button', 'press', { entity_id: entityId });
  }

  private _powerOffAllowed(): boolean {
    return isPowerOffAllowed(this._stateOf(this._entities.state)?.state, toNumber(this._stateOf(this._entities.nozzle)));
  }

  // "switch off when possible" lives in Home Assistant (a helper and the automation created by the editor), so it
  // keeps working when no dashboard is open; the card only sets / clears the helper and shows its state.
  private get _pendingOffEntity(): string | undefined {
    const helper = this._config?.pending_off_entity;
    return this._stateOf(helper) ? helper : undefined;
  }

  private get _pendingOff(): boolean {
    return this._stateOf(this._pendingOffEntity)?.state === 'on';
  }

  private _setPendingOff(on: boolean): void {
    if (this._pendingOffEntity) void this.hass?.callService('input_boolean', on ? 'turn_on' : 'turn_off', { entity_id: this._pendingOffEntity });
  }

  private _scheduleOff(): void {
    this._confirm = undefined;
    this._setPendingOff(true);
  }

  private _iconTap(): void {
    if (this._pendingOff) {
      this._setPendingOff(false);
      return;
    }
    const switchState = this._stateOf(this._config?.switch_entity);
    if (!switchState || switchState.state === 'unavailable') return;
    if (switchState.state === 'on') {
      this._confirm = this._powerOffAllowed() ? 'power_off' : 'printer_busy';
    } else {
      void this.hass?.callService('switch', 'turn_on', { entity_id: switchState.entity_id });
    }
  }

  private _confirmed(): void {
    const action = this._confirm;
    this._confirm = undefined;
    if (action === 'power_off' && this._config?.switch_entity) {
      void this.hass?.callService('switch', 'turn_off', { entity_id: this._config.switch_entity });
    } else if (action === 'cancel_print') {
      this._press(this._entities.cancel);
    }
  }

  private _moreInfo(entityId: string | undefined): void {
    if (entityId) this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId }, bubbles: true, composed: true }));
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const localize = setupCustomlocalize(this.hass);
    const entities = this._entities;
    const printerState = this._stateOf(entities.state);

    return html`
      <ha-card>
        ${this._hasSwitch ? this._renderTile() : nothing}
        ${printerState ? this._renderPrinter(entities, printerState, localize) : html`<div class="block not-found">${localize('card.not_found')}</div>`}
      </ha-card>
      ${this._previewOpen ? this._renderPreview(entities, localize) : nothing} ${this._confirm ? this._renderConfirm(localize) : nothing}
    `;
  }

  // -- socket block: copy of the Tile card ------------------------------------

  private _renderTile(): TemplateResult | typeof nothing {
    const config = this._config as PrusaLinkCardConfig;
    const stateObj = this._stateOf(config.switch_entity);
    if (!stateObj) return html`<div class="block tile unavailable">${config.switch_entity}</div>`;

    const localize = setupCustomlocalize(this.hass);
    const on = stateObj.state === 'on';
    const unavailable = stateObj.state === 'unavailable';
    const name = config.name ?? (stateObj.attributes.friendly_name as string | undefined) ?? stateObj.entity_id;
    const extras = (config.secondary_entities ?? []).map((id) => this._stateOf(id)).filter((extra): extra is HassEntity => !!extra);
    const color = on ? 'var(--prusa-orange)' : 'var(--state-inactive-color)';

    return html`
      <div class="block tile ${unavailable ? 'unavailable' : ''}" style="--tile-color: ${color}">
        <div
          class="tile-icon ${unavailable ? '' : 'interactive'} ${this._pendingOff ? 'pending' : ''}"
          title=${this._pendingOff ? localize('card.waiting_off') : nothing}
          @click=${this._iconTap}
        >
          ${
            this._imageUrl
              ? html`<img src=${this._imageUrl} alt=${name} @error=${this._imageFailed} />`
              : config.icon
                ? html`<ha-icon .icon=${config.icon}></ha-icon>`
                : html`<ha-state-icon .hass=${this.hass} .stateObj=${stateObj}></ha-state-icon>`
          }
        </div>
        <ha-tile-info
          class="tile-info"
          @click=${this._iconTap}
          .primary=${name}
          .secondary=${html`<state-display .hass=${this.hass} .stateObj=${stateObj} .content=${config.state_content ?? ['state', 'last-changed']} .name=${name}></state-display
            >${extras.map((extra) => html` · <state-display .hass=${this.hass} .stateObj=${extra} .content=${['state']}></state-display>`)}`}
        ></ha-tile-info>
      </div>
    `;
  }

  // -- printer block ------------------------------------------------------------

  private _renderPrinter(entities: PrinterEntities, printerState: HassEntity, localize: (key: string) => string): TemplateResult {
    const picture = this._previewPicture(entities);
    const statusText = this.hass?.formatEntityState?.(printerState) ?? printerState.state;
    const filename = this._stateOf(entities.filename);
    const showFile = isJobActive(printerState.state) && isValidState(filename);

    return html`
      <div class="block printer ${printerState.state}">
        <div class="preview ${picture ? 'clickable' : ''}" @click=${() => picture && (this._previewOpen = true)} title=${picture ? localize('card.preview') : nothing}>
          ${
            picture
              ? html`<img src=${picture} alt=${localize('card.preview')} @error=${() => (this._previewFailed = picture)} />`
              : html`<ha-icon class="placeholder" icon="mdi:image-off-outline"></ha-icon>`
          }
        </div>
        <div class="details">
          <div class="status" @click=${() => this._moreInfo(printerState.entity_id)}>
            <span class="state">${statusText}</span>
            ${showFile ? html`<span class="sep">:&nbsp;</span><span class="file-wrap"><span class="file">${filename.state}</span></span>` : nothing}
          </div>
          ${this._renderControls(entities, localize)}
          <div class="temps">
            <span class="stat" title=${localize('card.nozzle')}
              >${renderIcon('status_nozzle')}${formatTemperature(toNumber(this._stateOf(entities.nozzle)), toNumber(this._stateOf(entities.nozzleTarget)))}</span
            >
            <span class="stat" title=${localize('card.heatbed')}
              >${renderIcon('status_heatbed')}${formatTemperature(toNumber(this._stateOf(entities.bed)), toNumber(this._stateOf(entities.bedTarget)))}</span
            >
            <span class="stat" title=${localize('card.filament')}>${renderIcon('status_filament')}${this._materialText(entities)}</span>
            ${this._config?.show_speed === false ? nothing : html`<span class="stat" title=${localize('card.speed')}>${renderIcon('status_prnspeed')}${formatPercent(toNumber(this._stateOf(entities.speed)))}</span>`}
            ${this._config?.show_flow === false ? nothing : html`<span class="stat" title=${localize('card.flow')}>${renderIcon('status_prnflow')}${formatPercent(toNumber(this._stateOf(entities.flow)))}</span>`}
          </div>
        </div>
      </div>
    `;
  }

  private _materialText(entities: PrinterEntities): string {
    const material = this._stateOf(entities.material);
    return isValidState(material) ? material.state : '–';
  }

  private _renderControls(entities: PrinterEntities, localize: (key: string) => string): TemplateResult {
    const main = pickMainControl(this._stateOf(entities.pause), this._stateOf(entities.resume), this._stateOf(entities.continue));
    const cancel = this._stateOf(entities.cancel);
    const progress = toNumber(this._stateOf(entities.progress));
    const text = progressText({
      mode: this._config?.progress_text ?? 'percent_done',
      progress,
      finish: parseFinish(this._stateOf(entities.finish)),
      now: this._now,
      language: this.hass?.locale.language ?? 'en',
      timeZone: this.hass?.config.time_zone ?? 'UTC',
    });
    const button = (icon: string, label: string, target: HassEntity | undefined, onClick: () => void): TemplateResult => html`
      <button class="control" title=${label} aria-label=${label} ?disabled=${!isButtonAvailable(target)} @click=${onClick}>
        <ha-icon icon=${icon}></ha-icon>
      </button>
    `;

    return html`
      <div class="controls">
        ${
          main.kind === 'resume'
            ? button('mdi:play', localize('card.resume'), main.button, () => this._press(main.button?.entity_id))
            : isButtonAvailable(main.button)
              ? button('mdi:pause', localize('card.pause'), main.button, () => this._press(main.button?.entity_id))
              : button('mdi:play-pause', localize('card.pause'), undefined, () => undefined)
        }
        ${button('mdi:stop', localize('card.cancel'), cancel, () => (this._confirm = 'cancel_print'))}
        <div class="bar"><div class="level" style="width: ${Math.min(100, Math.max(0, progress ?? 0))}%"></div></div>
        <span class="value">${text}</span>
      </div>
    `;
  }

  // -- dialogs ----------------------------------------------------------------

  private _renderPreview(entities: PrinterEntities, localize: (key: string) => string): TemplateResult {
    const picture = this._previewPicture(entities);
    const filename = this._stateOf(entities.filename);
    // ha-dialog of Home Assistant 2026.10 (Web Awesome): the title is the header-title attribute
    return html`
      <ha-dialog
        open
        width="large"
        header-title=${isValidState(filename) && isJobActive(this._stateOf(entities.state)?.state) ? filename.state : localize('card.preview')}
        @closed=${() => (this._previewOpen = false)}
      >
        ${picture ? html`<img class="preview-large" src=${picture} alt=${localize('card.preview')} />` : nothing}
        <ha-dialog-footer slot="footer">
          <ha-button slot="primaryAction" @click=${() => (this._previewOpen = false)}>${localize('card.back')}</ha-button>
        </ha-dialog-footer>
      </ha-dialog>
    `;
  }

  private _renderConfirm(localize: (key: string) => string): TemplateResult {
    const kind = this._confirm === 'power_off' ? 'off' : this._confirm === 'printer_busy' ? 'busy' : 'cancel';
    const busy = kind === 'busy';
    return html`
      <ha-dialog open header-title=${localize(`card.title_${kind}`)} @closed=${() => (this._confirm = undefined)}>
        <p>${localize(`card.text_${kind}`)}</p>
        <ha-dialog-footer slot="footer">
          <ha-button slot="secondaryAction" appearance="plain" @click=${() => (this._confirm = undefined)}>${localize('card.back')}</ha-button>
          ${
            !busy
              ? html`<ha-button slot="primaryAction" variant="danger" @click=${this._confirmed}>${localize('card.confirm')}</ha-button>`
              : this._pendingOffEntity
                ? html`<ha-button slot="primaryAction" @click=${this._scheduleOff}>${localize('card.switch_off_when_possible')}</ha-button>`
                : nothing
          }
        </ha-dialog-footer>
      </ha-dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [CARD_TAG]: PrusaLinkCard;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: CARD_TAG,
  name: 'PrusaLink printer',
  description: 'Printer status, controls and preview for the PrusaLink integration, optionally with the power socket tile',
  preview: false,
  documentationURL: 'https://github.com/hondzik/prusalink-card',
  getEntitySuggestion: (hass, entityId) => PrusaLinkCard.getEntitySuggestion(hass, entityId),
});
