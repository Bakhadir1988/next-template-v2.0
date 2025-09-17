import { HeartIcon, ShuffleIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

import { TProduct } from '../../../model/product.type';
import styles from '../product-card.module.css';

const quickActionsVariants = {
  hidden: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const actionButtonVariant = {
  hidden: { opacity: 0, x: 15 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.15 } },
};

type ProductImageProps = {
  product: TProduct;
  isHovered: boolean;
  onFavorite: () => void;
  onCompare: () => void;
  onQuickView: () => void;
};

export const ProductImage = ({
  product,
  isHovered,
  onFavorite,
  onCompare,
  onQuickView,
}: ProductImageProps) => {
  return (
    <div className={styles['image-wrapper']}>
      <Image
        src={product.imageUrl}
        alt={product.title}
        width={250}
        height={250}
        className={styles.image}
        priority
      />
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className={styles['quick-actions']}
            variants={quickActionsVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.button
              variants={actionButtonVariant}
              className={styles['action-button']}
              title="Добавить в избранное"
              onClick={onFavorite}
            >
              <HeartIcon />
            </motion.button>
            <motion.button
              variants={actionButtonVariant}
              className={styles['action-button']}
              title="Сравнить"
              onClick={onCompare}
            >
              <ShuffleIcon />
            </motion.button>
            <motion.button
              variants={actionButtonVariant}
              className={styles['action-button']}
              title="Быстрый просмотр"
              onClick={onQuickView}
            >
              <EyeOpenIcon />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
