'use client';

import { LayersIcon } from '@radix-ui/react-icons';

import { Box, Button, Title } from '@/shared/ui';

export const EmptyCompare = () => {
  return (
    <div className="container">
      <Title as="h1">Сравнение</Title>

      <Box
        display="flex"
        flexDirection="column"
        align="center"
        justify="center"
      >
        <div>
          <LayersIcon width={64} height={64} />
        </div>

        <Title as="h2">У вас пока нет товаров для сравнения</Title>

        <p>
          Добавляйте товары в сравнение, нажимая на иконку весов на карточках
          товаров
        </p>

        <Button
          variant="default"
          onClick={() => (window.location.href = '/catalog')}
        >
          Перейти в каталог
        </Button>
      </Box>
    </div>
  );
};
