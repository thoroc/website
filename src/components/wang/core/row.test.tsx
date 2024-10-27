import { Row } from './Row';
import { Tile } from './Tile';

describe('Row', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const basePath = 'path/to/tileset';

  it('should initialize with the correct id', () => {
    const id = 1;
    const row = new Row({ id, length: 3, basePath });

    expect(row.id).toBe(id);
  });

  it('should initialize with the correct number of tiles', () => {
    const length = 3;
    const row = new Row({ id: 1, length, basePath });

    expect(row.tiles).toHaveLength(length);
  });

  it('should initialize tiles with correct positions', () => {
    const length = 3;
    const row = new Row({ id: 1, length, basePath });

    for (let i = 0; i < length; i++) {
      expect(row.tiles[i].position).toEqual({ x: 1, y: i });
    }
  });

  it('should initialize tiles with correct basePath', () => {
    const length = 3;
    const row = new Row({ id: 1, length, basePath });

    for (let i = 0; i < length; i++) {
      expect(row.tiles[i].basePath).toBe(basePath);
    }
  });

  it('should initialize tiles with correct onClick handler', () => {
    const length = 3;
    const onClick = jest.fn();
    const row = new Row({ id: 1, length, basePath, onClick });

    for (let i = 0; i < length; i++) {
      expect(row.tiles[i].onClick).toBe(onClick);
    }
  });

  it('should get the correct tile', () => {
    const row = new Row({ id: 1, length: 3, basePath });

    const tile = row.getTile(2);

    expect(tile).toBe(row.tiles[2]);
  });

  it('should return the correct length of tiles', () => {
    const length = 4;
    const row = new Row({ id: 1, length, basePath });

    expect(row.length).toBe(length);
  });

  it('should throw an error when getting a non-existent tile', () => {
    const row = new Row({ id: 1, length: 3, basePath });

    expect(() => row.getTile(5)).toThrow();
  });

  it('should throw an error if the tile index is negative', () => {
    const row = new Row({ id: 1, length: 3, basePath });

    expect(() => row.getTile(-1)).toThrow('Tile at position=-1 does not exist');
  });

  it('should throw an error if the tile index is out of bounds', () => {
    const row = new Row({ id: 1, length: 3, basePath });

    expect(() => row.getTile(3)).toThrow('Tile at position=3 does not exist');
  });

  it('should return the tile if the index is within bounds', () => {
    const row = new Row({ id: 1, length: 3, basePath });

    const tile = row.getTile(1);

    expect(tile).toBe(row.tiles[1]);
  });
});
