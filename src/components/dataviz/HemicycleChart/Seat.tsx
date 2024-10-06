'use client';

export type SeatProps = {
  color?: string;
  radius?: number;
  position?: { x: number; y: number };
};

const Seat = (props: SeatProps) => {
  const { color = 'purple', radius = 40, position = { x: 0, y: 0 } } = props;
  return <circle cx={position.x} cy={position.y} r={radius} fill={color} />;
};

export default Seat;
