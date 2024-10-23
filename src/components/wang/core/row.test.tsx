import { RowClass } from './row';
import { TileClass } from './tile';

jest.mock('./tile');

describe('RowClass', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const basePath = 'path/to/tileset';

  it('should initialize with the correct number of tiles', () => {
    const length = 5;
    const row = new RowClass(1, { length, tileset: {} as any, basePath });

    expect(row.tiles).toHaveLength(length);
    for (let i = 0; i < length; i++) {
      expect(TileClass).toHaveBeenCalledWith({ position: { x: 1, y: i } });
    }
  });

  it('should set value of a specific tile', () => {
    const row = new RowClass(1, { length: 3, tileset: {} as any, basePath });
    const node = '<div>Test Node</div>';

    row.setValue(1, node);

    expect(row.tiles[1].value).toBe(node);
  });

  it('should get the correct tile', () => {
    const row = new RowClass(1, { length: 3, tileset: {} as any, basePath });

    const tile = row.getTile(2);

    expect(tile).toBe(row.tiles[2]);
  });

  it('should return the correct length of tiles', () => {
    const length = 4;
    const row = new RowClass(1, { length, tileset: {} as any, basePath });

    expect(row.length).toBe(length);
  });

  it('should throw an error when setting value of a non-existent tile', () => {
    const row = new RowClass(1, { length: 3, tileset: {} as any, basePath });
    const node = '<div>Test Node</div>';

    expect(() => row.setValue(5, node)).toThrow();
  });

  it('should throw an error when getting a non-existent tile', () => {
    const row = new RowClass(1, { length: 3, tileset: {} as any, basePath });

    expect(() => row.getTile(5)).toThrow();
  });
});
