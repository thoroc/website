'use client';

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

// Interface for Party data
export interface Party {
  id: string;
  name: string;
  seats: number | any[];
  color: string;
}

// Interface for configuration
interface Config {
  width: number;
  height: number;
  mobileWidth: number;
  mobileHeight: number;
  innerRadiusCoef: number;
}

// Interface for individual Seat data
interface Seat {
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
}

// Helper function to calculate a series of values
const series = (s: (i: number) => number, n: number): number => {
  let r = 0;
  for (let i = 0; i <= n; i++) {
    r += s(i);
  }
  return r;
};

// Calculate the number of rows and other parameters for seats
const calculateRows = (nSeats: number, innerRadiusCoef: number) => {
  let nRows = 0;
  let maxSeatNumber = 0;
  let b = 0.5;

  const calcFloor = (i: number) => Math.floor(Math.PI * (b + i));
  const a = innerRadiusCoef / (1 - innerRadiusCoef);

  while (maxSeatNumber < nSeats) {
    nRows += 1;
    b += a;
    maxSeatNumber = series(calcFloor, nRows - 1);
  }

  return { nRows, maxSeatNumber, b };
};

// Create the seat objects with polar and cartesian coordinates
const createSeats = (
  nSeats: number,
  nRows: number,
  b: number,
  rowWidth: number,
  outerParliamentRadius: number,
  innerParliamentRadius: number,
) => {
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
const assignSeatsToParties = (seats: Seat[], data: Party[]) => {
  let partyIndex = 0;
  let seatIndex = 0;

  seats.forEach((s) => {
    let party = data[partyIndex];
    // const nSeatsInParty = typeof party.seats === 'number' ? party.seats : party.seats.length;

    // if (seatIndex >= nSeatsInParty) {
    //   partyIndex += 1;
    //   seatIndex = 0;
    //   party = data[partyIndex];
    // }

    s.party = party;
    // s.data = typeof party.seats === 'number' ? null : party.seats[seatIndex];
    seatIndex += 1;
  });
};

interface ParliamentChartProps {
  data?: Party[];
  config?: Config;
}

// Main ParliamentChart component
const ParliamentChart: React.FC<ParliamentChartProps> = (props) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const config: Config = props.config || {
    width: 600,
    height: 400,
    mobileWidth: 300,
    mobileHeight: 200,
    innerRadiusCoef: 0.2,
  };

  const isMobile = window.innerWidth < 768;

  const data: Party[] = props.data || [
    { id: 'leu', name: 'Free and Equal', seats: 59, color: '#700000' },
    { id: 'pd', name: 'Democratic Party', seats: 281, color: '#E45B5B' },
    { id: 'centre-right', name: 'Centre right', seats: 23, color: '#4990E2' },
    { id: 'centre', name: 'Centre', seats: 28, color: '#F6C55E' },
    { id: 'others', name: 'Others', seats: 61, color: '#dbdbdb' },
    { id: 'm5s', name: 'Five Star Movement', seats: 88, color: '#F3D92B' },
    { id: 'forza', name: 'Forza Italia', seats: 56, color: '#4894D2' },
    { id: 'nleague', name: 'Northern League', seats: 22, color: '#65BDA2' },
    { id: 'brothers', name: 'Brothers of Italy', seats: 12, color: '#1d24bf' },
  ];

  const makeParliament = (data: Party[], width: number, height: number, innerRadiusCoef: number) => {
    const outerParliamentRadius = Math.min(width / 2, height);
    const innerParliamentRadius = outerParliamentRadius * innerRadiusCoef;

    let nSeats = data.reduce((acc, p) => acc + (typeof p.seats === 'number' ? Math.floor(p.seats) : p.seats.length), 0);

    const { nRows, maxSeatNumber, b } = calculateRows(nSeats, innerRadiusCoef);

    const rowWidth = (outerParliamentRadius - innerParliamentRadius) / nRows;
    const seats = createSeats(nSeats, nRows, b, rowWidth, outerParliamentRadius, innerParliamentRadius);

    seats.sort((a, b2) => a.polar.teta - b2.polar.teta || b2.polar.r - a.polar.r);

    assignSeatsToParties(seats, data);

    return { seats, rowWidth };
  };

  useEffect(() => {
    const { seats, rowWidth } = makeParliament(
      data,
      isMobile ? config.mobileWidth : config.width,
      isMobile ? config.mobileHeight : config.height,
      config.innerRadiusCoef,
    );

    const seatRadius = (d: Seat) => {
      let r = 0.4 * rowWidth;
      if (d.data && typeof d.data.size === 'number') {
        r *= d.data.size;
      }
      return r;
    };

    const svg = d3
      .select(svgRef.current)
      .attr('width', isMobile ? config.mobileWidth : config.width)
      .attr('height', isMobile ? config.mobileHeight : config.height)
      .style('background-color', '#f8f7f3');

    const group = svg
      .append('g')
      .attr(
        'transform',
        `translate(${isMobile ? config.mobileWidth / 2 : config.width / 2}, ${
          isMobile ? config.mobileHeight / 2 + 80 : config.height / 2 + 150
        })`,
      );

    group
      .selectAll('.seat')
      .data(seats)
      .enter()
      .append('circle')
      .attr('class', (d) => `seat ${d.party?.id}`)
      .attr('cx', (d) => d.cartesian.x)
      .attr('cy', (d) => d.cartesian.y)
      .attr('fill', (d) => d.party?.color || 'gray')
      .attr('r', seatRadius);
  }, [data, isMobile, config]);

  return <svg ref={svgRef}></svg>;
};

export default ParliamentChart;
