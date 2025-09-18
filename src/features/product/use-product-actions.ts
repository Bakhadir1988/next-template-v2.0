import { Product } from '@/entities/product/model/product.type';

export const useProductActions = (product: Product) => {
  const handleAddToFavorites = () => {
    console.log('Add to favorites:', product);
    // Future logic for adding to favorites state/API
  };

  const handleAddToComparison = () => {
    console.log('Add to comparison:', product);
    // Future logic for adding to comparison state/API
  };

  const handleQuickView = () => {
    console.log('Quick view:', product);
    // Future logic for opening quick view modal
  };

  return {
    handleAddToFavorites,
    handleAddToComparison,
    handleQuickView,
  };
};
