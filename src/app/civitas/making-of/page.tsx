'use client';

import HemicycleChart from '@/components/dataviz/HemicycleChart';
import { HemicycleDataset } from '@/components/dataviz/HemicycleChart/types';
import { Box, Grid2 as Grid, Typography } from '@mui/material';
import Link from 'next/link';

const CivitasMakingOf = () => {
  const data: HemicycleDataset = {
    parties: [
      { name: 'Party 1', color: 'red', seats: 12 },
      { name: 'Party 2', color: 'blue', seats: 23 },
      { name: 'Party 3', color: 'green', seats: 55 },
      { name: 'Party 4', color: 'yellow', seats: 182 },
      { name: 'Party 5', color: 'purple', seats: 308 },
    ],
  };

  const size = { width: 640, height: 480 };

  return (
    <Box
      sx={{
        my: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Civitas Making Of
      </Typography>
      <Link href="/civitas"> Return to Civitas</Link>
      <Grid container spacing={2}>
        <Grid size={6}>Code here</Grid>
        <Grid size={6}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            first we need to create the representation for a single seat.
          </Typography>
        </Grid>
      </Grid>
      <Box>
        <HemicycleChart data={data} size={size} />
      </Box>
    </Box>
  );
};

export default CivitasMakingOf;
