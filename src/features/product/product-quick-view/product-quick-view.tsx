'use client';

import Image from 'next/image';
import Link from 'next/link';

import { ProductType } from '@/entities/product';
import { ProductPurchase } from '@/entities/product/ui/product-card/components/product-purchase';
import { Box, Title } from '@/shared/ui';

import styles from './product-quick-view.module.scss';

type ProductQuickViewProps = {
  product: ProductType;
};

export const ProductQuickView = ({ product }: ProductQuickViewProps) => {
  const imageUrl = product.imgs[0]
    ? process.env.NEXT_PUBLIC_IMAGE_URL + product.imgs[0]
    : '/image-placeholder.png';

  return (
    <Box display="grid" columns={2} gap={'spacing'} className={styles.root}>
      <Box className={styles.imageContainer}>
        <Image src={imageUrl} alt={product.title} width={500} height={500} />
      </Box>
      <Box display="flex" flexDirection="column" gap="sm_offset">
        <Title as="h2" className={styles.title}>
          {product.title}
        </Title>
        <div className={styles.chars}>
          {product.chars.vendor && <p>Производитель: {product.chars.vendor}</p>}
          {product.chars.alcohol && <p>Алкоголь: {product.chars.alcohol}</p>}
          {product.chars.density && <p>Плотность: {product.chars.density}</p>}
        </div>

        <ProductPurchase product={product} />

        <Link href={product.url} className={styles.detailsLink}>
          Перейти на страницу товара
        </Link>
      </Box>
    </Box>
  );
};
