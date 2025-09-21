import type { containerVariants } from './container.variants';
import type { VariantProps } from 'class-variance-authority';

export type ContainerProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof containerVariants>;
