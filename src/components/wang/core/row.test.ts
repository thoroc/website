import { RowClass } from './row';
import { TileClass } from './tile';

jest.mock('./tile');

describe('RowClass', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with the correct number of tiles', () => {
    const length = 5;
    const row = new RowClass(1, length);

    expect(row.tiles).toHaveLength(length);
    for (let i = 0; i < length; i++) {
      expect(TileClass).toHaveBeenCalledWith({ position: { x: 1, y: i } });
    }
  });

  it('should set value of a specific tile', () => {
    const row = new RowClass(1, 3);
    const node = '<div>Test Node</div>';

    row.setValue(1, node);

    expect(row.tiles[1].setValue).toHaveBeenCalledWith(node);
  });

  it('should get the correct tile', () => {
    const row = new RowClass(1, 3);

    const tile = row.getTile(2);

    expect(tile).toBe(row.tiles[2]);
  });
});
