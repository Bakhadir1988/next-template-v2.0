'use client';

import { Box, TitleBlock } from '@/shared/ui';

import { ProductType } from '../../model/product.type';
import { ProductCard } from '../product-card';

import styles from './product-list.module.scss';

type ProductListProps = {
  items: ProductType[];
  title?: string;
};

export const ProductList = ({ items, title }: ProductListProps) => {
  return (
    <>
      <TitleBlock tag="h2" title={title} />
      <Box
        display={'grid'}
        columns={4}
        gap={'sm_offset'}
        className={styles.root}
      >
        {items.map((item) => (
          <ProductCard key={item.item_id} product={item} />
        ))}
      </Box>
    </>
  );
};
