import Image from 'next/image';

interface TilesetProps {
  basePath: string;
  size?: number;
}

export const loadTileset: React.FC<TilesetProps> = (props) => {
  const tileset = [];

  const { basePath, size = 32 } = props;

  for (let i = 0; i < 16; i++) {
    tileset.push(<Image src={`${basePath}/${i}.gif`} alt={`Tile ${i}`} width={size} height={size} />);
  }

  return tileset;
};
