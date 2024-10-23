import { GridClass } from './grid';
import { RowClass } from './row';
import { TileClass } from './tile';
import { loadTileset } from './utils';

jest.mock('./row');
jest.mock('./tile');
jest.mock('./utils');

describe('GridClass', () => {
  const mockTileset = ['<div key="1" />', '<div key="2" />'];
  const basePath = 'path/to/tileset';

  beforeEach(() => {
    (loadTileset as jest.Mock).mockReturnValue(mockTileset);
    (RowClass as jest.Mock).mockImplementation((id: number, length: number) => ({
      id,
      length,
      getTile: jest.fn().mockReturnValue(new TileClass({ position: { x: id, y: 1 }, tileset: mockTileset, basePath })),
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with correct width and height', () => {
    const id = 1;
    const grid = new GridClass(id, { width: 10, height: 5, tileset: mockTileset, basePath });

    expect(grid.width).toBe(10);
    expect(grid.height).toBe(5);
  });

  it('should create rows based on height', () => {
    const id = 1;
    const grid = new GridClass(id, { width: 10, height: 5, tileset: mockTileset, basePath });

    expect(grid.rows).toHaveLength(5);

    for (let i = 0; i < 5; i++) {
      expect(RowClass).toHaveBeenCalledWith(i, 10);
    }
  });

  it('should load tileset correctly', () => {
    const id = 1;
    const grid = new GridClass(id, { width: 10, height: 5, basePath });

    expect(loadTileset).toHaveBeenCalledWith({ basePath: 'src/components/wang/tiles' });
    expect(grid.tileset).toEqual(mockTileset);
  });

  it('should throw an error if tileset fails to load', () => {
    const id = 1;
    (loadTileset as jest.Mock).mockReturnValue(null);

    expect(() => new GridClass(id, { width: 10, height: 5, basePath })).toThrow('Failed to load tileset');
  });

  it('should return the correct tile', () => {
    const id = 1;
    const grid = new GridClass(id, { width: 10, height: 5, tileset: mockTileset, basePath });
    const tile = grid.getTile(1, 2);

    expect(grid.getRow(2).getTile).toHaveBeenCalledWith(1);
    expect(tile).toBeInstanceOf(TileClass);
  });

  it('should return the correct row', () => {
    const id = 1;
    const grid = new GridClass(id, { width: 10, height: 5, tileset: mockTileset, basePath });
    const row = grid.getRow(2);

    expect(row.id).toBe(2);
    expect(row.length).toBe(10);
  });

  it('should initialize tileset with provided tileset', () => {
    const id = 1;
    const grid = new GridClass(id, { width: 10, height: 5, tileset: mockTileset, basePath });

    expect(grid.tileset).toBe(mockTileset);
  });

  it('should initialize tileset with loaded tileset if not provided', () => {
    const id = 1;
    const grid = new GridClass(id, { width: 10, height: 5, basePath });

    expect(grid.tileset).toBe(mockTileset);
  });
});
