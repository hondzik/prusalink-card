import { css, html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import setupCustomlocalize from '../../localize';
import { buildSwitchOffAutomation, createdHelperEntityId, switchOffAutomationId } from '../../utils/automation';
import { getDeviceEntityIds, getSecondaryCandidates, PRUSALINK_PLATFORM } from '../../utils/deviceEntities';
import { resolvePrinterEntities } from '../../utils/printerEntities';
import type { HomeAssistant } from '../../types/HomeAssistant';
import type { CSSResultGroup, TemplateResult } from 'lit';

const CARD_TYPE = 'custom:prusalink-card';
const PROGRESS_TEXTS: PrusaLinkProgressText[] = ['percent_done', 'percent_remaining', 'time_remaining', 'finish_time'];

interface FormSchema {
  name: string;
  required?: boolean;
  selector: Record<string, unknown>;
  context?: Record<string, string>;
}

@customElement('prusalink-card-editor')
export class PrusaLinkCardEditor extends LitElement {
  @property({ attribute: false })
  public hass?: HomeAssistant;

  @state()
  private _config: PrusaLinkCardConfig = { type: CARD_TYPE, entity: '' };

  // result of the last "create helper and automation" click
  @state()
  private _automationStatus?: 'busy' | 'created' | 'failed';

  public static styles: CSSResultGroup = css`
    ha-form {
      display: block;
    }

    .automation {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 8px;
    }

    .automation .failed {
      color: var(--error-color);
    }
  `;

  public setConfig(config: PrusaLinkCardConfig): void {
    this._config = { ...config };
  }

  private _schema(localize: (key: string) => string, secondaryCandidates: string[]): FormSchema[] {
    return [
      { name: 'entity', required: true, selector: { entity: { filter: { integration: PRUSALINK_PLATFORM } } } },
      { name: 'switch_entity', selector: { entity: { filter: { domain: 'switch' } } } },
      { name: 'pending_off_entity', selector: { entity: { filter: { domain: 'input_boolean' } } } },
      { name: 'name', selector: { text: {} } },
      { name: 'icon', selector: { icon: {} } },
      { name: 'image', selector: { media: { accept: ['image/*'] } } },
      { name: 'use_image', selector: { boolean: {} } },
      { name: 'state_content', selector: { ui_state_content: {} }, context: { filter_entity: 'switch_entity' } },
      { name: 'secondary_entities', selector: { entity: { multiple: true, include_entities: secondaryCandidates } } },
      { name: 'show_speed', selector: { boolean: {} } },
      { name: 'show_flow', selector: { boolean: {} } },
      { name: 'progress_text', selector: { select: { mode: 'dropdown', options: PROGRESS_TEXTS.map((value) => ({ value, label: localize(`editor.${value}`) })) } } },
    ];
  }

  protected render(): TemplateResult {
    if (!this.hass) return html``;
    const localize = setupCustomlocalize(this.hass);
    // only entities of the selected printer and of the selected socket can be added to the secondary info
    const secondaryCandidates = getSecondaryCandidates(this.hass, this._config.entity, this._config.switch_entity);
    const data = { progress_text: 'percent_done', show_speed: true, show_flow: true, use_image: true, ...this._config };

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${this._schema(localize, secondaryCandidates)}
        .computeLabel=${(schema: FormSchema) => localize(`editor.${schema.name}`)}
        @value-changed=${this._changed}
      ></ha-form>
      ${this._renderAutomation(localize)}
    `;
  }

  // The helper and the automation are created on demand, only by an administrator and only from this button.
  private _renderAutomation(localize: (key: string) => string): TemplateResult | typeof nothing {
    if (!this.hass?.user?.is_admin || !this._config.switch_entity) return nothing;
    const status = this._automationStatus;
    return html`
      <div class="automation">
        <ha-button ?disabled=${status === 'busy'} @click=${this._createAutomation}>${localize('editor.create_automation')}</ha-button>
        ${status === 'created' ? html`<span>${localize('editor.automation_created')}</span>` : nothing}
        ${status === 'failed' ? html`<span class="failed">${localize('editor.automation_failed')}</span>` : nothing}
      </div>
    `;
  }

  // Creates the input_boolean helper (unless one is already chosen) and the automation that switches the socket
  // off in Home Assistant itself once the printer allows it; the card then only sets and shows the helper.
  private async _createAutomation(): Promise<void> {
    const hass = this.hass;
    const { entity, switch_entity: switchEntity } = this._config;
    const printer = hass ? resolvePrinterEntities(getDeviceEntityIds(hass, entity)) : undefined;
    if (!hass || !switchEntity || !printer?.state) {
      this._automationStatus = 'failed';
      return;
    }
    this._automationStatus = 'busy';
    try {
      const localize = setupCustomlocalize(hass);
      const title = localize('card.switch_off_when_possible');
      const name = this._config.name ?? (hass.states[switchEntity]?.attributes.friendly_name as string | undefined) ?? switchEntity;
      let helper = this._config.pending_off_entity;
      if (!helper) {
        helper = createdHelperEntityId(await hass.callWS<{ id: string }>({ type: 'input_boolean/create', name: `${name} – ${title}`, icon: 'mdi:power-sleep' }));
        this._setConfig({ ...this._config, pending_off_entity: helper });
      }
      await hass.callApi(
        'POST',
        `config/automation/config/${switchOffAutomationId(switchEntity)}`,
        buildSwitchOffAutomation({ name, switchEntity, printerState: printer.state, nozzle: printer.nozzle, helper, title }),
      );
      this._automationStatus = 'created';
    } catch {
      this._automationStatus = 'failed';
    }
  }

  private _changed(ev: CustomEvent<{ value: PrusaLinkCardConfig }>): void {
    ev.stopPropagation();
    const config = { ...ev.detail.value } as unknown as Record<string, unknown>;
    // a cleared field removes the option
    for (const key of Object.keys(config)) {
      if (config[key] === undefined || config[key] === '' || (Array.isArray(config[key]) && (config[key] as unknown[]).length === 0)) delete config[key];
    }
    this._setConfig(config as unknown as PrusaLinkCardConfig);
  }

  private _setConfig(config: PrusaLinkCardConfig): void {
    this._config = config;
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config }, bubbles: true, composed: true }));
  }
}
