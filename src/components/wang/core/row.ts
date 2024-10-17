import { TileClass } from './tile';

export class RowClass {
  public readonly id: number;
  public tiles: TileClass[];

  constructor(id: number, length: number) {
    this.id = id;
    this.tiles = [];

    for (let y = 0; y < length; y++) {
      const tile = new TileClass({ position: { x: id, y } });

      this.tiles.push(tile);
    }
  }

  public setValue(tileIndex: number, node: React.ReactNode) {
    this.tiles[tileIndex].setValue(node);
  }

  public getTile(y: number): TileClass {
    return this.tiles[y];
  }
}
