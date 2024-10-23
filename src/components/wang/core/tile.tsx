'use client';

import React from 'react';
import { Position, Scale, Tileset, TilesetIndex } from './types';
import Image from 'next/image';

interface TileClassProps {
  position: Position;
  index?: TilesetIndex;
  scale?: Scale;
  tileset: Tileset;
  basePath: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export class TileClass extends React.Component {
  /**
   * The position of the tile in the grid.
   */
  public position: Position;
  /**
   * The index of the tile in the tileset.
   */
  public index: TilesetIndex;
  /**
   * The tileset used to generate the tile.
   */
  public readonly tileset: Tileset;
  /**
   * The base path for the tileset images.
   */
  public readonly basePath: string;
  /**
   * The scale of the tile.
   */
  public readonly scale: Scale;
  /**
   * The function to handle the click event.
   */
  public onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;

  constructor({ position, index, tileset, basePath, scale, onClick }: TileClassProps) {
    super({});
    this.position = position;
    this.index = index ?? (Math.floor(Math.random() * (tileset?.length ?? 16)) as TilesetIndex);
    this.tileset = tileset;
    this.basePath = basePath;
    this.scale = scale ?? { width: 32, height: 32 };
    this.onClick = onClick;
  }

  /**
   * Gets the next TilesetIndex.
   *
   * @returns {TilesetIndex} The next index in the tileset.
   */
  public get next(): TilesetIndex {
    return (this.index + 1) as TilesetIndex;
  }

  // get the previous value using bitwise OR
  /**
   * Gets the previous tile index in the tileset.
   *
   * @returns {TilesetIndex} The index of the previous tile.
   */
  public get previous(): TilesetIndex {
    return (this.index - 1) as TilesetIndex;
  }

  // get the inverse of the value using bitwise XOR
  /**
   * Gets the inverse of the current tile index.
   * The inverse is calculated using a bitwise XOR operation with the binary number 1111.
   *
   * @returns {number} The inverse of the tile index.
   */
  public get inverse(): number {
    return this.index ^ 0b1111;
  }

  public render(): React.ReactNode {
    return (
      <Image
        src={`${this.basePath}/${this.index}.gif`}
        alt={`Tile ${this.index}`}
        width={this.scale.width}
        height={this.scale.height}
        onClick={this.onClick}
        id={`col=${this.position.x}-row=${this.position.y}`}
      />
    );
  }
}
