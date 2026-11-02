import type { HassEntity } from 'home-assistant-js-websocket';

const NO_VALUE = ['unavailable', 'unknown', ''];

export function isValidState(stateObj: HassEntity | undefined): stateObj is HassEntity {
  return !!stateObj && !NO_VALUE.includes(stateObj.state);
}

export function toNumber(stateObj: HassEntity | undefined): number | undefined {
  if (!isValidState(stateObj)) return undefined;
  const value = Number(stateObj.state);
  return Number.isFinite(value) ? value : undefined;
}

// A print job exists (and its filename is shown) only in these printer states.
export function isJobActive(printerState: string | undefined): boolean {
  return printerState === 'printing' || printerState === 'paused';
}

export const SAFE_POWER_OFF_STATES = ['idle', 'ready', 'finished', 'stopped'];

// The nozzle must have cooled down before the power is cut (the heat-break fan stops with it).
export const SAFE_NOZZLE_TEMPERATURE = 40;

// The socket may be switched off only while the printer does nothing (idle, ready, finished, stopped) and
// the nozzle is cool; an unknown printer state or temperature does not block it, so a printer that stopped
// answering can still be switched off.
export function isPowerOffAllowed(printerState: string | undefined, nozzleTemperature?: number): boolean {
  const stateOk = !printerState || NO_VALUE.includes(printerState) || SAFE_POWER_OFF_STATES.includes(printerState);
  return stateOk && (nozzleTemperature === undefined || nozzleTemperature < SAFE_NOZZLE_TEMPERATURE);
}

export function formatTemperature(current: number | undefined, target: number | undefined): string {
  if (current === undefined) return '–';
  return `${Math.round(current)}/${Math.round(target ?? 0)} °C`;
}

export function formatPercent(value: number | undefined): string {
  return value === undefined ? '–' : `${Math.round(value)} %`;
}

export function formatDuration(ms: number): string {
  const totalMinutes = Math.max(0, Math.round(ms / 60000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) return `${minutes} min`;
  return `${hours} h ${minutes.toString().padStart(2, '0')} min`;
}

function sameDay(a: Date, b: Date, timeZone: string): boolean {
  const fmt = new Intl.DateTimeFormat('en-CA', { timeZone });
  return fmt.format(a) === fmt.format(b);
}

export function formatFinishTime(finish: Date, now: Date, language: string, timeZone: string): string {
  const time = finish.toLocaleTimeString(language, { hour: '2-digit', minute: '2-digit', timeZone });
  if (sameDay(finish, now, timeZone)) return time;
  const date = finish.toLocaleDateString(language, { day: 'numeric', month: 'numeric', timeZone });
  return `${date} ${time}`;
}

export function parseFinish(stateObj: HassEntity | undefined): Date | undefined {
  if (!isValidState(stateObj)) return undefined;
  const date = new Date(stateObj.state);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export interface ProgressInput {
  mode: PrusaLinkProgressText;
  progress: number | undefined;
  finish: Date | undefined;
  now: Date;
  language: string;
  timeZone: string;
}

export function progressText({ mode, progress, finish, now, language, timeZone }: ProgressInput): string {
  switch (mode) {
    case 'percent_remaining':
      return progress === undefined ? '–' : `${Math.round(100 - progress)} %`;
    case 'time_remaining':
      return finish ? formatDuration(finish.getTime() - now.getTime()) : '–';
    case 'finish_time':
      return finish ? formatFinishTime(finish, now, language, timeZone) : '–';
    default:
      return progress === undefined ? '–' : `${Math.round(progress)} %`;
  }
}

// A button entity's state is the time of its last press (or `unknown` if never pressed), so only
// `unavailable` means it can't be used.
export function isButtonAvailable(button: HassEntity | undefined): boolean {
  return !!button && button.state !== 'unavailable';
}

/** Resume and continue are alternatives: the one that is currently usable wins, resume by default. */
export function pickResumeButton(resume: HassEntity | undefined, cont: HassEntity | undefined): HassEntity | undefined {
  if (isButtonAvailable(cont) && !isButtonAvailable(resume)) return cont;
  return resume ?? cont;
}

export interface MainControl {
  kind: 'pause' | 'resume';
  button: HassEntity | undefined;
}

/** Pause and resume/continue share one slot: whichever is usable is shown, pause (disabled) when none is. */
export function pickMainControl(pause: HassEntity | undefined, resume: HassEntity | undefined, cont: HassEntity | undefined): MainControl {
  if (isButtonAvailable(pause)) return { kind: 'pause', button: pause };
  const play = pickResumeButton(resume, cont);
  if (isButtonAvailable(play)) return { kind: 'resume', button: play };
  return { kind: 'pause', button: pause };
}
