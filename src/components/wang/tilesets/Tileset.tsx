import { Box, ImageList, ImageListItem } from '@mui/material';
import BaseTile from './BaseTile';
import { TilesetIndex } from '../playground/types';

interface TilesetProps {
  basePath: string;
  size?: number;
}

export const loadTileset: React.FC<TilesetProps> = ({ basePath, size = 32 }): React.ReactNode[] => {
  const tileset = [];

  for (let i = 0; i < 16; i++) {
    tileset.push(<BaseTile index={i as TilesetIndex} scale={{ width: size, height: size }} basePath={basePath} />);
  }

  return tileset;
};

const Tileset: React.FC<TilesetProps> = ({ basePath, size = 32 }) => {
  const tileset = (loadTileset({ basePath, size }) as React.ReactNode[]) || [];

  // custom order to keep the tileset with a consistent layout
  const order = [0, 2, 10, 8, 4, 6, 14, 12, 5, 7, 15, 13, 1, 3, 11, 9];

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
        {order.map((i) => (
          <ImageListItem key={i}>{tileset[i]}</ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default Tileset;
