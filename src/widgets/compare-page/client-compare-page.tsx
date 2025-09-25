'use client';

import { ProductList } from '@/entities/product';
import { useCompare } from '@/features/product/product-list-provider';
import { Title } from '@/shared/ui';

import { EmptyCompare } from './ui';

export const ClientComparePage = () => {
  const { products } = useCompare();

  if (products.length === 0) {
    return <EmptyCompare />;
  }

  return (
    <div className="container">
      <Title as="h1">Сравнение</Title>
      <ProductList items={products} />
    </div>
  );
};
