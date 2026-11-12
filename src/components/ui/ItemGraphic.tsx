import React, { useState } from 'react';
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
  const [hasError, setHasError] = useState(false);
  const itemDef = getItemDef(chainId, level);

  const baseKey = isGenerator ? `${chainId}_gen` : `${chainId}_${level}`;
  const src = `/items/${baseKey}.svg`;

  if (hasError) {
    return (
      <div className={`flex items-center justify-center text-3xl select-none ${className}`}>
        {itemDef?.icon || '🥐'}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={itemDef?.name || 'Item'}
      loading="eager"
      decoding="async"
      onError={() => setHasError(true)}
      className={`object-contain select-none pointer-events-none filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.32)] transition-transform ${className}`}
    />
  );
};
