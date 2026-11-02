import type { HomeAssistant } from './HomeAssistant';

export {};

declare global {
  interface Window {
    customCards: CustomCard[];
  }

  interface CustomCard {
    type: string;
    name: string;
    description: string;
    preview?: boolean;
    documentationURL?: string;
    getEntitySuggestion?: (hass: HomeAssistant, entityId: string) => { label?: string; config: PrusaLinkCardConfig } | null;
  }

  type PrusaLinkProgressText = 'percent_done' | 'percent_remaining' | 'time_remaining' | 'finish_time';

  interface PrusaLinkCardConfig {
    type: string;
    // any entity of the PrusaLink printer device
    entity: string;
    // optional remotely switched socket (switch.*) powering the printer
    switch_entity?: string;
    // overrides the socket icon (mdi:...) in the tile block
    icon?: string;
    // picture of the printer shown instead of the socket icon: value of the editor's media selector
    // (media_content_id like `media-source://media_source/local/printer.png`), or a plain id / URL in YAML
    // false: show the icon although a picture is chosen (default true)
    use_image?: boolean;
    image?: string | { media_content_id?: string; media_content_type?: string; metadata?: unknown };
    // input_boolean that holds "switch the socket off as soon as the printer allows it"; created together with
    // the automation that acts on it by the button of the editor
    pending_off_entity?: string;
    // overrides the socket name in the tile block
    name?: string;
    // secondary info of the tile block (same as Tile card's `state_content`)
    state_content?: string | string[];
    // further entities of the socket (e.g. its power sensor) appended to the secondary info
    secondary_entities?: string[];
    progress_text?: PrusaLinkProgressText;
    // speed / flow factor in the bottom row (default true)
    show_speed?: boolean;
    show_flow?: boolean;
    // set by the dashboard when the card is resized (sections view)
    grid_options?: { rows?: number | 'auto'; columns?: number | 'full' };
  }
}
