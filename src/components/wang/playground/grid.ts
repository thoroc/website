import { Directions } from './directions';
import { GridRow, Tile, TilesetIndex } from './types';

export class Grid {
  public readonly width: number;
  public readonly height: number;
  public rows: GridRow[];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.rows = [];

    for (let y = 0; y < height; y++) {
      const row: GridRow = [];

      for (let x = 0; x < width; x++) {
        const tile: Tile = { x, y, value: 0 };

        console.log(Directions.GetRandomDirection());

        row.push(tile);
      }

      this.rows.push(row);
    }
  }
}
