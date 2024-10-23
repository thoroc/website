import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Link from 'next/link';
import {
  Grid2,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import { loadTileset } from '@/components/wang/core';
import Tileset from '@/components/wang/tilesets/Tileset';
import Playground from '@/components/wang/playground/Playground';

const WangTile = () => {
  const tileset = (loadTileset({ basePath: '/wang-tiles/2-edge/img/base' }) as React.ReactNode[]) || [];

  return (
    <Container maxWidth="lg">
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
          Introduction
        </Typography>
        <Box sx={{ maxWidth: 'sm' }}>
          Wang tiles were first proposed by mathematician, Hao Wang in 1961. A set of square tiles, with each tile edge
          of a fixed color, are arranged side by side in a rectangular grid. All four edges of each tile must 'match'
          (have the same color as) their adjoining neighbor. The tiles never overlap and usually all spaces (cells) in
          the grid are filled. Tiles have a 'fixed orientation', they are never rotated or reflected (turned over). With
          careful tile design, a complete array can produce a large image without visual 'breaks' between tiles. This
          helps computer game designers create large tiled backgrounds from a small set of tile images. Edge matching
          Wang tiles tend to produce path or maze designs. A second type of tile set are corner tiles. These are matched
          by their corners and tend to produce patch or terrain designs. Read more about Wang Tiles at{' '}
          <Link href="http://en.wikipedia.org/wiki/Wang_tile">Wikipedia</Link>.
        </Box>
        <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
          Wang Tileset
        </Typography>
        <Box sx={{ maxWidth: 'sm' }}>
          Here is a set of Wang tiles. You can see that every tile has two different types of edge; blue or yellow. This
          gives 2x2x2x2 (written as 2^4), or 16 possible combinations. Hence the complete set contains 16 different
          tiles.
          <Box
            sx={{
              my: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ImageList cols={16} gap={0}>
              {tileset.map(
                (tile, i) => (
                  console.log(tile),
                  (
                    <ImageListItem key={i}>
                      {tile}
                      <ImageListItemBar title={i} position="below" />
                    </ImageListItem>
                  )
                ),
              )}
            </ImageList>
          </Box>
          The set is said to be 'complete' as it includes a tile for every possible combination of two edges. We can use
          these tiles to fill a grid where all tile edges match.
        </Box>
        <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
          Bitwise Tile Index
        </Typography>
        <Box sx={{ maxWidth: 'sm' }}>
          <Grid2 container spacing={2}>
            <Grid2 size={8}>
              With some bitwise maths, we can compute a unique 'index' number for each tile. Ignore blue edges. Add up
              yellow edges using the following binary weighting:{' '}
              <List>
                <ListItem>
                  <ListItemText>Yellow North = 1</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>Yellow East = 2</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>Yellow South = 4</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>Yellow West = 8</ListItemText>
                </ListItem>
              </List>
              Blue edges are ignored.
            </Grid2>
            <Grid2 size={4}>
              <Typography variant="h5">2-edge weighting</Typography>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>North = 1</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>West = 8</TableCell>
                    <TableCell>{tileset[9]}</TableCell>
                    <TableCell>East = 2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>South = 4</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              This tile has yellow edges North(1) and West(8). Adding up gives a tile index of '9'.
            </Grid2>
          </Grid2>
          Hence each tile can be given a unique index number, 0-15.
        </Box>
        <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
          4x4 Layout
        </Typography>
        <Box sx={{ maxWidth: 'sm' }}>
          <Grid2 container spacing={2}>
            <Grid2 size={8}>
              The complete tileset of 16 tiles can be arranged in a convienient 4x4 layout. All tile edges match and all
              border edges are '0' blue. More 2-edge tilesets can be seen here.
            </Grid2>
            <Grid2 size={4}>
              <Tileset basePath="/wang-tiles/2-edge/img/base" />
            </Grid2>
          </Grid2>
        </Box>
        <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
          Random Wang Tile Array
        </Typography>
        <Box sx={{ maxWidth: 'sm' }}>
          We arrange Wang tiles in a grid array. For each position, a tile is selected at random from the tileset,
          always ensuring that all edges match adjacent tiles. See Path Tiles for more info, images and interactive
          Stagecast sim. See Stage for random tile arrays.
          <Playground size={{ width: 16, height: 8 }} basePath="/wang-tiles/2-edge/img/base" />
        </Box>
        {/* <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
          4x4 Layout
        </Typography>
        <Box sx={{ maxWidth: 'sm' }}></Box> */}
      </Box>
    </Container>
  );
};

export default WangTile;