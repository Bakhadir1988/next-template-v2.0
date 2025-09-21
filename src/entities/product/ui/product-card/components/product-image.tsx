import { EyeOpenIcon, HeartIcon, ShuffleIcon } from '@radix-ui/react-icons';
import Image from 'next/image';

import { Box, Button } from '@/shared/ui';

import { ProductType } from '../../../model/product.type';
import styles from '../product-card.module.scss';

type ProductImageProps = {
  product: ProductType;
  onFavorite: () => void;
  onCompare: () => void;
  onQuickView: () => void;
};

export const ProductImage = ({
  product,
  onFavorite,
  onCompare,
  onQuickView,
}: ProductImageProps) => {
  const imageUrl = product.imgs[0]
    ? process.env.NEXT_PUBLIC_IMAGE_URL + product.imgs[0]
    : '/image-placeholder.png';
  return (
    <div className={styles.image}>
      <Image
        src={imageUrl}
        alt={product.title}
        width={350}
        height={350}
        priority
      />
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={'spacing'}
        className={styles.actions}
      >
        <Button
          variant={'secondary'}
          className={styles.action_button}
          title="Добавить в избранное"
          onClick={onFavorite}
        >
          <HeartIcon />
        </Button>
        <Button
          variant={'secondary'}
          className={styles.action_button}
          title="Сравнить"
          onClick={onCompare}
        >
          <ShuffleIcon />
        </Button>
        <Button
          variant={'secondary'}
          className={styles.action_button}
          title="Быстрый просмотр"
          onClick={onQuickView}
        >
          <EyeOpenIcon />
        </Button>
      </Box>
    </div>
  );
};
