import { useState } from 'react';

import { Product } from '@/entities/product';

export const useAddToCart = (productId: Product) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    console.log(
      `Product ${productId} added to cart with quantity ${quantity}.`,
    );
    setIsAddedToCart(true);
  };

  const handleIncreaseQuantity = () => {
    setQuantity((q) => q + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((q) => Math.max(1, q - 1));
  };

  return {
    isAddedToCart,
    quantity,
    handleAddToCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  };
};
