'use client';

import { select } from 'd3';
import { use, useEffect, useRef } from 'react';

export type SeatProps = {
  color?: string;
  radius?: number;
  position?: { x: number; y: number };
  size?: { width: number; height: number };
};

const Seat = (props: SeatProps) => {
  const ref = useRef<SVGSVGElement | null>(null);

  const { color = 'purple', radius = 40, position = { x: 50, y: 50 }, size = { width: 100, height: 100 } } = props;

  useEffect(() => {
    const svgElement = select(ref.current);
    svgElement.append('circle').attr('cx', position.x).attr('cy', position.y).attr('r', radius).attr('fill', color);
  });

  return <svg ref={ref} width={size.width} height={size.height} />;
};

export default Seat;
