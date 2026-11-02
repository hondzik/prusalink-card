import { describe, expect, it } from 'vitest';
import { buildSwitchOffAutomation, createdHelperEntityId, switchOffAutomationId } from '../src/utils/automation';

const options = {
  name: 'Printer socket',
  switchEntity: 'switch.printer_socket',
  printerState: 'sensor.prusa_mk4',
  nozzle: 'sensor.prusa_mk4_nozzle_temperature',
  helper: 'input_boolean.printer_off',
  title: 'Switch off when possible',
};

type Automation = {
  alias: string;
  triggers: { entity_id?: string[] }[];
  conditions: unknown[];
  actions: { choose: { conditions: { value_template?: string }[]; sequence: unknown[] }[] }[];
};

describe('ids', () => {
  it('derives a stable automation id from the socket and the helper entity id from the created slug', () => {
    expect(switchOffAutomationId('switch.printer_socket')).toBe('prusalink_card_switch_off_printer_socket');
    expect(createdHelperEntityId({ id: 'printer_off' })).toBe('input_boolean.printer_off');
  });
});

describe('buildSwitchOffAutomation', () => {
  const automation = buildSwitchOffAutomation(options) as Automation;

  it('runs only while the helper is on and reacts to the entities it depends on', () => {
    expect(automation.alias).toContain('Printer socket');
    expect(automation.conditions).toEqual([{ condition: 'state', entity_id: 'input_boolean.printer_off', state: 'on' }]);
    expect(automation.triggers[0].entity_id).toEqual(['input_boolean.printer_off', 'switch.printer_socket', 'sensor.prusa_mk4', 'sensor.prusa_mk4_nozzle_temperature']);
  });

  it('switches off only when the printer is at rest and the nozzle is cool', () => {
    const off = automation.actions[0].choose[1];
    expect(off.conditions[0].value_template).toBe(`{{ states('sensor.prusa_mk4') in ["idle","ready","finished","stopped","unavailable","unknown"] }}`);
    expect(off.conditions[1].value_template).toBe(`{{ states('sensor.prusa_mk4_nozzle_temperature') | float(0) < 40 }}`);
    expect(off.sequence).toHaveLength(2);
  });

  it('works without a nozzle sensor', () => {
    const without = buildSwitchOffAutomation({ ...options, nozzle: undefined }) as Automation;
    expect(without.triggers[0].entity_id).toHaveLength(3);
    expect(without.actions[0].choose[1].conditions).toHaveLength(1);
  });
});
