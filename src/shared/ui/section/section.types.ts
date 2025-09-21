import type { sectionVariants } from './section.variants';
import type { VariantProps } from 'class-variance-authority';

export type SectionProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof sectionVariants>;
