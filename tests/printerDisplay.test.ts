import { describe, expect, it } from 'vitest';
import { formatDuration, formatPercent, formatFinishTime, formatTemperature, isButtonAvailable, isJobActive, isPowerOffAllowed, parseFinish, pickMainControl, pickResumeButton, progressText, toNumber } from '../src/utils/printerDisplay';
import type { HassEntity } from 'home-assistant-js-websocket';

const entity = (state: string): HassEntity => ({ entity_id: 'x.y', state, attributes: {}, last_changed: '', last_updated: '', context: { id: '', parent_id: null, user_id: null } });

describe('toNumber / parseFinish', () => {
  it('parses valid numbers and rejects missing values', () => {
    expect(toNumber(entity('38.0'))).toBe(38);
    expect(toNumber(entity('unavailable'))).toBeUndefined();
    expect(toNumber(entity('abc'))).toBeUndefined();
    expect(toNumber(undefined)).toBeUndefined();
  });

  it('parses a finish timestamp', () => {
    expect(parseFinish(entity('2026-11-01T12:32:49+00:00'))?.toISOString()).toBe('2026-11-01T12:32:49.000Z');
    expect(parseFinish(entity('unknown'))).toBeUndefined();
    expect(parseFinish(entity('nonsense'))).toBeUndefined();
  });
});

describe('formatters', () => {
  it('formats temperatures', () => {
    expect(formatTemperature(225.3, 225)).toBe('225/225 °C');
    expect(formatTemperature(23.4, undefined)).toBe('23/0 °C');
    expect(formatTemperature(undefined, 60)).toBe('–');
  });

  it('formats percents', () => {
    expect(formatPercent(99.6)).toBe('100 %');
    expect(formatPercent(undefined)).toBe('–');
  });

  it('formats durations', () => {
    expect(formatDuration(5 * 60000)).toBe('5 min');
    expect(formatDuration(72 * 60000)).toBe('1 h 12 min');
    expect(formatDuration(-1000)).toBe('0 min');
  });

  it('shows the date only when the print finishes on another day', () => {
    const now = new Date('2026-11-01T10:00:00Z');
    expect(formatFinishTime(new Date('2026-11-01T12:30:00Z'), now, 'en', 'UTC')).toBe('12:30 PM');
    expect(formatFinishTime(new Date('2026-11-02T12:30:00Z'), now, 'en', 'UTC')).toBe('11/2 12:30 PM');
  });
});

describe('progressText', () => {
  const base = { progress: 38, finish: new Date('2026-11-01T12:00:00Z'), now: new Date('2026-11-01T10:48:00Z'), language: 'en', timeZone: 'UTC' };

  it('renders every mode', () => {
    expect(progressText({ ...base, mode: 'percent_done' })).toBe('38 %');
    expect(progressText({ ...base, mode: 'percent_remaining' })).toBe('62 %');
    expect(progressText({ ...base, mode: 'time_remaining' })).toBe('1 h 12 min');
    expect(progressText({ ...base, mode: 'finish_time' })).toBe('12:00 PM');
  });

  it('shows a dash when the value is missing', () => {
    const empty = { ...base, progress: undefined, finish: undefined };
    for (const mode of ['percent_done', 'percent_remaining', 'time_remaining', 'finish_time'] as const) {
      expect(progressText({ ...empty, mode })).toBe('–');
    }
  });
});

describe('job state / buttons', () => {
  it('knows when a job exists', () => {
    expect(isJobActive('printing')).toBe(true);
    expect(isJobActive('paused')).toBe(true);
    expect(isJobActive('idle')).toBe(false);
    expect(isJobActive(undefined)).toBe(false);
  });

  it('treats "unknown" buttons as available, "unavailable" as not', () => {
    expect(isButtonAvailable(entity('unknown'))).toBe(true);
    expect(isButtonAvailable(entity('unavailable'))).toBe(false);
    expect(isButtonAvailable(undefined)).toBe(false);
  });

  it('prefers continue only when resume is unusable', () => {
    const resume = entity('unavailable');
    const cont = entity('unknown');
    expect(pickResumeButton(resume, cont)).toBe(cont);
    expect(pickResumeButton(entity('unknown'), cont)?.state).toBe('unknown');
    expect(pickResumeButton(resume, entity('unavailable'))).toBe(resume);
    expect(pickResumeButton(undefined, undefined)).toBeUndefined();
  });

  it('shares one slot between pause and resume/continue', () => {
    const off = entity('unavailable');
    const on = entity('unknown');
    expect(pickMainControl(on, off, off)).toEqual({ kind: 'pause', button: on });
    expect(pickMainControl(off, on, off)).toEqual({ kind: 'resume', button: on });
    expect(pickMainControl(off, off, on)).toEqual({ kind: 'resume', button: on });
    // nothing usable (not printing): a disabled pause
    expect(pickMainControl(off, off, off)).toEqual({ kind: 'pause', button: off });
    expect(pickMainControl(undefined, undefined, undefined)).toEqual({ kind: 'pause', button: undefined });
  });
});

describe('isPowerOffAllowed', () => {
  it('allows switching off only while the printer does nothing', () => {
    for (const state of ['idle', 'ready', 'finished', 'stopped']) expect(isPowerOffAllowed(state)).toBe(true);
    for (const state of ['printing', 'paused', 'busy', 'attention', 'error']) expect(isPowerOffAllowed(state)).toBe(false);
  });

  it('does not block a printer whose state is not known', () => {
    expect(isPowerOffAllowed('unavailable')).toBe(true);
    expect(isPowerOffAllowed('unknown')).toBe(true);
    expect(isPowerOffAllowed(undefined)).toBe(true);
  });

  it('waits until the nozzle has cooled down', () => {
    expect(isPowerOffAllowed('finished', 39)).toBe(true);
    expect(isPowerOffAllowed('finished', 40)).toBe(false);
    expect(isPowerOffAllowed('idle', 210)).toBe(false);
    expect(isPowerOffAllowed('idle', undefined)).toBe(true);
  });
});
