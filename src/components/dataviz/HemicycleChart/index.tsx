'use client';

import * as d3 from 'd3';
import Seat from './Seat';
import { HemicycleDataset } from './types';

export type HemicycleChartProps = {
  data: HemicycleDataset;
  rows?: number;
  radius?: number;
  position?: { x: number; y: number };
  size?: { width: number; height: number };
  margin?: { top: number; right: number; bottom: number; left: number };
};

// Function to calculate positions of circles distributed in a hemicycle with increasing row length
const distribution = ({
  totalSeats,
  totalRows,
  radius,
  rowHeight,
}: {
  totalSeats: number;
  totalRows: number;
  radius: number;
  rowHeight: number;
}): { x: number; y: number }[] => {
  const positions = [];
  let remainingPoints = totalSeats;
  let totalArcLength = Math.PI * radius; // The total arc length of the hemicycle

  for (let idx = 0; idx < totalRows; idx++) {
    // Calculate the radius for the current row (distance from the center)
    const rowRadius = radius + idx * rowHeight; // Each row gets closer to the center

    console.log('rowRadius', rowRadius);

    // Determine how many points can fit on this row based on its arc length
    const rowCircumference = Math.floor(Math.PI * rowRadius); // Arc length for the current row

    console.log('rowCircumference', rowCircumference);

    const pointsPerRow = Math.min(remainingPoints, Math.ceil((rowCircumference / totalArcLength) * totalSeats));

    // Update remaining points after assigning this row
    remainingPoints -= pointsPerRow;

    // Calculate the angular separation between points on this row
    const angularSeparation = Math.PI / (pointsPerRow - 1);

    // Calculate the position of each point in the row
    for (let i = 0; i < pointsPerRow; i++) {
      const theta = angularSeparation * i;

      // Calculate x, y coordinates based on angle and row radius
      const x = rowRadius * Math.cos(theta) * 10;
      const y = rowRadius * Math.sin(theta) * 10;

      // Add the point's coordinates to the result
      positions.push({ x, y });
    }
  }

  return positions;
};

const HemicycleChart = (props: HemicycleChartProps) => {
  const { data, radius = 20, rows = 10 } = props;
  const margin = props.margin || { top: 10, right: 10, bottom: 10, left: 10 };
  const width = (props.size?.width || 500) - margin.left - margin.right;
  const height = (props.size?.height || 300) - margin.top - margin.bottom;

  const totalSeats = data.parties.reduce((acc, party) => acc + party.seats, 0);

  const d = distribution({ totalSeats, totalRows: rows, radius, rowHeight: 80 });

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${width / 2}, 0)`}>
        {d.map((p, i) => (
          <Seat position={p} radius={5} key={i} />
        ))}
      </g>
    </svg>
  );
};

export default HemicycleChart;
