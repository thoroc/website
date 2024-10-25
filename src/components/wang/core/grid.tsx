'use client';

import { Row } from './row';
import { Tile } from './tile';
import React from 'react';
import { ImageList, ImageListItem } from '@mui/material';

interface GridProps {
  width: number;
  height: number;
  basePath: string;
}

export class Grid extends React.Component {
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
  public rows: Row[];

  constructor(id: number, { width, height, /* tileset, */ basePath }: GridProps) {
    super({});
    this.id = id;
    this.width = width;
    this.height = height;

    this.rows = Array.from({ length: height }, (_, y) => new Row(y, { length: width, basePath }));
  }

  /**
   * Retrieves a specific tile from a given row.
   *
   * @param rowIndex - The index of the row from which to retrieve the tile.
   * @param tileIndex - The index of the tile within the specified row.
   * @returns The tile at the specified row and tile indices.
   */
  public getTile(rowIndex: number, tileIndex: number): Tile {
    return this.getRow(rowIndex).getTile(tileIndex);
  }

  /**
   * Retrieves a row from the grid based on the provided row index.
   *
   * @param rowIndex - The index of the row to retrieve.
   * @returns The row at the specified index.
   */
  public getRow(rowIndex: number): Row {
    if (!this.rows[rowIndex]) {
      throw new Error(`Row at position=${rowIndex} does not exist`);
    }

    return this.rows[rowIndex];
  }

  public render(): React.ReactNode {
    return (
      <ImageList cols={this.width} gap={0}>
        {this.rows.map((row, colIndex) => {
          return row.tiles.map((tile, rowIndex) => (
            <ImageListItem key={`c${colIndex}-r${rowIndex}`}>{tile.render()}</ImageListItem>
          ));
        })}
      </ImageList>
    );
  }
}
