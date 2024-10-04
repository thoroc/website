import Seat from '@/components/dataviz/HemicycleChart/Seat';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';

export const CivitasMakingOf = () => {
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
      <Box sx={{ justifyContent: 'left', alignItems: 'self-start' }}>
        <Typography variant="body1" sx={{ mb: 2 }}>
          first we need to create the representation for a single seat.
        </Typography>
        <Box>
          <Seat />
        </Box>
      </Box>
    </Box>
  );
};

export default CivitasMakingOf;
