import React from 'react';
import { render } from '@testing-library/react';
import { loadTileset } from './utils';
import BaseTileComponent from '../tiles/BaseTile';

jest.mock('../tiles/BaseTile', () => {
  return jest.fn(() => <div data-testid="base-tile" />);
});

describe('loadTileset', () => {
  const basePath = 'path/to/tileset';
  const dimensions = { width: 4, height: 4 };
  const size = 32;

  it('should generate the correct number of tiles', () => {
    const tileset = loadTileset({ basePath, dimensions, size });
    expect(tileset).toHaveLength(dimensions.width * dimensions.height);
  });

  it('should render BaseTileComponent with correct props', () => {
    const tileset = loadTileset({ basePath, dimensions, size });
    const { getAllByTestId } = render(<>{tileset}</>);

    const baseTiles = getAllByTestId('base-tile');
    expect(baseTiles).toHaveLength(dimensions.width * dimensions.height);

    baseTiles.forEach((_tile: any, index: number) => {
      const x = index % dimensions.width;
      const y = Math.floor(index / dimensions.width);

      expect(BaseTileComponent).toHaveBeenCalledWith(
        expect.objectContaining({
          index: x,
          scale: { width: size, height: size },
          basePath,
          position: { x, y },
        }),
        expect.anything(),
      );
    });
  });

  it('should use default dimensions and size if not provided', () => {
    const tileset = loadTileset({ basePath });
    expect(tileset).toHaveLength(16); // default 4x4 grid

    const { getAllByTestId } = render(<>{tileset}</>);
    const baseTiles = getAllByTestId('base-tile');
    expect(baseTiles).toHaveLength(16);

    baseTiles.forEach((_tile: any, index: number) => {
      const x = index % 4;
      const y = Math.floor(index / 4);

      expect(BaseTileComponent).toHaveBeenCalledWith(
        expect.objectContaining({
          index: x,
          scale: { width: 32, height: 32 }, // default size
          basePath,
          position: { x, y },
        }),
        expect.anything(),
      );
    });
  });
});
