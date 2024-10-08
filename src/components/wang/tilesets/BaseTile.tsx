'use client';

import Image from 'next/image';
import { useState } from 'react';
import { TilesetIndex } from '../playground/types';

export type TileProps = {
  index: TilesetIndex;
  scale?: { width: number; height: number };
  basePath: string;
};

const BaseTile = ({ index, scale = { width: 32, height: 32 }, basePath }: TileProps): React.ReactNode => {
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
    />
  );
};

export default BaseTile;
