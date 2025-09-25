'use client';

import { ProductType } from '@/entities/product';
import { compareApi, favoritesApi } from '@/shared/api/list-api';

import { useProductListMutation } from './use-product-list-mutation';

interface UseAddToListProps {
  product: ProductType;
}

export const useAddToFavorites = ({ product }: UseAddToListProps) => {
  const { isInList, toggle, isLoading, error } = useProductListMutation({
    product,
    queryKey: 'favorites',
    addFn: favoritesApi.add,
    removeFn: favoritesApi.remove,
  });

  return {
    isFavorite: isInList,
    toggleFavorite: toggle,
    isLoading,
    error,
  };
};

export const useAddToCompare = ({ product }: UseAddToListProps) => {
  const { isInList, toggle, isLoading, error } = useProductListMutation({
    product,
    queryKey: 'compare',
    addFn: compareApi.add,
    removeFn: compareApi.remove,
  });

  return {
    isCompare: isInList,
    toggleCompare: toggle,
    isLoading,
    error,
  };
};
