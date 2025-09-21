import { cva } from 'class-variance-authority';

import styles from './title.module.scss';

export const titleVariants = cva(styles.root, {
  variants: {
    align: {
      left: styles.align_left,
      center: styles.align_center,
      right: styles.align_right,
    },
    weight: {
      normal: styles.weight_normal,
      medium: styles.weight_medium,
      bold: styles.weight_bold,
    },
    color: {
      default: styles.color_default,
      muted: styles.color_muted,
      primary: styles.color_primary,
      secondary: styles.color_secondary,
      success: styles.color_success,
      warning: styles.color_warning,
      danger: styles.color_danger,
      info: styles.color_info,
      inverse: styles.color_inverse,
    },
  },
});
