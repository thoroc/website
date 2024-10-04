export type Party = {
  id: string;
  name: string;
  seats: number | any[];
  color: string;
};

export type Seat = {
  polar: {
    r: number;
    teta: number;
  };
  cartesian: {
    x: number;
    y: number;
  };
  party?: Party;
  data?: any;
};
