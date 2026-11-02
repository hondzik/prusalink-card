import type { HomeAssistant } from '../types/HomeAssistant';

export const PRUSALINK_PLATFORM = 'prusalink';

export function getDeviceEntityIds(hass: HomeAssistant, entityId: string | undefined): string[] {
  const entities = hass.entities ?? {};
  const deviceId = entityId ? entities[entityId]?.device_id : undefined;
  if (!deviceId) return [];

  return Object.entries(entities)
    .filter(([, entity]) => entity.device_id === deviceId)
    .map(([id]) => id);
}

/**
 * Entities the socket's secondary info may show: everything on the printer's device and on the
 * socket's device, except the socket itself (its own state is always shown).
 */
export function getSecondaryCandidates(hass: HomeAssistant, printerEntity: string | undefined, switchEntity: string | undefined): string[] {
  const ids = new Set([...getDeviceEntityIds(hass, printerEntity), ...getDeviceEntityIds(hass, switchEntity)]);
  if (switchEntity) ids.delete(switchEntity);
  return [...ids];
}

export function isPrusaLinkEntity(hass: HomeAssistant, entityId: string | undefined): boolean {
  return !!entityId && hass.entities?.[entityId]?.platform === PRUSALINK_PLATFORM;
}
