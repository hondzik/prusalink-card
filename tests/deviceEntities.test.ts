import { describe, expect, it } from 'vitest';
import { getDeviceEntityIds, getSecondaryCandidates, isPrusaLinkEntity } from '../src/utils/deviceEntities';
import type { HomeAssistant } from '../src/types/HomeAssistant';

const hass = {
  entities: {
    'sensor.a': { device_id: 'd1', platform: 'prusalink' },
    'button.a': { device_id: 'd1', platform: 'prusalink' },
    'sensor.b': { device_id: 'd2', platform: 'other' },
    'switch.b': { device_id: 'd2', platform: 'other' },
    'sensor.c': { device_id: 'd3', platform: 'other' },
    'sensor.nodevice': {},
  },
} as unknown as HomeAssistant;

describe('getDeviceEntityIds', () => {
  it('returns siblings sharing the device', () => {
    expect(getDeviceEntityIds(hass, 'sensor.a').sort()).toEqual(['button.a', 'sensor.a']);
  });

  it('returns nothing for unknown entities or entities without device', () => {
    expect(getDeviceEntityIds(hass, 'sensor.nodevice')).toEqual([]);
    expect(getDeviceEntityIds(hass, 'sensor.missing')).toEqual([]);
    expect(getDeviceEntityIds(hass, undefined)).toEqual([]);
    expect(getDeviceEntityIds({} as HomeAssistant, 'sensor.a')).toEqual([]);
  });
});

describe('isPrusaLinkEntity', () => {
  it('checks the platform of the entity', () => {
    expect(isPrusaLinkEntity(hass, 'sensor.a')).toBe(true);
    expect(isPrusaLinkEntity(hass, 'sensor.b')).toBe(false);
    expect(isPrusaLinkEntity(hass, undefined)).toBe(false);
  });
});

describe('getSecondaryCandidates', () => {
  it('offers entities of the printer and of the socket, without the socket itself', () => {
    expect(getSecondaryCandidates(hass, 'sensor.a', 'switch.b').sort()).toEqual(['button.a', 'sensor.a', 'sensor.b']);
  });

  it('works without a socket and without a printer', () => {
    expect(getSecondaryCandidates(hass, 'sensor.a', undefined).sort()).toEqual(['button.a', 'sensor.a']);
    expect(getSecondaryCandidates(hass, undefined, 'switch.b')).toEqual(['sensor.b']);
    expect(getSecondaryCandidates(hass, undefined, undefined)).toEqual([]);
  });
});
