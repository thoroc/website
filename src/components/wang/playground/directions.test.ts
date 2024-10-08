import { CardinalDirections, DiagonalDirections, shiftClockwise, shiftCounterClockwise } from './directions';

describe('CardinalDirections Enum', () => {
  it('should have correct values', () => {
    expect(CardinalDirections.NORTH).toBe(1);
    expect(CardinalDirections.EAST).toBe(2);
    expect(CardinalDirections.SOUTH).toBe(4);
    expect(CardinalDirections.WEST).toBe(8);
  });
});

describe('DiagonalDirections Enum', () => {
  it('should have correct values', () => {
    expect(DiagonalDirections.NORTH_EAST).toBe(3);
    expect(DiagonalDirections.SOUTH_EAST).toBe(6);
    expect(DiagonalDirections.SOUTH_WEST).toBe(12);
    expect(DiagonalDirections.NORTH_WEST).toBe(9);
  });
});

describe('shiftClockwise', () => {
  it('should shift direction clockwise correctly', () => {
    const shift1 = shiftClockwise({ direction: CardinalDirections.NORTH, shift: 1 });
    expect(shift1).toBe(CardinalDirections.EAST);

    const shift2 = shiftClockwise({ direction: shift1, shift: 1 });
    expect(shift2).toBe(CardinalDirections.SOUTH);

    const shift3 = shiftClockwise({ direction: shift2, shift: 1 });
    expect(shift3).toBe(CardinalDirections.WEST);

    const shift4 = shiftClockwise({ direction: shift3, shift: 1 });
    expect(shift4).toBe(CardinalDirections.NORTH);
  });

  it('should handle multiple shifts correctly', () => {
    const initial = CardinalDirections.NORTH;

    const shift1 = shiftClockwise({ direction: initial, shift: 2 });
    expect(shift1).toBe(CardinalDirections.SOUTH);

    const shift2 = shiftClockwise({ direction: initial, shift: 3 });
    expect(shift2).toBe(CardinalDirections.WEST);

    const shift3 = shiftClockwise({ direction: initial, shift: 4 });
    expect(shift3).toBe(CardinalDirections.NORTH);
  });
});

describe('shiftCounterClockwise', () => {
  it('should shift direction counter-clockwise correctly', () => {
    const shift1 = shiftCounterClockwise({ direction: CardinalDirections.NORTH, shift: 1 });
    expect(shift1).toBe(CardinalDirections.WEST);

    const shift2 = shiftCounterClockwise({ direction: shift1, shift: 1 });
    expect(shift2).toBe(CardinalDirections.SOUTH);

    const shift3 = shiftCounterClockwise({ direction: shift2, shift: 1 });
    expect(shift3).toBe(CardinalDirections.EAST);

    const shift4 = shiftCounterClockwise({ direction: shift3, shift: 1 });
    expect(shift4).toBe(CardinalDirections.NORTH);
  });

  it('should handle multiple shifts correctly', () => {
    const initial = CardinalDirections.NORTH;

    const shift1 = shiftCounterClockwise({ direction: initial, shift: 2 });
    expect(shift1).toBe(CardinalDirections.SOUTH);

    const shift2 = shiftCounterClockwise({ direction: initial, shift: 3 });
    expect(shift2).toBe(CardinalDirections.EAST);

    const shift3 = shiftCounterClockwise({ direction: initial, shift: 4 });
    expect(shift3).toBe(CardinalDirections.NORTH);
  });
});
