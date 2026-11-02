import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ICONS } from '../generated/icons';
import type { TemplateResult } from 'lit';

/**
 * Inline SVG from the build-time-generated `ICONS` map (see scripts/optimize-icons.mjs). The SVGs
 * are inlined into the bundle because a HACS plugin install only delivers the single bundle file.
 */
export function renderIcon(name: string): TemplateResult {
  return html`${unsafeHTML(ICONS[name] ?? '')}`;
}
