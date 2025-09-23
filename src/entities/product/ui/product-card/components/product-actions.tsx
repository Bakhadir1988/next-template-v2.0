'use client';

import { useState } from 'react';

import { EyeOpenIcon, HeartIcon, ShuffleIcon } from '@radix-ui/react-icons';
import { clsx } from 'clsx';

import { ProductType } from '@/entities/product';
import { useAddToFavorites } from '@/features/product/use-add-to-favorites';
import { useProductActions } from '@/features/product/use-product-actions';
import { Box, Button } from '@/shared/ui';

import styles from '../product-card.module.scss';

type ProductActionsProps = {
  product: ProductType;
};

export const ProductActions = ({ product }: ProductActionsProps) => {
  const { handleAddToComparison, handleQuickView } = useProductActions(product);

  // Передаем весь объект product в хук
  const { isFavorite, toggleFavorite, isLoading } = useAddToFavorites({
    product,
  });

  const [isComparison, setIsComparison] = useState(false);

  const onCompare = () => {
    handleAddToComparison();
    setIsComparison(!isComparison);
  };

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={'spacing'}
      className={styles.actions}
    >
      <Button
        variant={'secondary'}
        className={clsx(
          styles.action_button,
          isFavorite && styles.action_button_active,
        )}
        title={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
        onClick={toggleFavorite}
        disabled={isLoading}
      >
        <HeartIcon />
      </Button>
      <Button
        variant={'secondary'}
        className={clsx(
          styles.action_button,
          isComparison && styles.action_button_active,
        )}
        title={isComparison ? 'Убрать из сравнения' : 'Добавить в сравнение'}
        onClick={onCompare}
      >
        <ShuffleIcon />
      </Button>
      <Button
        variant={'secondary'}
        className={styles.action_button}
        title="Быстрый просмотр"
        onClick={handleQuickView}
      >
        <EyeOpenIcon />
      </Button>
    </Box>
  );
};
