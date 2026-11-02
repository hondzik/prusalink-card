export interface PrinterEntities {
  state?: string;
  filename?: string;
  progress?: string;
  finish?: string;
  nozzle?: string;
  nozzleTarget?: string;
  bed?: string;
  bedTarget?: string;
  material?: string;
  speed?: string;
  flow?: string;
  resume?: string;
  continue?: string;
  pause?: string;
  cancel?: string;
  preview?: string;
}

// `<domain>.<name relative to the printer's main sensor>` -> role
const ENTITY_KEYS: Record<string, keyof PrinterEntities> = {
  'sensor.': 'state',
  'sensor.filename': 'filename',
  'sensor.progress': 'progress',
  'sensor.print_finish': 'finish',
  'sensor.nozzle_temperature': 'nozzle',
  'sensor.nozzle_target_temperature': 'nozzleTarget',
  'sensor.heatbed_temperature': 'bed',
  'sensor.heatbed_target_temperature': 'bedTarget',
  'sensor.material': 'material',
  'sensor.print_speed': 'speed',
  'sensor.print_flow': 'flow',
  'button.resume_job': 'resume',
  'button.continue_job': 'continue',
  'button.pause_job': 'pause',
  'button.cancel_job': 'cancel',
};

// A second config entry of the same printer gets a numeric suffix (`..._2`) on every entity_id.
const stripSuffix = (objectId: string): string => objectId.replace(/_\d+$/, '');

/**
 * Maps entity_ids of one PrusaLink device (e.g. `sensor.prusa_core_one_nozzle_temperature_2`) to the
 * roles the card needs. The printer's main sensor has the shortest object_id (without the `_<n>`
 * suffix); every other entity is `<main>_<name>[_<n>]`, so the name is what remains after it.
 * The preview is `camera.<main>_preview[_<n>]`, matched loosely as the name starting with `preview`.
 */
export function resolvePrinterEntities(entityIds: string[]): PrinterEntities {
  const parsed = entityIds.map((id) => {
    const [domain, objectId = ''] = id.split('.');
    return { id, domain, stripped: stripSuffix(objectId) };
  });
  const base = parsed.map((e) => e.stripped).reduce((a, b) => (b.length < a.length ? b : a), parsed[0]?.stripped ?? '');
  if (!base) return {};

  const result: PrinterEntities = {};
  for (const { id, domain, stripped } of parsed) {
    if (stripped !== base && !stripped.startsWith(`${base}_`)) continue;
    const name = stripped.slice(base.length + 1);
    if (domain === 'camera' && name.startsWith('preview')) {
      result.preview ??= id;
      continue;
    }
    const key = ENTITY_KEYS[`${domain}.${name}`];
    if (key) result[key] ??= id;
  }
  return result;
}
