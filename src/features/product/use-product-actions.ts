import { TProduct } from '@/entities/product';

export const useProductActions = (productId: TProduct['id']) => {
  const handleAddToFavorites = () => {
    console.log('Add to favorites:', productId);
    // Future logic for adding to favorites state/API
  };

  const handleAddToComparison = () => {
    console.log('Add to comparison:', productId);
    // Future logic for adding to comparison state/API
  };

  const handleQuickView = () => {
    console.log('Quick view:', productId);
    // Future logic for opening quick view modal
  };

  return {
    handleAddToFavorites,
    handleAddToComparison,
    handleQuickView,
  };
};
