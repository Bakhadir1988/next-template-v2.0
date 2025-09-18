import { cva } from 'class-variance-authority';

import styles from './button.module.scss';

export const buttonVariants = cva(styles.root, {
  variants: {
    variant: {
      default: styles.default,
      destructive: styles.destructive,
      outline: styles.outline,
      secondary: styles.secondary,
      ghost: styles.ghost,
      link: styles.link,
    },
    size: {
      default: styles.size_default,
      sm: styles.size_sm,
      lg: styles.size_lg,
      icon: styles.size_icon,
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});
