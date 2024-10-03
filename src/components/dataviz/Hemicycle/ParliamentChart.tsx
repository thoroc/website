'use client';

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Party, Seat } from './types';
import makeParliament from './parliament';

// Interface for configuration
interface Config {
  width: number;
  height: number;
  innerRadiusCoef: number;
}

interface ParliamentChartProps {
  data?: Party[];
  config?: Config;
}

// Main ParliamentChart component
const ParliamentChart: React.FC<ParliamentChartProps> = (props) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const config: Config = props.config || {
    width: 600,
    height: 400,
    innerRadiusCoef: 0.2,
  };

  // const isMobile = window.innerWidth < 768;

  const data: Party[] = props.data || [
    { id: 'leu', name: 'Free and Equal', seats: 59, color: '#700000' },
    { id: 'pd', name: 'Democratic Party', seats: 281, color: '#E45B5B' },
    { id: 'centre-right', name: 'Centre right', seats: 23, color: '#4990E2' },
    { id: 'centre', name: 'Centre', seats: 28, color: '#F6C55E' },
    { id: 'others', name: 'Others', seats: 61, color: '#dbdbdb' },
    { id: 'm5s', name: 'Five Star Movement', seats: 88, color: '#F3D92B' },
    { id: 'forza', name: 'Forza Italia', seats: 56, color: '#4894D2' },
    { id: 'nleague', name: 'Northern League', seats: 22, color: '#65BDA2' },
    { id: 'brothers', name: 'Brothers of Italy', seats: 12, color: '#1d24bf' },
  ];

  useEffect(() => {
    const { seats, rowWidth } = makeParliament({ data, ...config });

    const seatRadius = (d: Seat) => {
      let r = 0.4 * rowWidth;
      if (d.data && typeof d.data.size === 'number') {
        r *= d.data.size;
      }
      return r;
    };

    const svg = d3
      .select(svgRef.current)
      .attr('width', config.width)
      .attr('height', config.height)
      .style('background-color', '#f8f7f3');

    const group = svg.append('g').attr('transform', `translate(${config.width / 2}, ${config.height / 2 + 150})`);

    group
      .selectAll('.seat')
      .data(seats)
      .enter()
      .append('circle')
      .attr('class', (d) => `seat ${d.party?.id}`)
      .attr('cx', (d) => d.cartesian.x)
      .attr('cy', (d) => d.cartesian.y)
      .attr('fill', (d) => d.party?.color || 'gray')
      .attr('r', seatRadius);
  }, [data, config]);

  return <svg ref={svgRef}></svg>;
};

export default ParliamentChart;
