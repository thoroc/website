import { Table } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const About = () => {
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
          2-edge Wang Tiles
        </Typography>
        <Box sx={{ maxWidth: 'sm' }}>
          To create a more maze-like design, we simply replace the colored edge Wang tiles with more artistic path
          designs. Like this one:
          <Table> </Table>
        </Box>
      </Box>
    </Container>
  );
};

export default About;
