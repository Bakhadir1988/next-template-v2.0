import Link from 'next/link';

import { Product } from '../../../model/product.type';
import styles from '../product-card.module.scss';

type ProductInfoProps = {
  product: Product;
};

export const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <Link href={product.url} className={styles.title}>
      {product.title}
    </Link>
  );
};
