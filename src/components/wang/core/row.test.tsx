import { Row } from './row';
import { Tile } from './tile';

jest.mock('./tile');

describe('Row', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const basePath = 'path/to/tileset';
  const mockTileset = jest.fn();

  it('should initialize with the correct number of tiles', () => {
    const length = 5;
    const row = new Row(1, { length, basePath });

    expect(row.tiles).toHaveLength(length);
    for (let i = 0; i < length; i++) {
      expect(Tile).toHaveBeenCalledWith({
        position: { x: 1, y: i },
        onClick: undefined,
        basePath,
        tileset: {},
      });
    }
  });

  it('should get the correct tile', () => {
    const row = new Row(1, { length: 3, basePath });

    const tile = row.getTile(2);

    expect(tile).toBe(row.tiles[2]);
  });

  it('should return the correct length of tiles', () => {
    const length = 4;
    const row = new Row(1, { length, basePath });

    expect(row.length).toBe(length);
  });

  it('should throw an error when getting a non-existent tile', () => {
    const row = new Row(1, { length: 3, basePath });

    expect(() => row.getTile(5)).toThrow();
  });
});
