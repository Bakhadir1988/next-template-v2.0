import Link from 'next/link';

import { ProductType } from '../../../model/product.type';
import styles from '../product-card.module.scss';

type ProductInfoProps = {
  product: ProductType;
};

export const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <Link href={product.url || ''} className={styles.title}>
      {product.title}
    </Link>
  );
};
