'use client';

import { ProductList } from '@/entities/product';
import { useFavorites } from '@/features/product/product-list-provider';
import { Title } from '@/shared/ui';

import { EmptyFavorites } from './ui';

export const ClientFavoritesPage = () => {
  const { products } = useFavorites();

  if (products.length === 0) {
    return <EmptyFavorites />;
  }

  return (
    <div className="container">
      <Title as="h1">Избранное</Title>
      <ProductList items={products} />
    </div>
  );
};
