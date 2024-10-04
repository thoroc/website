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

function calculatePositionsWithMinRadius(
  totalPoints: number,
  circleRadius: number,
  distanceBetween: number,
  minHemicycleRadius: number,
): { x: number; y: number }[] {
  const positions = [];
  const circleDiameter = circleRadius * 2;
  let remainingPoints = totalPoints;
  let currentRadius = minHemicycleRadius; // Start with the minimum hemicycle radius

  // Continue until all points are placed
  while (remainingPoints > 0) {
    // Calculate the available arc length (circumference of the row's hemicycle)
    const rowCircumference = Math.PI * currentRadius; // Half circle circumference for the current row

    // Adjust the arc length for the circle radius offsets on both ends
    const effectiveArcLength = rowCircumference - circleDiameter; // Reduce by circle diameter

    // Calculate how many points can fit in this row using the effective arc length
    const pointsInRow = Math.floor(effectiveArcLength / (circleDiameter + distanceBetween));

    // Calculate the angle for the spacing based on the number of points
    const angleSpacing = Math.PI / (pointsInRow + 1); // Evenly space points across half a circle

    // Place points on this row
    for (let i = 0; i < Math.min(pointsInRow, remainingPoints); i++) {
      // Calculate the angle for each circle's position
      const theta = angleSpacing * (i + 1); // Reverse the order for the last circle on the right

      // Calculate x, y coordinates for this point based on angle and radius
      const x = (currentRadius + circleRadius) * Math.cos(theta); // Use (currentRadius + circleRadius) for proper spacing
      const y = -(currentRadius + circleRadius) * Math.sin(theta); // Flip y-coordinate to position it in the upper half

      positions.push({ x, y });
    }

    // Subtract the number of points placed in this row from remaining points
    remainingPoints -= pointsInRow;

    // Update the radius for the next row: Add the circle diameter + distanceBetween for vertical spacing
    currentRadius += circleDiameter + distanceBetween;
  }

  return positions;
}

const HemicycleChart = (props: HemicycleChartProps) => {
  const { data, radius = 20, rows = 10 } = props;
  const margin = props.margin || { top: 10, right: 10, bottom: 10, left: 10 };
  const width = (props.size?.width || 500) - margin.left - margin.right;
  const height = (props.size?.height || 300) - margin.top - margin.bottom;

  const totalSeats = data.parties.reduce((acc, party) => acc + party.seats, 0);

  const d = calculatePositionsWithMinRadius(totalSeats, 5, 2, 50);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${width / 2}, ${height})`}>
        {d.map((p, i) => (
          <Seat position={p} radius={5} key={i} />
        ))}
      </g>
    </svg>
  );
};

export default HemicycleChart;
