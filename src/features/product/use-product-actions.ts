import { ProductType } from '@/entities/product';

import { useAddToCompare } from './use-add-to-compare';
import { useAddToFavorites } from './use-add-to-favorites';

export const useProductActions = (product: ProductType) => {
  const { isFavorite, toggleFavorite } = useAddToFavorites({ product });
  const { isCompare, toggleCompare } = useAddToCompare({ product });

  const handleQuickView = () => {
    console.log('Quick view:', product.item_id);
    // Future logic for opening quick view modal
  };

  return {
    isFavorite,
    toggleFavorite,
    isCompare,
    toggleCompare,
    handleQuickView,
  };
};
