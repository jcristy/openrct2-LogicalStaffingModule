import { PluginConfig } from './configure';

export function ManageStaff(config: PluginConfig) {
  let toHire: number = config.numberOfHandymen - countHandymen();
  console.log(toHire + ' handymen');
  if (toHire > 0) {
    for (let i = 0; i < toHire; i++) {
      console.log('Hire Janitor');
      hireJanitor();
    }
  } else {
    for (let i = 0; i > toHire; i--) {
      const allStaff: Staff[] = map.getAllEntities('staff');
      let staff: Staff = allStaff[i];
      console.log(staff);
      if (staff.staffType === 'handyman') {
        fireJanitor(staff.id);
      }
    }
  }
}

function hireJanitor(): void {
  const args = {
    autoPosition: true,
    staffType: 0,
    costumeIndex: 0,
    staffOrders: 0x1 | 0x4, // Sweeping and emptying bins
  };
  console.log('sending this ' + args);
  context.executeAction('staffhire', args);
}

function fireJanitor(id: number): void {
  const args = {
    id: id,
  };
  context.executeAction('stafffire', args);
}

function countHandymen(): number {
  const staff = map.getAllEntities('staff');
  const handymen = staff.filter((s) => s.staffType === 'handyman');
  return handymen.length;
}
