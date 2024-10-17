import { TileClass } from './tile';
import { Tileset } from './types';

interface RowProps {
  length: number;
  tileset: Tileset;
}

export class RowClass {
  public readonly id: number;
  public tiles: TileClass[];
  public readonly tileset: Tileset;

  constructor(id: number, { length, tileset }: RowProps) {
    this.id = id;
    this.tiles = Array.from({ length }, (_, y) => new TileClass({ position: { x: id, y }, tileset }));
    this.tileset = tileset;
  }

  public setValue(tileIndex: number, node: React.ReactNode) {
    this.tiles[tileIndex].value = node;
  }

  public getTile(index: number): TileClass {
    if (!this.tiles[index]) {
      throw new Error(`Tile at position=${index} does not exist`);
    }

    return this.tiles[index];
  }

  public get length(): number {
    return this.tiles.length;
  }
}
