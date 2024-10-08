import { Tile, TileIndex } from './types';

export class Grid {
  public readonly width: number;
  public readonly height: number;
  public tiles: Tile[];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.tiles = [];

    for (let i = 0; i < width * height; i++) {
      this.tiles.push({ x: i % width, y: Math.floor(i / width), value: 0 });
    }
  }
  getTile(x: number, y: number) {
    return this.tiles.find((tile) => tile.x === x && tile.y === y);
  }

  setTile(x: number, y: number, value: TileIndex | number) {
    const tile = this.getTile(x, y);

    if (tile) {
      tile.value = typeof value === 'number' ? (value as TileIndex) : value;
    }

    // set tiles north, south, east, west
    const north = this.getTile(x, y - 1);
    const south = this.getTile(x, y + 1);

    const east = this.getTile(x + 1, y);
    const west = this.getTile(x - 1, y);

    if (north) {
      north.value = 1;
    }

    if (south) {
      south.value = 1;
    }

    if (east) {
      east.value = 1;
    }

    if (west) {
      west.value = 1;
    }
  }
}
