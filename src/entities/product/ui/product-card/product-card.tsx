'use client';

import { useProductActions } from '@/features/product/use-product-actions';
import { Box } from '@/shared/ui/box';

import { ProductType } from '../../model/product.type';

import { ProductCharacteristics } from './components/product-characteristics';
import { ProductImage } from './components/product-image';
import { ProductInfo } from './components/product-info';
import { ProductPurchase } from './components/product-purchase';
import styles from './product-card.module.scss';

type ProductCardProps = {
  product: ProductType;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const { handleAddToFavorites, handleAddToComparison, handleQuickView } =
    useProductActions(product);

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={'sm_offset'}
      className={styles.root}
    >
      <ProductImage
        product={product}
        onFavorite={handleAddToFavorites}
        onCompare={handleAddToComparison}
        onQuickView={handleQuickView}
      />
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
