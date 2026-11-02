import type { HassEntities, HassEntity } from 'home-assistant-js-websocket';

// Minimal subset of the Home Assistant frontend's `hass` object that the card actually reads.
// `entities` (entity registry display data) isn't part of any published HA types package, it is
// populated directly by the HA frontend.
export interface HomeAssistant {
  states: HassEntities;
  entities: Record<string, { device_id?: string; platform?: string }>;
  locale: { language: string };
  config: { time_zone: string };
  callService: (domain: string, service: string, serviceData?: Record<string, unknown>) => Promise<void>;
  callWS: <T>(message: Record<string, unknown>) => Promise<T>;
  callApi: <T>(method: string, path: string, parameters?: Record<string, unknown>) => Promise<T>;
  user?: { is_admin: boolean };
  formatEntityState?: (stateObj: HassEntity, state?: string) => string;
}
