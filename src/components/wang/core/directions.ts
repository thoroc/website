export enum Cardinal {
  North = 1,
  East = 2,
  South = 4,
  West = 8,
  //    NorthEast = 16,
  //    SouthEast = 32,
  //    SouthWest = 64,
  //    NorthWest = 128,
}

export class Directions {
  private static HalfCount = Math.floor(Directions.getCardinalList().length / 2);

  private static RandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  public static get Keys(): number[] {
    return Object.values(Cardinal).filter((value) => typeof value === 'number') as number[];
  }

  public static get CardinalList(): Cardinal[] {
    return Directions.getCardinalList();
  }

  public static get ReversedCardinalList(): Cardinal[] {
    return Directions.getCardinalList().sort((a, b) => b - a);
  }

  public static get MinValue(): number {
    return Math.min(...Directions.Keys);
  }

  public static get MaxValue(): number {
    return Math.max(...Directions.Keys);
  }

  public static get All(): Cardinal[] {
    return [
      Cardinal.North,
      //            Cardinal.NorthEast,
      Cardinal.East,
      //            Cardinal.SouthEast,
      Cardinal.South,
      //            Cardinal.SouthWest,
      Cardinal.West,
      //            Cardinal.NorthWest,
    ];
  }

  public static OppositeDirection(direction: Cardinal): Cardinal {
    let value: number =
      direction > Directions.CardinalList[Directions.HalfCount - 1]
        ? direction >> Directions.HalfCount
        : direction << Directions.HalfCount;

    return Directions.GetDirection(value);
  }

  public static Next(direction: Cardinal): Cardinal {
    let value: number = direction === Directions.MaxValue ? Directions.MinValue : direction << 1;

    return Directions.GetDirection(value);
  }

  public static Previous(direction: Cardinal): Cardinal {
    let value: number = direction === Directions.MinValue ? Directions.MaxValue : direction >> 1;

    return Directions.GetDirection(value);
  }

  public static GetWeight(directions: Cardinal[]): number {
    return directions.reduce((sum, direction) => sum + direction, 0);
  }

  public static GetDirections(weight: number): Cardinal[] {
    let cardinal = weight as Cardinal;
    return Directions.ReversedCardinalList.filter((x) => (cardinal & x) !== 0);
  }

  public static GetExcludedDirections(weight: number): Cardinal[] {
    return Directions.All.filter((x) => !Directions.GetDirections(weight).includes(x));
  }

  public static GetRandomDirection(weightMask: number = 0): Cardinal | null {
    let availableCardinals = Directions.GetExcludedDirections(weightMask);
    if (availableCardinals.length === 0) return null;

    return availableCardinals[Directions.RandomInt(availableCardinals.length)];
  }

  public static GetDirection(value: number): Cardinal {
    if (Object.values(Cardinal).includes(value)) {
      return value as Cardinal;
    }
    throw new RangeError(`${value} is not a valid value for a direction. Maximum value is ${Directions.MaxValue}.`);
  }

  private static getCardinalList(): Cardinal[] {
    return Object.values(Cardinal).filter((value) => typeof value === 'number') as Cardinal[];
  }
}
