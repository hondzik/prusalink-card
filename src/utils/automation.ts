import { SAFE_NOZZLE_TEMPERATURE, SAFE_POWER_OFF_STATES } from './printerDisplay';

export interface SwitchOffAutomationOptions {
  // name of the socket, used in the automation's name
  name: string;
  switchEntity: string;
  printerState: string;
  nozzle?: string;
  // input_boolean set by the card's "switch off when possible" button
  helper: string;
  // translated "switch off when possible", used in the automation's name
  title: string;
}

const objectId = (entityId: string): string => entityId.split('.')[1] ?? entityId;

// one automation per socket, so creating it again overwrites it instead of adding a duplicate
export function switchOffAutomationId(switchEntity: string): string {
  return `prusalink_card_switch_off_${objectId(switchEntity)}`;
}

// entity id of a helper just created by `input_boolean/create` (its response carries the slug only)
export function createdHelperEntityId(created: { id: string }): string {
  return `input_boolean.${created.id}`;
}

// Same rule as `isPowerOffAllowed` of the card: the printer does nothing (or does not answer at all) and the
// nozzle is cool. Evaluated by Home Assistant itself, so it works with no dashboard open.
export function buildSwitchOffAutomation(options: SwitchOffAutomationOptions): Record<string, unknown> {
  const { name, switchEntity, printerState, nozzle, helper, title } = options;
  const states = JSON.stringify([...SAFE_POWER_OFF_STATES, 'unavailable', 'unknown']);
  const allowed: Record<string, unknown>[] = [{ condition: 'template', value_template: `{{ states('${printerState}') in ${states} }}` }];
  if (nozzle) allowed.push({ condition: 'template', value_template: `{{ states('${nozzle}') | float(0) < ${SAFE_NOZZLE_TEMPERATURE} }}` });
  const helperOff = { action: 'input_boolean.turn_off', target: { entity_id: helper } };

  return {
    alias: `PrusaLink Card: ${name} – ${title}`,
    description: `Created by the PrusaLink card. Switches ${switchEntity} off as soon as the printer is idle and the nozzle is below ${SAFE_NOZZLE_TEMPERATURE} °C, after ${helper} was turned on.`,
    mode: 'single',
    triggers: [
      { trigger: 'state', entity_id: [helper, switchEntity, printerState, ...(nozzle ? [nozzle] : [])] },
      { trigger: 'time_pattern', minutes: '/1' },
    ],
    conditions: [{ condition: 'state', entity_id: helper, state: 'on' }],
    actions: [
      {
        choose: [
          // somebody switched the socket off meanwhile: nothing left to wait for
          { conditions: [{ condition: 'not', conditions: [{ condition: 'state', entity_id: switchEntity, state: 'on' }] }], sequence: [helperOff] },
          { conditions: allowed, sequence: [{ action: 'switch.turn_off', target: { entity_id: switchEntity } }, helperOff] },
        ],
      },
    ],
  };
}
