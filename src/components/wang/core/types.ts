// number between 0 and 15
export type TilesetIndex = IntRange<0, 15>;
export type Tile = { index: TilesetIndex; position: Position };

export type Position = { x: number; y: number };

export type TilesetOptions = {
  length: number;
};

type IsPositive<N extends number> = `${N}` extends `-${number}` ? false : true;
type IsSameSign<N1 extends number, N2 extends number> = IsPositive<N1> extends IsPositive<N2> ? true : false;
type ToNumber<T> = T extends `${infer N extends number}` ? N : never;
type NegateNumber<N extends number> = N extends 0
  ? 0
  : `${N}` extends `-${infer PN}`
    ? ToNumber<PN>
    : ToNumber<`-${N}`>;
type Abs<N extends number> = `${N}` extends `-${infer PN extends number}` ? PN : N;

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

type EnumerateSigned<N extends number> =
  IsPositive<N> extends true ? Enumerate<Abs<N>> : NegateNumber<Enumerate<Abs<N>>>;

type IntRange<From extends number, To extends number> =
  IsSameSign<From, To> extends true
    ? Exclude<EnumerateSigned<To>, EnumerateSigned<From>>
    : From | EnumerateSigned<From> | EnumerateSigned<To>;
