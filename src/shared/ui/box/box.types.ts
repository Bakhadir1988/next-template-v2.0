import type { boxVariants } from './box.variants';
import type { VariantProps } from 'class-variance-authority';

export type BoxProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof boxVariants>;
