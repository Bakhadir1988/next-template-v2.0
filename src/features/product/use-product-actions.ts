import { ProductType } from '@/entities/product';

export const useProductActions = (product: ProductType) => {
  const handleAddToComparison = () => {
    console.log('Add to comparison:', product.item_id);
    // Future logic for adding to comparison state/API
  };

  const handleQuickView = () => {
    console.log('Quick view:', product.item_id);
    // Future logic for opening quick view modal
  };

  return {
    handleAddToComparison,
    handleQuickView,
  };
};
