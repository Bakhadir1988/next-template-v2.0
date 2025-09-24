// src/features/product/product-quick-view-modal.tsx

import { ProductType } from '@/entities/product';
import { Dialog } from '@/shared/ui';

import { ProductQuickView } from '../product-quick-view/product-quick-view';

type ProductQuickViewModalProps = {
  product: ProductType;
  children: React.ReactNode;
  width?: 'lg' | 'sm' | 'md';
};

export const ProductQuickViewModal = ({
  product,
  children,
  width = 'lg',
}: ProductQuickViewModalProps) => {
  return (
    <Dialog trigger={children} title={product.title} hideTitle width={width}>
      <ProductQuickView product={product} />
    </Dialog>
  );
};
