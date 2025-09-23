'use client';

import { Box } from '@/shared/ui/box';

import { ProductType } from '../../model/product.type';

import { ProductActions } from './components/product-actions';
import { ProductCharacteristics } from './components/product-characteristics';
import { ProductImage } from './components/product-image';
import { ProductInfo } from './components/product-info';
import { ProductPurchase } from './components/product-purchase';
import styles from './product-card.module.scss';

type ProductCardProps = {
  product: ProductType;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={'sm_offset'}
      className={styles.root}
    >
      <div className={styles.image}>
        <ProductImage images={product.imgs} alt={product.title} />
        <ProductActions product={product} />
      </div>
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={'sm_offset'}
        className={styles.info}
      >
        <ProductInfo product={product} />
        <ProductCharacteristics />
        <ProductPurchase product={product} />
      </Box>
    </Box>
  );
};
