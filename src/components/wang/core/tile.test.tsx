import { TileClass } from './tile';
import { TilesetIndex } from './types';

describe('TileClass', () => {
  const basePath = 'path/to/tileset';

  describe('inverse', () => {
    it('should return the bitwise inverse of the value', () => {
      const tile = new TileClass({
        position: { x: 0, y: 0 },
        index: 0b0000 as TilesetIndex,
        tileset: {} as any,
        basePath,
      });
      expect(tile.inverse).toBe(0b1111);

      const tile2 = new TileClass({
        position: { x: 0, y: 0 },
        index: 0b1010 as TilesetIndex,
        tileset: {} as any,
        basePath,
      });
      expect(tile2.inverse).toBe(0b0101);

      const tile3 = new TileClass({
        position: { x: 0, y: 0 },
        index: 0b1111 as TilesetIndex,
        tileset: {} as any,
        basePath,
      });
      expect(tile3.inverse).toBe(0b0000);
    });
  });

  describe('position', () => {
    it('should return the correct position', () => {
      const tile = new TileClass({
        position: { x: 1, y: 2 },
        index: 0b0000 as TilesetIndex,
        tileset: {} as any,
        basePath,
      });
      expect(tile.position).toEqual({ x: 1, y: 2 });
    });

    it('should set the correct position', () => {
      const tile = new TileClass({
        position: { x: 1, y: 2 },
        index: 0b0000 as TilesetIndex,
        tileset: {} as any,
        basePath,
      });
      tile.position = { x: 3, y: 4 };
      expect(tile.position).toEqual({ x: 3, y: 4 });
    });
  });

  describe('index', () => {
    it('should return the correct index', () => {
      const tile = new TileClass({
        position: { x: 1, y: 2 },
        index: 0b1010 as TilesetIndex,
        tileset: {} as any,
        basePath,
      });
      expect(tile.index).toBe(0b1010);
    });
  });

  describe('next', () => {
    it('should return the next index', () => {
      const tile = new TileClass({
        position: { x: 1, y: 2 },
        index: 0b1010 as TilesetIndex,
        tileset: {} as any,
        basePath,
      });
      expect(tile.next).toBe(0b1011);
    });
  });

  describe('previous', () => {
    it('should return the previous index', () => {
      const tile = new TileClass({
        position: { x: 1, y: 2 },
        index: 0b1010 as TilesetIndex,
        tileset: {} as any,
        basePath,
      });
      expect(tile.previous).toBe(0b1001);
    });
  });

  describe('inverse', () => {
    it('should return the bitwise inverse of the value', () => {
      const tile = new TileClass({
        position: { x: 1, y: 2 },
        index: 0b0000 as TilesetIndex,
        tileset: {} as any,
        basePath,
      });
      expect(tile.inverse).toBe(0b1111);

      const tile2 = new TileClass({
        position: { x: 1, y: 2 },
        index: 0b1010 as TilesetIndex,
        tileset: {} as any,
        basePath,
      });
      expect(tile2.inverse).toBe(0b0101);

      const tile3 = new TileClass({
        position: { x: 1, y: 2 },
        index: 0b1111 as TilesetIndex,
        tileset: {} as any,
        basePath,
      });
      expect(tile3.inverse).toBe(0b0000);
    });
  });
});
