import { GridClass } from './grid';
import { RowClass } from './row';
import { TileClass } from './tile';
import { loadTileset } from './utils';

jest.mock('./row');
jest.mock('./tile');
jest.mock('./utils');

describe('GridClass', () => {
  const mockTileset = ['<div key="1" />', '<div key="2" />'];

  beforeEach(() => {
    (loadTileset as jest.Mock).mockReturnValue(mockTileset);
    (RowClass as jest.Mock).mockImplementation((y: number, width: number) => ({
      y,
      width,
      getTile: jest.fn().mockReturnValue(new TileClass({ x: 0, y: 0, index: 0, tileset: mockTileset })),
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with correct width and height', () => {
    const id = 1;
    const grid = new GridClass(id, { width: 10, height: 5, tileset: mockTileset });

    expect(grid.width).toBe(10);
    expect(grid.height).toBe(5);
  });

  it('should create rows based on height', () => {
    const id = 1;
    const grid = new GridClass(id, { width: 10, height: 5, tileset: mockTileset });

    expect(grid.rows).toHaveLength(5);
    grid.rows.forEach((row, index) => {
      expect(row.id).toBe(index);
      expect(row.tiles.length).toBe(10);
    });
  });

  it('should load tileset correctly', () => {
    const id = 1;
    const grid = new GridClass(id, { width: 10, height: 5, tileset: mockTileset });

    expect(loadTileset).toHaveBeenCalledWith({ basePath: 'src/components/wang/tiles' });
    expect(grid.tileset).toEqual(mockTileset);
  });

  it('should throw an error if tileset fails to load', () => {
    const id = 1;
    (loadTileset as jest.Mock).mockReturnValue(null);

    expect(() => new GridClass(id, { width: 10, height: 5, tileset: mockTileset })).toThrow('Failed to load tileset');
  });

  it('should return the correct tile', () => {
    const id = 1;
    const grid = new GridClass(id, { width: 10, height: 5, tileset: mockTileset });
    const tile = grid.getTile(1, 2);

    expect(grid.getRow(2).getTile).toHaveBeenCalledWith(1);
    expect(tile).toBeInstanceOf(TileClass);
  });

  it('should return the correct row', () => {
    const id = 1;
    const grid = new GridClass(id, { width: 10, height: 5, tileset: mockTileset });
    const row = grid.getRow(2);

    expect(row.id).toBe(2);
    expect(row.tiles.length).toBe(10);
  });
});
