import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { IGroupedData } from '../types';

interface Tooltip {
  x: number;
  y: number;
  index: number;
}

interface TooltipProps {
  data: IGroupedData[];
  tooltip: Tooltip;
}

export const TooltipTable = ({ data, tooltip }: TooltipProps) => {
  return (
    <>
      <Table className="tooltip__table">
        <TableHead>
          <TableRow>
            <TableCell>Value 1</TableCell>
            <TableCell>Value 2</TableCell>
            <TableCell>Value 3</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{data[tooltip.index].values[0]}</TableCell>
            <TableCell>{data[tooltip.index].values[1]}</TableCell>
            <TableCell>{data[tooltip.index].values[2]}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};
