import { RowClass } from './row';
import { TileClass } from './tile';
import { loadTileset } from './utils';

interface GridClassProps {
  width: number;
  height: number;
  tileset: React.ReactNode[];
}

export class GridClass {
  public readonly width: number;
  public readonly height: number;
  public rows: RowClass[];
  public tileset: React.ReactNode[];

  constructor({ width, height }: GridClassProps) {
    this.width = width;
    this.height = height;
    this.rows = [];

    for (let y = 0; y < height; y++) {
      const row = new RowClass(y, width);

      this.rows.push(row);
    }

    const loadedTileset = loadTileset({ basePath: 'src/components/wang/tiles' });
    if (!loadedTileset) {
      throw new Error('Failed to load tileset');
    }
    this.tileset = loadedTileset;
  }

  public getTile(x: number, y: number): TileClass {
    return this.getRow(y).getTile(x);
  }

  public getRow(rowIndex: number): RowClass {
    return this.rows[rowIndex];
  }
}
