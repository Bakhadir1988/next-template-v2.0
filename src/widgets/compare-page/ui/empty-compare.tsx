'use client';

import { LayersIcon } from '@radix-ui/react-icons';

import { Box, Button, Title } from '@/shared/ui';

import styles from './empty.module.scss';

export const EmptyCompare = () => {
  return (
    <div className="container">
      <Title as="h1">Сравнение</Title>

      <Box
        display="flex"
        flexDirection="column"
        align="center"
        justify="center"
        className={styles.empty}
      >
        <div className={styles.emptyIcon}>
          <LayersIcon width={64} height={64} />
        </div>

        <Title as="h2" className={styles.emptyTitle}>
          У вас пока нет товаров для сравнения
        </Title>

        <p className={styles.emptyDescription}>
          Добавляйте товары для сравнения, нажимая на иконку сравнения на
          карточках товаров
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
