import React, { useState } from 'react';
import { ItemChainId } from '../../types/gameSchema';
import { getItemDef } from '../../data/itemsData';

interface ItemGraphicProps {
  chainId: ItemChainId;
  level: number;
  isGenerator?: boolean;
  className?: string;
}

// 33 authentic 3D casual game assets extracted from the reference screenshot
const PNG_AVAILABLE = new Set([
  'bakery_1',
  'bakery_6',
  'bakery_7',
  'bakery_8',
  'bakery_9',
  'bakery_10',
  'bakery_gen',
  'cafe_1',
  'cafe_2',
  'cafe_3',
  'cafe_6',
  'cafe_7',
  'cafe_8',
  'cafe_9',
  'cafe_gen',
  'garden_1',
  'garden_2',
  'garden_3',
  'garden_6',
  'garden_9',
  'garden_gen',
  'ruins_1',
  'ruins_2',
  'ruins_3',
  'ruins_4',
  'ruins_5',
  'ruins_6',
  'ruins_7',
  'ruins_8',
  'ruins_gen',
  'seafood_1',
  'seafood_3',
  'seafood_gen'
]);

export const ItemGraphic: React.FC<ItemGraphicProps> = ({
  chainId,
  level,
  isGenerator = false,
  className = 'w-full h-full'
}) => {
  const [hasError, setHasError] = useState(false);
  const itemDef = getItemDef(chainId, level);

  const baseKey = isGenerator ? `${chainId}_gen` : `${chainId}_${level}`;
  const hasPng = PNG_AVAILABLE.has(baseKey);
  const src = hasPng ? `/items/${baseKey}.png` : `/items/${baseKey}.svg`;

  if (hasError) {
    return (
      <div className={`flex items-center justify-center text-3xl select-none ${className}`}>
        {itemDef?.icon || '📦'}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={itemDef?.name || 'Item'}
      loading="eager"
      decoding="async"
      onError={() => {
        // Fallback to SVG if PNG fails
        if (hasPng) {
          setHasError(false);
          const img = document.querySelector(`img[src="${src}"]`) as HTMLImageElement;
          if (img) img.src = `/items/${baseKey}.svg`;
        } else {
          setHasError(true);
        }
      }}
      className={`object-contain select-none pointer-events-none filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.32)] transition-transform ${className}`}
    />
  );
};
