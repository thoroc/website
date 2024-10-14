import { Directions, Cardinal } from './directions';

describe('Directions.Keys', () => {
  it('should return an array of numbers representing the cardinal directions', () => {
    const keys = Directions.Keys;
    expect(keys).toEqual([1, 2, 4, 8]);
  });

  it('should have the correct length', () => {
    const keys = Directions.Keys;
    expect(keys.length).toBe(4);
  });

  it('should contain only numbers', () => {
    const keys = Directions.Keys;
    keys.forEach((key) => {
      expect(typeof key).toBe('number');
    });
  });
});

describe('Directions.CardinalList', () => {
  it('should return an array of cardinal directions', () => {
    const cardinalList = Directions.CardinalList;
    expect(cardinalList).toEqual([Cardinal.North, Cardinal.East, Cardinal.South, Cardinal.West]);
  });
});

describe('Directions.ReversedCardinalList', () => {
  it('should return an array of cardinal directions in reversed order', () => {
    const reversedCardinalList = Directions.ReversedCardinalList;
    expect(reversedCardinalList).toEqual([Cardinal.West, Cardinal.South, Cardinal.East, Cardinal.North]);
  });
});

describe('Directions.MinValue', () => {
  it('should return the minimum value of the cardinal directions', () => {
    const minValue = Directions.MinValue;
    expect(minValue).toBe(1);
  });
});

describe('Directions.MaxValue', () => {
  it('should return the maximum value of the cardinal directions', () => {
    const maxValue = Directions.MaxValue;
    expect(maxValue).toBe(8);
  });
});

describe('Directions.All', () => {
  it('should return an array of all cardinal directions', () => {
    const all = Directions.All;
    expect(all).toEqual([Cardinal.North, Cardinal.East, Cardinal.South, Cardinal.West]);
  });
});

describe('Directions.OppositeDirection', () => {
  it('should return the opposite direction', () => {
    expect(Directions.OppositeDirection(Cardinal.North)).toBe(Cardinal.South);
    expect(Directions.OppositeDirection(Cardinal.East)).toBe(Cardinal.West);
    expect(Directions.OppositeDirection(Cardinal.South)).toBe(Cardinal.North);
    expect(Directions.OppositeDirection(Cardinal.West)).toBe(Cardinal.East);
  });
});

describe('Directions.Next', () => {
  it('should return the next direction in sequence', () => {
    expect(Directions.Next(Cardinal.North)).toBe(Cardinal.East);
    expect(Directions.Next(Cardinal.East)).toBe(Cardinal.South);
    expect(Directions.Next(Cardinal.South)).toBe(Cardinal.West);
    expect(Directions.Next(Cardinal.West)).toBe(Cardinal.North);
  });
});

describe('Directions.Previous', () => {
  it('should return the previous direction in sequence', () => {
    expect(Directions.Previous(Cardinal.North)).toBe(Cardinal.West);
    expect(Directions.Previous(Cardinal.East)).toBe(Cardinal.North);
    expect(Directions.Previous(Cardinal.South)).toBe(Cardinal.East);
    expect(Directions.Previous(Cardinal.West)).toBe(Cardinal.South);
  });
});

describe('Directions.GetWeight', () => {
  it('should return the sum of the directions', () => {
    const weight = Directions.GetWeight([Cardinal.North, Cardinal.East]);
    expect(weight).toBe(3);
  });
});

describe('Directions.GetDirections', () => {
  it('should return the directions corresponding to the weight', () => {
    expect(Directions.GetDirections(1)).toEqual([Cardinal.North]);
    expect(Directions.GetDirections(2)).toEqual([Cardinal.East]);
    expect(Directions.GetDirections(3)).toEqual([Cardinal.East, Cardinal.North]);
    expect(Directions.GetDirections(4)).toEqual([Cardinal.South]);
    expect(Directions.GetDirections(5)).toEqual([Cardinal.South, Cardinal.North]);
    expect(Directions.GetDirections(6)).toEqual([Cardinal.South, Cardinal.East]);
  });
});

describe('Directions.GetExcludedDirections', () => {
  it('should return the directions not included in the weight', () => {
    const excludedDirections = Directions.GetExcludedDirections(3);
    expect(excludedDirections).toEqual([Cardinal.South, Cardinal.West]);
  });
});

describe('Directions.GetRandomDirection', () => {
  it('should return a random direction not included in the weight mask', () => {
    const randomDirection = Directions.GetRandomDirection(3);
    expect([Cardinal.South, Cardinal.West]).toContain(randomDirection);
  });

  it('should return null if all directions are included in the weight mask', () => {
    const randomDirection = Directions.GetRandomDirection(15);
    expect(randomDirection).toBeNull();
  });
});

describe('Directions.GetDirection', () => {
  it('should return the direction corresponding to the value', () => {
    expect(Directions.GetDirection(1)).toBe(Cardinal.North);
    expect(Directions.GetDirection(2)).toBe(Cardinal.East);
    expect(Directions.GetDirection(4)).toBe(Cardinal.South);
    expect(Directions.GetDirection(8)).toBe(Cardinal.West);
  });

  it('should throw an error if the value is not a valid direction', () => {
    expect(() => Directions.GetDirection(16)).toThrow(RangeError);
  });
});
