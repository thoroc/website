import { Box, Typography } from '@mui/material';
import ParliamentChart, { Party } from './ParliamentChart';

interface HemicycleProps {
  data: Party[];
  width?: number;
  height?: number;
  innerRadiusCoef: number;
}

export const Hemicycle = (props: HemicycleProps) => {
  const margin = { top: 10, right: 0, bottom: 20, left: 30 };
  const innerWidth = (props.width || 680) - margin.left - margin.right;
  const innerHeight = (props.height || 480) - margin.top - margin.bottom;

  return (
    <>
      <Box className="chart-title">
        <Typography variant="h5">Hemicycle</Typography>
      </Box>
      <svg width={innerWidth + margin.left + margin.right} height={innerHeight + margin.top + margin.bottom}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <ParliamentChart />
        </g>
      </svg>
    </>
  );
};
