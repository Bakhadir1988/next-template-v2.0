'use client';

import { createContext, ReactNode, useContext } from 'react';

import { ProductType } from '@/entities/product';

import { useProductListQuery } from './use-product-list-query';

type FetchFn = (
  sid: string,
) => Promise<{ items?: ProductType[] } | string | null>;

interface ProductListContextType {
  products: ProductType[];
  isLoading: boolean;
}

export const createProductListProvider = (
  queryKey: string,
  fetchFn: FetchFn,
) => {
  const ProductListContext = createContext<ProductListContextType>({
    products: [],
    isLoading: true,
  });

  const Provider = ({
    children,
    initialData,
  }: {
    children: ReactNode;
    initialData?: ProductType[];
  }) => {
    const { products, isLoading } = useProductListQuery(
      queryKey,
      fetchFn,
      initialData,
    );

    return (
      <ProductListContext.Provider value={{ products, isLoading }}>
        {children}
      </ProductListContext.Provider>
    );
  };

  const useList = () => {
    return useContext(ProductListContext);
  };

  return { Provider, useList };
};
