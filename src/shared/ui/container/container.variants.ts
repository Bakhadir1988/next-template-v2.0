import { cva } from 'class-variance-authority';

import styles from './container.module.css';

export const containerVariants = cva(styles.root, {
  variants: {
    maxWidth: {
      full: styles.width_full,
    },
    disablePadding: {
      true: styles.no_padding,
    },
    background: {
      default: styles.bg_default,
      surface: styles.bg_surface,
      secondary: styles.bg_secondary,
      primary: styles.bg_primary,
      success: styles.bg_success,
      warning: styles.bg_warning,
      danger: styles.bg_danger,
      info: styles.bg_info,
    },
    border: {
      default: styles.border_default,
      primary: styles.border_primary,
      focus: styles.border_focus,
      success: styles.border_success,
      warning: styles.border_warning,
      danger: styles.border_danger,
      info: styles.border_info,
    },
  },
});
