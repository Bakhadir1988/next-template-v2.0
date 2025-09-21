import { cva } from 'class-variance-authority';

import styles from './section.module.css';

export const sectionVariants = cva(styles.root, {
  variants: {
    padding: {
      sm: styles.padding_sm,
      md: styles.padding_md,
      lg: styles.padding_lg,
      xl: styles.padding_xl,
      none: styles.padding_none,
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
  defaultVariants: {
    padding: 'md',
  },
});
