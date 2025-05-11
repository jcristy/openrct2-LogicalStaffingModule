/*
 * Ops handles assigning jobs
 */
import { PluginConfig } from './configure';
import { getHandymen } from './common';
import { isOwned, hasFootpath } from './tiles';

// dailyAssignments sorts out where each group should work
export function dailyAssignments(config: PluginConfig): void {
  doHandymenAssignments(config);
}

function doHandymenAssignments(config: PluginConfig): void {
  if (config.handymanAutoZones == 0) {
    return;
  }
  // Find park boundaries
  const tiles = getAllTiles();
  const owned = tiles.filter(isOwned);
  const footpath = owned.filter(hasFootpath);
  if (config.handymanAutoZones == 1) {
    let maxX: number = 0;
    let minX: number = 32000;
    let maxY: number = 0;
    let minY: number = 32000;
    footpath.forEach((t) => {
      if (t.x > maxX) {
        maxX = t.x;
      }
      if (t.x < minX) {
        minX = t.x;
      }
      if (t.y > maxY) {
        maxY = t.y;
      }
      if (t.y < minY) {
        minY = t.y;
      }
    });
    let middleX: number = minX + (maxX - minX) / 2;
    let middleY: number = minY + (maxY - minY) / 2;
    let radiansPerHandyman: number = (2 * Math.PI) / getHandymen().length;

    let assignments: CoordsXY[][] = new Array(getHandymen().length);
    for (let i = 0; i < assignments.length; i++) {
      console.log('preparing assignments ' + i);
      assignments[i] = new Array();
    }

    footpath.forEach((tile) => {
      // Calculate the difference between the tile's coordinates and the center
      const deltaX: number = tile.x - middleX;
      const deltaY: number = tile.y - middleY;

      // Calculate the radius (distance from the center)
      // const radius: number = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Calculate the angle (in radians)
      let angle: number = Math.atan2(deltaY, deltaX);

      // Normalize the angle to be between 0 and 2*PI
      if (angle < 0) {
        angle += 2 * Math.PI;
      }
      let index = Math.floor(angle / radiansPerHandyman);
      console.log('tile' + tile.x + ',' + tile.y + 'index is ' + index);
      // assignments[index].push({ x: tile.x, y: tile.y });
      // assign it
      context.executeAction(
        'staffsetpatrolarea',
        {
          id: getHandymen()[index].id,
          x1: tile.x*32, // convert from tile to entity coordinates
          x2: tile.x*32+31,
          y1: tile.y*32,
          y2: tile.y*33+31,
          mode: 0, // Set
        },
        (gar) => {
          console.log(gar.errorMessage);
        },
      );
    });
  }
}

function getAllTiles(): Tile[] {
  // First, let's get an idea what the park looks like
  let coords: CoordsXY = map.size;
  let maxX: number = coords.x;
  let maxY: number = coords.y;
  let tiles: Tile[] = [];
  for (let x = 0; x < maxX; x++) {
    for (let y = 0; y < maxY; y++) {
      tiles.push(map.getTile(x, y));
    }
  }
  return tiles;
}
