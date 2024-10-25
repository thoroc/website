import { Grid } from './grid';
import { Row } from './row';
import { Tile } from './tile';
import { render } from '@testing-library/react';

jest.mock('./row');
jest.mock('./tile');

describe('Grid', () => {
  const basePath = 'path/to/tileset';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with correct width and height', () => {
    const id = 1;
    const grid = new Grid(id, { width: 10, height: 5, basePath });

    expect(grid.width).toBe(10);
    expect(grid.height).toBe(5);
  });

  it('should create rows based on height', () => {
    const id = 1;
    const grid = new Grid(id, { width: 10, height: 5, basePath });

    expect(grid.rows).toHaveLength(5);

    for (let i = 0; i < 5; i++) {
      expect(Row).toHaveBeenCalledWith(i, { length: 10, basePath });
    }
  });

  it('should return the correct tile from the specified row and tile indices', () => {
    const id = 1;
    const grid = new Grid(id, { width: 10, height: 5, basePath });
    const rowIndex = 2;
    const tileIndex = 3;
    const mockTile = new Tile({ position: { x: rowIndex, y: tileIndex }, basePath });

    (Row.prototype.getTile as jest.Mock).mockReturnValue(mockTile);

    const tile = grid.getTile(rowIndex, tileIndex);

    expect(grid.getRow(rowIndex).getTile).toHaveBeenCalledWith(tileIndex);
    expect(tile).toBe(mockTile);
  });

  it('should return the correct row based on the provided row index', () => {
    const id = 1;
    const rowIndex = 2;

    (Row as jest.Mock).mockImplementation((id, { length }) => ({
      id,
      length,
    }));

    const grid = new Grid(id, { width: 10, height: 5, basePath });
    const row = grid.getRow(rowIndex);

    expect(row.id).toBe(rowIndex);
    expect(row.length).toBe(10);
  });

  it('should throw an error if the row index is out of bounds', () => {
    const id = 1;
    const grid = new Grid(id, { width: 10, height: 5, basePath });

    expect(() => grid.getRow(-1)).toThrow();
    expect(() => grid.getRow(5)).toThrow();
  });

  it('should render the grid correctly', () => {
    const id = 1;

    (Row as jest.Mock).mockImplementation((id, { length }) => ({
      id,
      length,
      tiles: Array.from({ length }, (_, x) => new Tile({ position: { x, y: id }, basePath })),
      getTile: jest.fn(),
    }));

    const grid = new Grid(id, { width: 3, height: 2, basePath });
    const { container } = render(grid.render());

    expect(container.querySelectorAll('li')).toHaveLength(6);
  });
});
