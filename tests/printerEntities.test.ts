import { describe, expect, it } from 'vitest';
import { resolvePrinterEntities } from '../src/utils/printerEntities';

const ids = [
  'button.prusa_core_one_cancel_job_2',
  'button.prusa_core_one_continue_job_2',
  'button.prusa_core_one_pause_job_2',
  'button.prusa_core_one_resume_job_2',
  'camera.prusa_core_one_preview_2',
  'sensor.prusa_core_one_2',
  'sensor.prusa_core_one_filename_2',
  'sensor.prusa_core_one_progress_2',
  'sensor.prusa_core_one_print_finish_2',
  'sensor.prusa_core_one_material_2',
  'sensor.prusa_core_one_nozzle_temperature_2',
  'sensor.prusa_core_one_nozzle_target_temperature_2',
  'sensor.prusa_core_one_heatbed_temperature_2',
  'sensor.prusa_core_one_heatbed_target_temperature_2',
  'sensor.prusa_core_one_print_speed_2',
  'sensor.prusa_core_one_print_flow_2',
  'binary_sensor.prusa_core_one_mmu_2',
];

describe('resolvePrinterEntities', () => {
  it('maps a device with the _2 suffix', () => {
    expect(resolvePrinterEntities(ids)).toEqual({
      state: 'sensor.prusa_core_one_2',
      filename: 'sensor.prusa_core_one_filename_2',
      progress: 'sensor.prusa_core_one_progress_2',
      finish: 'sensor.prusa_core_one_print_finish_2',
      material: 'sensor.prusa_core_one_material_2',
      speed: 'sensor.prusa_core_one_print_speed_2',
      flow: 'sensor.prusa_core_one_print_flow_2',
      nozzle: 'sensor.prusa_core_one_nozzle_temperature_2',
      nozzleTarget: 'sensor.prusa_core_one_nozzle_target_temperature_2',
      bed: 'sensor.prusa_core_one_heatbed_temperature_2',
      bedTarget: 'sensor.prusa_core_one_heatbed_target_temperature_2',
      resume: 'button.prusa_core_one_resume_job_2',
      continue: 'button.prusa_core_one_continue_job_2',
      pause: 'button.prusa_core_one_pause_job_2',
      cancel: 'button.prusa_core_one_cancel_job_2',
      preview: 'camera.prusa_core_one_preview_2',
    });
  });

  it('works without a suffix', () => {
    const plain = ids.map((id) => id.replace(/_2$/, ''));
    expect(resolvePrinterEntities(plain).state).toBe('sensor.prusa_core_one');
    expect(resolvePrinterEntities(plain).preview).toBe('camera.prusa_core_one_preview');
  });

  it('accepts a preview camera with any suffix after "preview"', () => {
    const list = ['sensor.mk4', 'camera.mk4_preview_thumbnail'];
    expect(resolvePrinterEntities(list).preview).toBe('camera.mk4_preview_thumbnail');
  });

  it('returns nothing for an empty device', () => {
    expect(resolvePrinterEntities([])).toEqual({});
  });
});
