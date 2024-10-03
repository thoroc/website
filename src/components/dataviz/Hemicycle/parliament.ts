import { Party, Seat } from './types';

// Helper function to calculate a series of values
const series = ({ s, n }: { s: (i: number) => number; n: number }): number => {
  let r = 0;
  for (let i = 0; i <= n; i++) {
    r += s(i);
  }
  return r;
};

// Calculate the number of rows and other parameters for seats
const calculateRows = ({ nSeats, innerRadiusCoef }: { nSeats: number; innerRadiusCoef: number }) => {
  let nRows = 0;
  let maxSeatNumber = 0;
  let b = 0.5;

  const calcFloor = (i: number) => Math.floor(Math.PI * (b + i));
  const a = innerRadiusCoef / (1 - innerRadiusCoef);

  while (maxSeatNumber < nSeats) {
    nRows += 1;
    b += a;
    maxSeatNumber = series({ s: calcFloor, n: nRows - 1 });
  }

  return { nRows, maxSeatNumber, b };
};

// Create the seat objects with polar and cartesian coordinates
const createSeats = ({
  nSeats,
  nRows,
  b,
  rowWidth,
  outerParliamentRadius,
  innerParliamentRadius,
}: {
  nSeats: number;
  nRows: number;
  b: number;
  rowWidth: number;
  outerParliamentRadius: number;
  innerParliamentRadius: number;
}) => {
  const seats: Seat[] = [];
  const seatsToRemove = nSeats - nSeats; // Placeholder logic; may need to adjust

  for (let i = 0; i < nRows; i++) {
    const rowRadius = innerParliamentRadius + rowWidth * (i + 0.5);
    const rowSeats =
      Math.floor(Math.PI * (b + i)) - Math.floor(seatsToRemove / nRows) - (seatsToRemove % nRows > i ? 1 : 0);
    const anglePerSeat = Math.PI / rowSeats;

    for (let j = 0; j < rowSeats; j++) {
      const s: Seat = {
        polar: {
          r: rowRadius,
          teta: -Math.PI + anglePerSeat * (j + 0.5),
        },
        cartesian: {
          x: rowRadius * Math.cos(-Math.PI + anglePerSeat * (j + 0.5)),
          y: rowRadius * Math.sin(-Math.PI + anglePerSeat * (j + 0.5)),
        },
      };
      seats.push(s);
    }
  }

  return seats;
};

// Assign the seats to the parties
const assignSeatsToParties = ({ seats, data }: { seats: Seat[]; data: Party[] }) => {
  let seatIndex = 0;

  for (const party of data) {
    const nSeatsInParty = typeof party.seats === 'number' ? party.seats : party.seats.length;

    for (let i = 0; i < nSeatsInParty && seatIndex < seats.length; i++) {
      seats[seatIndex].party = party;
      seats[seatIndex].data = typeof party.seats === 'number' ? null : party.seats[i];
      seatIndex += 1;
    }
  }
};

const makeParliament = ({
  data,
  width,
  height,
  innerRadiusCoef,
}: {
  data: Party[];
  width: number;
  height: number;
  innerRadiusCoef: number;
}) => {
  const outerParliamentRadius = Math.min(width / 2, height);
  const innerParliamentRadius = outerParliamentRadius * innerRadiusCoef;

  let nSeats = data.reduce((acc, p) => acc + (typeof p.seats === 'number' ? Math.floor(p.seats) : p.seats.length), 0);

  const { nRows, maxSeatNumber, b } = calculateRows({ nSeats, innerRadiusCoef });

  const rowWidth = (outerParliamentRadius - innerParliamentRadius) / nRows;
  const seats = createSeats({ nSeats, nRows, b, rowWidth, outerParliamentRadius, innerParliamentRadius });

  seats.sort((a, b2) => a.polar.teta - b2.polar.teta || b2.polar.r - a.polar.r);

  assignSeatsToParties({ seats, data });

  return { seats, rowWidth };
};

export default makeParliament;
