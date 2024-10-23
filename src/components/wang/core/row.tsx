'use client';

import React from 'react';
import { Tile } from './tile';
import { TilesetIndex } from './types';

interface RowProps {
  length: number;
  basePath: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export class Row extends React.Component {
  /**
   * The unique identifier for the row.
   */
  public readonly id: number;
  /**
   * The array of tiles that make up the row.
   */
  public tiles: Tile[];

  constructor(id: number, { length, basePath, onClick }: RowProps) {
    super({});
    this.id = id;
    this.tiles = Array.from({ length }, (_, y) => new Tile({ position: { x: id, y }, basePath, onClick }));
  }

  public set tile(index: TilesetIndex) {
    this.tiles[index].value = `${this.tiles[index].basePath}/${index}.gif`;
  }

  /**
   * Retrieves a tile from the tiles array at the specified index.
   *
   * @param index - The position of the tile in the tiles array.
   * @returns The tile at the specified index.
   * @throws Will throw an error if the tile at the specified index does not exist.
   */
  public getTile(index: number): Tile {
    if (!this.tiles[index]) {
      throw new Error(`Tile at position=${index} does not exist`);
    }

    return this.tiles[index];
  }

  /**
   * Retrieves the next tile in the sequence based on the provided index.
   *
   * @param index - The current index of the tile.
   * @returns The tile class instance at the next index.
   */
  public next(index: number): Tile {
    return this.getTile(index + 1);
  }

  /**
   * Retrieves the tile located at the previous index.
   *
   * @param index - The current index of the tile.
   * @returns The tile located at the index immediately preceding the given index.
   */
  public previous(index: number): Tile {
    return this.getTile(index - 1);
  }

  /**
   * Gets the number of tiles in the row.
   *
   * @returns {number} The length of the tiles array.
   */
  public get length(): number {
    return this.tiles.length;
  }

  public render(): React.ReactNode {
    return (
      <div>
        {this.tiles.map((tile, index) => (
          <div key={`tile-${index}`}>{tile.render()}</div>
        ))}
      </div>
    );
  }
}
