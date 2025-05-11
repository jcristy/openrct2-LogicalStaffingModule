
const OWNERSHIP_CONSTRUCTION_RIGHTS_OWNED: number = (1 << 4)
const OWNERSHIP_OWNED: number = (1 << 5)

export function isOwned(tile: Tile): boolean {
	let es: TileElement[] = tile.elements.filter((e) => e.type === "surface");
	let se = <SurfaceElement> es[0];
	return se.ownership == OWNERSHIP_OWNED;
}

export function hasFootpath(tile: Tile): boolean {
	let es: TileElement[] = tile.elements.filter((e) => e.type === "footpath");
	return es.length != 0;
}

export function hasDirtyFootpath(tile: Tile): boolean {
	let litter: Litter[] = map.getAllEntitiesOnTile("litter", {x: tile.x, y: tile.y});
	return litter.length != 0;
}
