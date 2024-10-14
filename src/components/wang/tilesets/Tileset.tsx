import { Box, ImageList, ImageListItem } from '@mui/material';
import { loadTileset } from '../core';

export interface TilesetProps {
  basePath: string;
  dimensions?: { width: number; height: number };
  size?: number;
}

const Tileset: React.FC<TilesetProps> = ({ basePath, dimensions = { width: 4, height: 4 }, size = 32 }) => {
  const tileset = (loadTileset({ basePath, dimensions, size }) as React.ReactNode[]) || [];

  // custom order to keep the tileset with a consistent layout
  const order = [
    [0, 2, 10, 8],
    [4, 6, 14, 12],
    [5, 7, 15, 13],
    [1, 3, 11, 9],
  ];

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
      <ImageList cols={4} gap={0}>
        {Array.from({ length: dimensions.width }).map((_, i) =>
          Array.from({ length: dimensions.height }).map((_, j) => (
            <ImageListItem key={`${i}${j}`}>{tileset[order[i][j]]}</ImageListItem>
          )),
        )}
      </ImageList>
    </Box>
  );
};

export default Tileset;
