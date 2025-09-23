'use client';

import { HeartIcon } from '@radix-ui/react-icons';

import { Box, Button, Title } from '@/shared/ui';

import styles from './favorites.module.scss';

export const EmptyFavorites = () => {
  return (
    <div className="container">
      <Title as="h1">Избранное</Title>

      <Box
        display="flex"
        flexDirection="column"
        align="center"
        justify="center"
        className={styles.empty}
      >
        <div className={styles.emptyIcon}>
          <HeartIcon width={64} height={64} />
        </div>

        <Title as="h2" className={styles.emptyTitle}>
          У вас пока нет избранных товаров
        </Title>

        <p className={styles.emptyDescription}>
          Добавляйте товары в избранное, нажимая на иконку сердечка на карточках
          товаров
        </p>

        <Button
          variant="default"
          className={styles.emptyButton}
          onClick={() => (window.location.href = '/catalog')}
        >
          Перейти в каталог
        </Button>
      </Box>
    </div>
  );
};
