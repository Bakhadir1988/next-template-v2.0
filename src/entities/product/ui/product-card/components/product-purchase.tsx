import React from 'react';

import Link from 'next/link';

import { ProductType } from '@/entities/product/model/product.type';
import { useAddToCart } from '@/features/product/use-add-to-cart';
import { Box, Button } from '@/shared/ui';

import styles from '../product-card.module.scss';

type ProductPurchaseProps = {
  product: ProductType;
};

export const ProductPurchase = ({ product }: ProductPurchaseProps) => {
  const {
    isAddedToCart,
    quantity,
    handleAddToCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  } = useAddToCart(product);

  return (
    <>
      <span className={styles.price}>{product.price} ₽</span>

      {isAddedToCart ? (
        <Button
          asChild
          className={styles['in-cart-link']}
          variant={'secondary'}
        >
          <Link href="/cart">{`В корзине: ${quantity}`}</Link>
        </Button>
      ) : (
        <Box display={'flex'} gap={'sm_offset'}>
          <Box display={'flex'} className={styles.quantity}>
            <Button
              variant={'secondary'}
              className={styles.quantity_button}
              onClick={handleDecreaseQuantity}
            >
              -
            </Button>
            <input
              type="text"
              value={quantity}
              readOnly
              className={styles.quantity_input}
            />
            <Button
              variant={'secondary'}
              className={styles.quantity_button}
              onClick={handleIncreaseQuantity}
            >
              +
            </Button>
          </Box>
          <Button className={styles.add_button} onClick={handleAddToCart}>
            В корзину
          </Button>
        </Box>
      )}

      <Button variant={'outline'} className={styles['buy-now-button']}>
        Купить в 1 клик
      </Button>
    </>
  );
};
