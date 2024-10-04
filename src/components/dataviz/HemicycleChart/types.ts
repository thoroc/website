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
  polar: { r: number; teta: number };
  cartesian: { x: number; y: number };
};
