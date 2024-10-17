import { RowClass } from './row';
import { TileClass } from './tile';
import { loadTileset } from './utils';

interface GridClassProps {
  width: number;
  height: number;
  tileset: React.ReactNode[];
}

export class GridClass {
  public id: number;
  public readonly width: number;
  public readonly height: number;
  public rows: RowClass[];
  public tileset: React.ReactNode[];

  constructor(id, { width, height }: GridClassProps) {
    this.id = id;
    this.width = width;
    this.height = height;
    this.rows = [];

    for (let y = 0; y < height; y++) {
      const row = new RowClass(y, width);

      this.rows.push(row);
    }

    const loadedTileset: React.ReactNode[] = loadTileset({
      basePath: 'src/components/wang/tiles',
    }) as React.ReactNode[];
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
