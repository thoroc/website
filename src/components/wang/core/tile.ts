import React from 'react';
import { Position, TilesetIndex, TilesetOptions } from './types';

interface TileClassProps {
  position: Position;
  index?: TilesetIndex;
  node?: React.ReactNode;
  tilesetOptions?: TilesetOptions;
}

export class TileClass {
  public position: Position;
  public index: TilesetIndex;
  public node: React.ReactNode;

  constructor({ position, index, node, tilesetOptions }: TileClassProps) {
    this.position = position;
    this.index = index ?? (Math.floor(Math.random() * (tilesetOptions?.length ?? 16)) as TilesetIndex);
    this.node = node;
  }

  public set value(node: React.ReactNode) {
    this.node = node;
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
