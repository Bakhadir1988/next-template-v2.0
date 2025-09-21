import { ElementType } from 'react';

import { titleVariants } from './title.variants';

import type { VariantProps } from 'class-variance-authority';

type TitleVariants = VariantProps<typeof titleVariants>;

export interface TitleProps<E extends ElementType = 'h2'>
  extends Omit<React.HTMLAttributes<Element>, 'color'>,
    TitleVariants {
  as?: E;
  children: React.ReactNode;
}
