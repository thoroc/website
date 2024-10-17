import { Box, ImageList, ImageListItem, Typography } from '@mui/material';
import { GridClass, loadTileset } from '../core';

type Tileset = React.ReactNode[];

type PlaygroundProps = {
  size: { width: number; height: number };
  basePath: string;
};

const Playground: React.FC<PlaygroundProps> = ({ size = { width: 4, height: 4 }, basePath }) => {
  const tileset: React.ReactNode[] = (loadTileset({ basePath }) as Tileset) || [];
  const grid = new GridClass(1, { width: size.width, height: size.height, tileset });

  console.dir(grid);

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
        {grid.rows.map((row, colIndex) => {
          console.log(row);

          console.log(row.getTile(1));

          return row.tiles.map((tile, rowIndex) => (
            <ImageListItem key={`c${colIndex}-r${rowIndex}`}>{tile.node}</ImageListItem>
          ));
        })}
      </ImageList>
    </Box>
  );
};

export default Playground;
