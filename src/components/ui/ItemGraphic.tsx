import React, { useState, useEffect } from 'react';
import { ItemChainId } from '../../types/gameSchema';
import { getItemDef } from '../../data/itemsData';

interface ItemGraphicProps {
  chainId: ItemChainId;
  level: number;
  isGenerator?: boolean;
  className?: string;
  priority?: boolean;
}

export const ItemGraphic: React.FC<ItemGraphicProps> = ({
  chainId,
  level,
  isGenerator = false,
  className = 'w-full h-full',
  priority = false
}) => {
  const baseKey = isGenerator ? `${chainId}_gen` : `${chainId}_${level}`;
  // Prioritize high-performance lightweight WebP
  const [imgSrc, setImgSrc] = useState(`/items/${baseKey}.webp`);
  const [hasError, setHasError] = useState(false);
  const itemDef = getItemDef(chainId, level);

  useEffect(() => {
    setImgSrc(`/items/${baseKey}.webp`);
    setHasError(false);
  }, [baseKey]);

  const handleError = () => {
    if (imgSrc.endsWith('.webp')) {
      // Fallback to optimized PNG
      setImgSrc(`/items/${baseKey}.png`);
    } else if (imgSrc.endsWith('.png')) {
      // Fallback to SVG vector
      setImgSrc(`/items/${baseKey}.svg`);
    } else {
      // If all formats fail, fallback to emoji
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <div className={`flex items-center justify-center text-3xl select-none ${className}`}>
        {itemDef?.icon || '🥐'}
      </div>
    );
  }

  return (
    <img
      key={imgSrc}
      src={imgSrc}
      alt={itemDef?.name || 'Item'}
      width={72}
      height={72}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={handleError}
      className={`object-contain select-none pointer-events-none filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.32)] transition-transform ${className}`}
    />
  );
};
