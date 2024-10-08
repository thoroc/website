export enum CardinalDirections {
  NORTH = 1,
  EAST = 2,
  SOUTH = 4,
  WEST = 8,
}

export enum DiagonalDirections {
  NORTH_EAST = 3,
  SOUTH_EAST = 6,
  SOUTH_WEST = 12,
  NORTH_WEST = 9,
}

interface DirectionShift {
  direction: number;
  shift: number;
}

/**
 * Shifts a given direction value clockwise by a specified number of positions.
 *
 * @param direction - The initial direction value to be shifted.
 * @param shift - The number of positions to shift the direction value.
 * @returns The new direction value after being shifted clockwise.
 */
export const shiftClockwise = (props: DirectionShift): number => {
  const { direction, shift } = props;
  return (direction << shift) | (direction >>> (4 - shift));
};

/**
 * Shifts a 4-bit direction value counterclockwise by a specified number of positions.
 *
 * @param direction - The 4-bit direction value to be shifted.
 * @param shift - The number of positions to shift the direction value.
 * @returns The new direction value after the shift.
 */
export const shiftCounterClockwise = (props: DirectionShift): number => {
  const { direction, shift } = props;
  return (direction >>> shift) | (direction << (4 - shift));
};
