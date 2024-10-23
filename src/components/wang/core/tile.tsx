'use client';

import React from 'react';
import { Position, Scale, TilesetIndex, TileValue } from './types';
import Image from 'next/image';

interface TileProps {
  position: Position;
  index?: TilesetIndex;
  maxIndex?: number;
  scale?: Scale;
  basePath: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export class Tile extends React.Component {
  /**
   * The position of the tile in the grid.
   */
  public position: Position;
  /**
   * The index of the tile in the tileset.
   */
  public index: TilesetIndex;
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

  constructor({ position, index, maxIndex, basePath, scale, onClick }: TileProps) {
    super({});
    this.position = position;
    this.index = index ?? (Math.floor(Math.random() * (maxIndex ?? 16)) as TilesetIndex);
    this.basePath = basePath;
    this.value = `${basePath}/${this.index}.gif` as TileValue;
    this.scale = scale ?? { width: 32, height: 32 };
    this.onClick = onClick;
  }

  /**
   * Gets the value of the tile.
   *
   * @returns {TileValue} The value of the tile.
   */
  public get value(): TileValue {
    return `${this.basePath}/${this.index}.gif` as TileValue;
  }

  /**
   * Sets the value of the tile.
   *
   * @param value - The new value of the tile.
   */
  public set value(value: TileValue) {
    this.value = value;
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
        src={`${this.value}`}
        alt={`Tile ${this.index}`}
        width={this.scale.width}
        height={this.scale.height}
        onClick={this.onClick}
        id={`col=${this.position.x}-row=${this.position.y}`}
      />
    );
  }
}
