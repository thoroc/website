import React from 'react';
import { Position, Tileset, TilesetIndex } from './types';

interface TileClassProps {
  position: Position;
  index?: TilesetIndex;
  node?: React.ReactNode;
  tileset: Tileset;
}

export class TileClass {
  public position: Position;
  public index: TilesetIndex;
  public node: React.ReactNode;
  public readonly tileset: Tileset;

  constructor({ position, index, node, tileset }: TileClassProps) {
    this.position = position;
    this.index = index ?? (Math.floor(Math.random() * (tileset?.length ?? 16)) as TilesetIndex);
    this.node = node ? node : tileset[this.index];
    this.tileset = tileset;
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
