/*
 * Common is things that multiple departments need
 */

export function getHandymen(): Handyman[] {
  const staff = map.getAllEntities('staff');
  const handymen = staff.filter((s) => s.staffType === 'handyman');
  return handymen
}
