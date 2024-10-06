'use client';

export type TileProps = {
  color?: string;
  position?: { x: number; y: number };
  scale?: { width: number; height: number };
  radius?: { x: number; y: number };
};

const BaseTile = (props: TileProps) => {
  const {
    color = 'fuscia',
    position = { x: 0, y: 0 },
    scale = { width: 40, height: 40 },
    radius = { x: 0, y: 0 },
  } = props;
  return (
    <rect
      width={scale.width}
      height={scale.height}
      x={position.x}
      y={position.y}
      rx={radius.x}
      ry={radius.y}
      fill={color}
    />
  );
};

export default BaseTile;
