'use client';

import Image from 'next/image';
import { useState } from 'react';
import { TilesetIndex } from '../core/types';
import { TileClass } from '../core';

export type TileComponentProps = {
  index: TilesetIndex;
  position: { x: number; y: number };
  scale?: { width: number; height: number };
  basePath: string;
  onClick?: () => TileClass;
};

const TileComponent: React.FC<TileComponentProps> = ({
  index,
  position = { x: 0, y: 0 },
  scale = { width: 32, height: 32 },
  basePath,
}): React.ReactNode => {
  // Create a state variable to manage the index
  const [tileIndex, setTileIndex] = useState<TilesetIndex>(index);

  // Function to handle the click event
  const handleClick = () => {
    // Update the index value on click (e.g., increment by 1)
    const random = Math.floor(Math.random() * 16);
    setTileIndex(random as TilesetIndex);
  };

  return (
    <Image
      src={`${basePath}/${tileIndex}.gif`}
      alt={`Tile ${tileIndex}`}
      width={scale.width}
      height={scale.height}
      onClick={handleClick}
      id={`col=${position.x}-row=${position.y}`}
    />
  );
};

export default TileComponent;
