import { cva } from 'class-variance-authority';

import styles from './dialog.module.scss';

export const dialogVariants = cva(styles.content, {
  variants: {
    width: {
      sm: styles.width_sm,
      md: styles.width_md,
      lg: styles.width_lg,
    },
  },
  defaultVariants: {
    width: 'md',
  },
});
