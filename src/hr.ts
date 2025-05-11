/*
 * HR Handles hiring and firing
 */
import { PluginConfig } from './configure';
import { getHandymen } from './common';

type actionDone = () => void;

export function ManageStaff(config: PluginConfig, callback: ()=> void) {
  let toHire: number = config.numberOfHandymen - getHandymen().length;
  let actions: number = 0;
  let done = () => {
    actions--;
    if (actions == 0) {
      callback()
    }
  };
  console.log(toHire + ' handymen');
  if (toHire > 0) {
    for (let i = 0; i < toHire; i++) {
      console.log('Hire Janitor');
      actions++;
      hireJanitor(done);
    }
  } else {
    for (let i = 0; i > toHire; i--) {
      const allStaff: Staff[] = map.getAllEntities('staff');
      let staff: Staff = allStaff[i];
      console.log(staff);
      if (staff.staffType === 'handyman') {
        actions++;
        fireJanitor(staff.id, done);
      }
    }
  }
}

function hireJanitor(doner: actionDone): void {
  const args = {
    autoPosition: true,
    staffType: 0,
    costumeIndex: 0,
    staffOrders: 0x1 | 0x4, // Sweeping and emptying bins
  };
  console.log('sending this ' + args);
  context.executeAction('staffhire', args, doner);
}

function fireJanitor(id: number, doner: actionDone): void {
  const args = {
    id: id,
  };
  context.executeAction('stafffire', args, doner);
}
