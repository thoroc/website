import { TileIndex } from './types';

export class Tile {
  public x: number;
  public y: number;
  public value: TileIndex;

  constructor(x: number, y: number, value: TileIndex) {
    this.x = x;
    this.y = y;
    this.value = value;
  }

  public get position(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }

  public set position({ x, y }) {
    this.x = x;
    this.y = y;
  }

  public get index(): TileIndex {
    return this.value;
  }

  public get next(): TileIndex {
    return (this.value + 1) as TileIndex;
  }

  // get the previous value using bitwise OR
  public get previous(): TileIndex {
    return (this.value - 1) as TileIndex;
  }

  // get the inverse of the value using bitwise XOR
  public get inverse(): number {
    return this.value ^ 0b1111;
  }
}
