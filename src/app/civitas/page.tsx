import * as fs from 'node:fs';
import * as path from 'path';
import { Box, Container, Link, Typography } from '@mui/material';
import { ParliamentChart } from '@/components';

const Civitas = () => {
  const file = fs.readFileSync(path.resolve(process.cwd(), 'src/app/civitas/data/parliament.json'));
  const data = JSON.parse(file.toString()).data;

  return (
    <Container>
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
          Civitas
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Civitas is a Latin word that means "citizen" or "community". It is the root of the word "civilization". This
          page is inspired by the New York Times'{' '}
          <Link href="https://github.com/times/dataviz-catalogue">dataviz catalogue</Link>, Josh Rayman's election
          graphics on{' '}
          <Link href="https://observablehq.com/@joshrayman/what-if-the-uk-used-thailands-mixed-electoral-system">
            ObservableHQ
          </Link>{' '}
          and Amelia Wattenberger's blog post on{' '}
          <Link href="https://2019.wattenberger.com/blog/react-and-d3">React and D3</Link>.
          <br />
          <Link href="/civitas/making-of">Making of</Link>
        </Typography>
        <ParliamentChart data={data} />
      </Box>
    </Container>
  );
};

export default Civitas;
