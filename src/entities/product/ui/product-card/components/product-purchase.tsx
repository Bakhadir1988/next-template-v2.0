import React, { useState } from 'react';

import Link from 'next/link';

import { ProductType } from '@/entities/product/model/product.type';
import { Box, Button } from '@/shared/ui';

import styles from '../product-card.module.scss';

type ProductPurchaseProps = {
  product: ProductType;
};

export const ProductPurchase = ({ product }: ProductPurchaseProps) => {
  const [isCart, setIsCart] = useState(false);

  return (
    <>
      <span className={styles.price}>{product.price} ₽</span>

      {isCart ? (
        <Button
          asChild
          className={styles['in-cart-link']}
          variant={'secondary'}
        >
          <Link href="/cart">{`В корзине: ${1}`}</Link>
        </Button>
      ) : (
        <Box display={'flex'} gap={'sm_offset'}>
          <Box display={'flex'} className={styles.quantity}>
            <Button
              variant={'secondary'}
              className={styles.quantity_button}
              onClick={() => {}}
            >
              -
            </Button>
            <input
              type="text"
              value={1}
              readOnly
              className={styles.quantity_input}
            />
            <Button
              variant={'secondary'}
              className={styles.quantity_button}
              onClick={() => {}}
            >
              +
            </Button>
          </Box>
          <Button className={styles.add_button} onClick={() => setIsCart(true)}>
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
