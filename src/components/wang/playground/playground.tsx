import { Box, ImageList, ImageListItem, Typography } from '@mui/material';
import { loadTileset } from '../tilesets/Tileset';

type Grid = React.ReactNode[][];
type Row = React.ReactNode[];
type Tileset = React.ReactNode[];

const buildPlayground = (size: { width: number; height: number }, tileset: Tileset): Grid => {
  const playground: Grid = [];

  if (tileset.length === 0) {
    console.error('Tileset is empty.');
    return [];
  }

  for (let y = 0; y < size.width; y++) {
    const row: Row = [];

    for (let x = 0; x < size.height; x++) {
      const index = Math.floor(Math.random() * tileset.length);
      row.push(tileset[index]);
    }

    playground.push(row);
  }

  return playground;
};

type PlaygroundProps = {
  size: { width: number; height: number };
  basePath: string;
};

const Playground: React.FC<PlaygroundProps> = ({ size = { width: 4, height: 4 }, basePath }) => {
  const tileset = (loadTileset({ basePath }) as Tileset) || [];
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
        {initialState.map((row, rowIndex) =>
          row.map((tile, colIndex) => {
            return <ImageListItem key={`${rowIndex}-${colIndex}`}>{tile}</ImageListItem>;
          }),
        )}
      </ImageList>
    </Box>
  );
};

export default Playground;
