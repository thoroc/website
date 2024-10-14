import BaseTileComponent from '../tiles/BaseTile';
import { TilesetIndex } from './types';
import { TilesetProps } from '../tilesets/Tileset';

/**
 * Generates a tileset of React components based on the provided dimensions and size.
 *
 * @param {TilesetProps} props - The properties for the tileset.
 * @param {string} props.basePath - The base path for the tileset images.
 * @param {Object} [props.dimensions={ width: 4, height: 4 }] - The dimensions of the tileset grid.
 * @param {number} [props.dimensions.width=4] - The width of the tileset grid.
 * @param {number} [props.dimensions.height=4] - The height of the tileset grid.
 * @param {number} [props.size=32] - The size of each tile in the tileset.
 * @returns {React.ReactNode[]} An array of React components representing the tileset.
 */
export const loadTileset: React.FC<TilesetProps> = ({
  basePath,
  dimensions = { width: 4, height: 4 },
  size = 32,
}): React.ReactNode[] => {
  const tileset = [];

  for (let i = 0; i < dimensions?.width; i++) {
    for (let j = 0; j < dimensions?.height; j++) {
      tileset.push(
        <BaseTileComponent
          index={i as TilesetIndex}
          scale={{ width: size, height: size }}
          basePath={basePath}
          position={{
            x: i,
            y: j,
          }}
        />,
      );
    }
  }

  return tileset;
};
