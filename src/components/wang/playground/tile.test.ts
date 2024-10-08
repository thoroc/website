import { Tile } from './tile';
import { TileIndex } from './types';

describe('Tile', () => {
  describe('inverse', () => {
    it('should return the bitwise inverse of the value', () => {
      const tile = new Tile(0, 0, 0b0000 as TileIndex);
      expect(tile.inverse).toBe(0b1111);

      const tile2 = new Tile(0, 0, 0b1010 as TileIndex);
      expect(tile2.inverse).toBe(0b0101);

      const tile3 = new Tile(0, 0, 0b1111 as TileIndex);
      expect(tile3.inverse).toBe(0b0000);
    });
  });

  describe('position', () => {
    it('should return the correct position', () => {
      const tile = new Tile(1, 2, 0b0000 as TileIndex);
      expect(tile.position).toEqual({ x: 1, y: 2 });
    });

    it('should set the correct position', () => {
      const tile = new Tile(1, 2, 0b0000 as TileIndex);
      tile.position = { x: 3, y: 4 };
      expect(tile.position).toEqual({ x: 3, y: 4 });
    });
  });

  describe('index', () => {
    it('should return the correct index', () => {
      const tile = new Tile(1, 2, 0b1010 as TileIndex);
      expect(tile.index).toBe(0b1010);
    });
  });

  describe('next', () => {
    it('should return the next index', () => {
      const tile = new Tile(1, 2, 0b1010 as TileIndex);
      expect(tile.next).toBe(0b1011);
    });
  });

  describe('previous', () => {
    it('should return the previous index', () => {
      const tile = new Tile(1, 2, 0b1010 as TileIndex);
      expect(tile.previous).toBe(0b1001);
    });
  });

  describe('inverse', () => {
    it('should return the bitwise inverse of the value', () => {
      const tile = new Tile(0, 0, 0b0000 as TileIndex);
      expect(tile.inverse).toBe(0b1111);

      const tile2 = new Tile(0, 0, 0b1010 as TileIndex);
      expect(tile2.inverse).toBe(0b0101);

      const tile3 = new Tile(0, 0, 0b1111 as TileIndex);
      expect(tile3.inverse).toBe(0b0000);
    });
  });
});
