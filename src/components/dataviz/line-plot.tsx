import * as d3 from 'd3';
import { useRef, useEffect } from 'react';

export interface LinePlotProps {
  data: number[];
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

export const LinePlot = (props: LinePlotProps) => {
  // data,
  // width = 640,
  // height = 400,
  // marginTop = 20,
  // marginRight = 20,
  // marginBottom = 30,
  // marginLeft = 40,

  const {
    data,
    width = 640,
    height = 400,
    marginTop = 20,
    marginRight = 20,
    marginBottom = 30,
    marginLeft = 40,
  } = props;

  const gx = useRef<SVGSVGElement | null>(null);
  const gy = useRef<SVGSVGElement | null>(null);
  const x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
  const y = d3.scaleLinear(data as Iterable<d3.NumberValue>, [height - marginBottom, marginTop]);
  const line = d3.line((d, i) => x(i), y);

  useEffect(
    () =>
      void d3
        .select(gx.current)
        .call((selection: d3.Selection<SVGSVGElement | null, any, any, any>) =>
          d3.axisBottom(x)(selection as d3.Selection<SVGSVGElement, any, any, any>),
        ),
    [gx, x],
  );
  useEffect(() => void d3.select(gy.current).call((selection) => d3.axisLeft(y)(selection)), [gy, y]);

  return (
    <svg width={width} height={height}>
      <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
      <g ref={gy} transform={`translate(${marginLeft},0)`} />
      <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data)} />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (
          <circle key={i} cx={x(i)} cy={y(d)} r="2.5" />
        ))}
      </g>
    </svg>
  );
};
