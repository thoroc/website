import { Box, ImageList, ImageListItem, Typography } from '@mui/material';
import { loadTileset } from './tilesets/utils';

interface PlaygroundProps {
  size: { width: number; height: number };
  basePath: string;
}

const buildPlayground = (size: { width: number; height: number }, tileset: React.ReactNode[]) => {
  // Initialize playground array
  const playground: React.ReactNode[] = [];

  if (tileset.length === 0) {
    console.error('Tileset is empty.');
    return [];
  }

  // Populate the playground with random tiles
  for (let y = 0; y < size.height; y++) {
    for (let x = 0; x < size.width; x++) {
      const index = Math.floor(Math.random() * tileset.length);
      playground.push(tileset[index]); // Add the random tile to the current row
    }
  }

  return playground;
};

const Playground: React.FC<PlaygroundProps> = ({ size = { width: 4, height: 4 }, basePath }) => {
  const tileset = (loadTileset({ basePath }) as React.ReactNode[]) || [];
  const initialState = buildPlayground(size, tileset);

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
      <ImageList cols={size.width} gap={0}>
        {initialState.map((tile, index) => (
          <ImageListItem key={index}>{tile}</ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default Playground;
