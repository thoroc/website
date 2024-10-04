export type PartyType = {
  name: string;
  color: string;
  seats: number;
};

export type HemicycleDataset = {
  parties: PartyType[];
};

export type SeatType = {
  party: PartyType;
  data: any;
  polar: { r: number; teta: number };
  cartesian: { x: number; y: number };
};

export type RowType = {
  seats: SeatType[];
};
