import { Box, ImageList, ImageListItem } from '@mui/material';
import { loadTileset } from './utils';

interface TilesetProps {
  basePath: string;
}

const Tileset: React.FC<TilesetProps> = ({ basePath }) => {
  const tileset = (loadTileset({ basePath }) as React.ReactNode[]) || [];

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
        {tileset.map((tile, i) => (
          <ImageListItem key={i}>{tile}</ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default Tileset;
