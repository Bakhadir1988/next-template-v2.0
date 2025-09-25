'use client';

import { EyeOpenIcon, HeartIcon, LayersIcon } from '@radix-ui/react-icons';
import { clsx } from 'clsx';

import { ProductType } from '@/entities/product';
import { ProductQuickViewModal } from '@/features/product/product-quick-view-modal/product-quick-view-modal';
import {
  useAddToCompare,
  useAddToFavorites,
} from '@/features/product/use-add-to-list';
import { Box, Button } from '@/shared/ui';

import styles from '../product-card.module.scss';

type ProductActionsProps = {
  product: ProductType;
};

export const ProductActions = ({ product }: ProductActionsProps) => {
  // Передаем весь объект product в хук
  const { isFavorite, toggleFavorite, isLoading } = useAddToFavorites({
    product,
  });

  const { isCompare, toggleCompare } = useAddToCompare({
    product,
  });

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
          isCompare && styles.action_button_active,
        )}
        title={isCompare ? 'Убрать из сравнения' : 'Добавить в сравнение'}
        onClick={toggleCompare}
      >
        <LayersIcon />
      </Button>

      <ProductQuickViewModal product={product}>
        <Button
          variant={'secondary'}
          className={styles.action_button}
          title="Быстрый просмотр"
        >
          <EyeOpenIcon />
        </Button>
      </ProductQuickViewModal>
    </Box>
  );
};
