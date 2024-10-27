'use client';

import { Box, Typography } from '@mui/material';
import { Grid, loadTileset, GridProps } from '../core';

type Tileset = React.ReactNode[];

type PlaygroundProps = {
  size: { width: number; height: number };
  basePath: string;
};

const Playground: React.FC<PlaygroundProps> = ({ size = { width: 4, height: 4 }, basePath }) => {
  const tileset: React.ReactNode[] = (loadTileset({ basePath }) as Tileset) || [];
  // const grid = new Grid(1, { width: size.width, height: size.height, basePath });

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
      <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
        Playground
      </Typography>
      This is a playground for Wang tiles. It will be interactive and allow you to create your own tilesets and arrays.
      You can also see the Stagecast sim and Stage for random tile arrays
      <Grid size={size} basePath={basePath} />
    </Box>
  );
};

export default Playground;
