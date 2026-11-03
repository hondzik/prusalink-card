import { css } from 'lit';

export const PrusaLinkCardStyles = css`
  :host {
    display: block;
    height: 100%;
    /* Prusa orange: progress bar and the socket icon while it is on */
    --prusa-orange: #fa6831;
  }

  ha-card {
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .block {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 10px;
    min-width: 0;
  }

  .not-found {
    flex: 1;
    min-height: 56px;
    color: var(--secondary-text-color);
  }

  /* -- socket block (Tile card copy): one grid row, as high as a Tile card -- */

  .tile {
    flex: none;
    height: 56px;
    /* set inline: Prusa orange while the socket is on, the inactive color otherwise */
    --tile-color: var(--state-inactive-color);
  }

  /* icon circle of the Tile card: tinted background, icon in the state color */
  .tile-icon {
    flex: none;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--tile-color);
    background-color: color-mix(in srgb, var(--tile-color) 20%, transparent);
    --mdc-icon-size: 24px;
    transition:
      color 0.2s,
      background-color 0.2s;
  }

  /* a picture instead of the icon: round, with a ring in the state color */
  .tile-icon img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 0 0 2px var(--tile-color);
  }

  .tile-icon.interactive {
    cursor: pointer;
  }

  .tile-icon.interactive:hover {
    background-color: color-mix(in srgb, var(--tile-color) 30%, transparent);
  }

  /* waiting for the printer to allow switching off: the icon slowly pulses (click cancels) */
  .tile-icon.pending {
    animation: pulse 2.4s ease-in-out infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
      box-shadow: 0 0 0 0 color-mix(in srgb, var(--tile-color) 60%, transparent);
    }
    50% {
      opacity: 0.45;
      box-shadow: 0 0 0 6px color-mix(in srgb, var(--tile-color) 0%, transparent);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .tile-icon.pending {
      animation: none;
      opacity: 0.6;
    }
  }

  .tile.unavailable {
    opacity: 0.6;
  }

  .tile-info {
    flex: 1;
    min-width: 0;
    cursor: pointer;
  }

  /* -- printer block -- */

  /* two grid rows (2 × 56 px + the 8 px gap between them = 120 px) */
  .printer {
    flex: 1;
    min-height: 120px;
    padding: 8px 10px;
  }

  .preview {
    flex: none;
    /* as tall as the block (so the bottom row never sticks out below it), square */
    align-self: stretch;
    aspect-ratio: 1;
    border-radius: 6px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--secondary-background-color);
    color: var(--secondary-text-color);
  }

  .preview.clickable {
    cursor: pointer;
  }

  /* no picture available: an empty frame with a faint "no image" icon */
  .preview .placeholder {
    opacity: 0.4;
    --mdc-icon-size: 32px;
  }

  .preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .details {
    flex: 1;
    min-width: 0;
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2px 0;
  }

  .status {
    display: flex;
    align-items: baseline;
    min-width: 0;
    font-size: var(--ha-font-size-m, 14px);
    font-weight: var(--ha-font-weight-medium, 500);
    line-height: 20px;
    color: var(--primary-text-color);
    cursor: pointer;
  }

  .state,
  .sep {
    flex: none;
  }

  .file-wrap {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    white-space: nowrap;
    font-weight: var(--ha-font-weight-normal, 400);
    color: var(--secondary-text-color);
  }

  .file {
    display: inline-block;
  }

  /* too long file name: scroll slowly there and back */
  .file.marquee {
    animation: pingpong var(--scroll-duration, 10s) ease-in-out infinite alternate;
  }

  @keyframes pingpong {
    0%,
    10% {
      transform: translateX(0);
    }
    90%,
    100% {
      transform: translateX(var(--scroll-distance, 0));
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .file.marquee {
      animation: none;
    }

    .file-wrap {
      text-overflow: ellipsis;
    }
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 4px;
    min-width: 0;
  }

  .control {
    flex: none;
    width: 30px;
    height: 30px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: transparent;
    color: var(--primary-text-color);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    --mdc-icon-size: 22px;
  }

  .control:hover:not([disabled]) {
    background: var(--secondary-background-color);
  }

  .control[disabled] {
    color: var(--disabled-text-color);
    cursor: default;
  }

  .bar {
    flex: 1;
    min-width: 20px;
    margin-left: 4px;
    height: 10px;
    border: 1px solid color-mix(in srgb, var(--prusa-orange) 80%, transparent);
    border-radius: 5px;
    background-color: color-mix(in srgb, var(--prusa-orange) 30%, transparent);
    overflow: hidden;
  }

  .level {
    height: 100%;
    background-color: var(--prusa-orange);
    transition: width 0.4s ease;
  }

  .value {
    flex: none;
    min-width: 40px;
    text-align: right;
    font-size: var(--ha-font-size-m, 14px);
    white-space: nowrap;
    color: var(--primary-text-color);
  }

  .temps {
    flex-wrap: wrap;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    font-size: 12px;
    line-height: 16px;
    color: var(--secondary-text-color);
    white-space: nowrap;
  }

  /* the text box is exactly one line high, so its middle lines up with the middle of the icon */
  .stat {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    min-width: 0;
    line-height: 1;
  }

  .stat svg {
    /* the white parts of the icons are drawn in this color (currentColor, see scripts/optimize-icons.mjs) */
    color: var(--primary-text-color);
    display: block;
    flex: none;
    height: 16px;
    width: 16px;
  }

  .preview-large {
    display: block;
    max-width: 100%;
    margin: 0 auto;
    border-radius: 8px;
  }

  /* caption under the picture: small, wraps (a long name must never widen the dialog) */
  .preview-file {
    margin-top: 8px;
    text-align: center;
    font-size: 12px;
    line-height: 16px;
    color: var(--secondary-text-color);
    overflow-wrap: anywhere;
  }
`;
