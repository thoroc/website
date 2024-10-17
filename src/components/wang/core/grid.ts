import { RowClass } from './row';
import { TileClass } from './tile';
import { loadTileset } from './utils';
import { Tileset } from './types';

interface GridClassProps {
  width: number;
  height: number;
  tileset?: Tileset;
}

export class GridClass {
  public readonly id: number;
  public readonly width: number;
  public readonly height: number;
  public rows: RowClass[];
  public tileset: Tileset;

  constructor(id: number, { width, height, tileset }: GridClassProps) {
    this.id = id;
    this.width = width;
    this.height = height;

    if (tileset) {
      this.tileset = tileset;
    } else {
      const loadedTileset: Tileset = loadTileset({
        basePath: 'src/components/wang/tiles',
      }) as Tileset;
      if (!loadedTileset) {
        throw new Error('Failed to load tileset');
      }
      this.tileset = loadedTileset;
    }

    this.rows = Array.from({ length: height }, (_, y) => new RowClass(y, { length: width, tileset: this.tileset }));
  }

  public getTile(rowIndex: number, tileIndex: number): TileClass {
    return this.getRow(rowIndex).getTile(tileIndex);
  }

  public getRow(rowIndex: number): RowClass {
    return this.rows[rowIndex];
  }
}
