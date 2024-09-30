import { Box, Container, Link, Typography } from '@mui/material';
import { BarChart, GroupedBarChart, IData, IGroupedData, StackedBarChart } from '@/components/dataviz';

const BAR_CHART_DATA: IData[] = [
  { label: 'Apples', value: 100 },
  { label: 'Bananas', value: 200 },
  { label: 'Oranges', value: 50 },
  { label: 'Kiwis', value: 150 },
];

const GROUPED_BAR_CHART_DATA: IGroupedData[] = [
  { label: 'Apples', values: [60, 80, 100] },
  { label: 'Bananas', values: [160, 200, 120] },
  { label: 'Oranges', values: [60, 40, 10] },
];

const Civitas = () => {
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
          <Link href="https://github.com/times/dataviz-catalogue">dataviz catalogue</Link> and Amelia Wattenberger's
          blog post on <Link href="https://2019.wattenberger.com/blog/react-and-d3">React and D3</Link>.
        </Typography>
        <BarChart data={BAR_CHART_DATA} />
        <GroupedBarChart data={GROUPED_BAR_CHART_DATA} />
        <StackedBarChart data={GROUPED_BAR_CHART_DATA} />
      </Box>
    </Container>
  );
};

export default Civitas;
