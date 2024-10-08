import React from 'react';
import { TilesetIndex } from './types';

export class Tile {
  public x: number;
  public y: number;
  public index: TilesetIndex;
  public node: React.ReactNode;

  constructor(x: number, y: number, value: TilesetIndex) {
    this.x = x;
    this.y = y;
    this.index = value;
  }

  public get position(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }

  public set position({ x, y }) {
    this.x = x;
    this.y = y;
  }

  public get value(): React.ReactNode {
    return this.node;
  }

  public get next(): TilesetIndex {
    return (this.index + 1) as TilesetIndex;
  }

  // get the previous value using bitwise OR
  public get previous(): TilesetIndex {
    return (this.index - 1) as TilesetIndex;
  }

  // get the inverse of the value using bitwise XOR
  public get inverse(): number {
    return this.index ^ 0b1111;
  }
}
