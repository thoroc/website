'use client';

import { RowClass } from './row';
import { TileClass } from './tile';
import { loadTileset } from './utils';
import { Tileset } from './types';
import React from 'react';
import { ImageList, ImageListItem } from '@mui/material';

interface GridClassProps {
  width: number;
  height: number;
  tileset?: Tileset;
  basePath: string;
}

export class GridClass extends React.Component {
  /**
   * The unique identifier for the grid.
   */
  public readonly id: number;
  /**
   * The width of the grid.
   */
  public readonly width: number;
  /**
   * The height of the grid.
   */
  public readonly height: number;
  /**
   * The array of rows that make up the grid.
   */
  public rows: RowClass[];
  /**
   * The tileset used to generate the tiles in the grid.
   */
  public tileset: Tileset;
  /**
   * The base path for the tileset images.
   */
  public readonly basePath: string;

  constructor(id: number, { width, height, tileset, basePath }: GridClassProps) {
    super({});
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

    this.rows = Array.from(
      { length: height },
      (_, y) => new RowClass(y, { length: width, tileset: this.tileset, basePath }),
    );
    this.basePath = basePath;
  }

  /**
   * Retrieves a specific tile from a given row.
   *
   * @param rowIndex - The index of the row from which to retrieve the tile.
   * @param tileIndex - The index of the tile within the specified row.
   * @returns The tile at the specified row and tile indices.
   */
  public getTile(rowIndex: number, tileIndex: number): TileClass {
    return this.getRow(rowIndex).getTile(tileIndex);
  }

  /**
   * Retrieves a row from the grid based on the provided row index.
   *
   * @param rowIndex - The index of the row to retrieve.
   * @returns The row at the specified index.
   */
  public getRow(rowIndex: number): RowClass {
    return this.rows[rowIndex];
  }

  public render(): React.ReactNode {
    return (
      <ImageList cols={this.width} gap={0}>
        {this.rows.map((row, colIndex) => {
          console.log(row);

          console.log(row.getTile(1));

          return row.tiles.map((tile, rowIndex) => (
            <ImageListItem key={`c${colIndex}-r${rowIndex}`}>{tile.render()}</ImageListItem>
          ));
        })}
      </ImageList>
    );
  }
}
