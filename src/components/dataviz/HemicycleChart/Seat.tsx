'use client';

import { select } from 'd3';
import { use, useEffect, useRef } from 'react';

const Seat = () => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svgElement = select(ref.current);
    svgElement.append('circle').attr('cx', 50).attr('cy', 50).attr('r', 40).attr('fill', 'purple');
  });

  return <svg ref={ref} width={100} height={100} />;
};

export default Seat;
