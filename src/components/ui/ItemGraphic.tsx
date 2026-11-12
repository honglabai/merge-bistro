import React, { useState, useEffect } from 'react';
import { ItemChainId } from '../../types/gameSchema';
import { getItemDef } from '../../data/itemsData';

interface ItemGraphicProps {
  chainId: ItemChainId;
  level: number;
  isGenerator?: boolean;
  className?: string;
}

export const ItemGraphic: React.FC<ItemGraphicProps> = ({
  chainId,
  level,
  isGenerator = false,
  className = 'w-full h-full'
}) => {
  const baseKey = isGenerator ? `${chainId}_gen` : `${chainId}_${level}`;
  const [imgSrc, setImgSrc] = useState(`/items/${baseKey}.png`);
  const [hasError, setHasError] = useState(false);
  const itemDef = getItemDef(chainId, level);

  useEffect(() => {
    setImgSrc(`/items/${baseKey}.png`);
    setHasError(false);
  }, [baseKey]);

  const handleError = () => {
    if (imgSrc.endsWith('.png')) {
      // Fallback to SVG if PNG is missing
      setImgSrc(`/items/${baseKey}.svg`);
    } else {
      // If both fail, fallback to emoji
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
      loading="eager"
      decoding="async"
      onError={handleError}
      className={`object-contain select-none pointer-events-none filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.32)] transition-transform ${className}`}
    />
  );
};
