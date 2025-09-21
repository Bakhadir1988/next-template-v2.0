import React, { ElementType, forwardRef } from 'react';

import clsx from 'clsx';

import { TitleProps } from './title.types';
import { titleVariants } from './title.variants';

export const Title = forwardRef(function Title<E extends ElementType = 'h2'>(
  { as, align, weight, color, className, children, ...props }: TitleProps<E>,
  ref: React.Ref<Element>,
) {
  const Component = as || 'h2';

  return (
    <Component
      ref={ref as React.Ref<HTMLHeadingElement>}
      className={clsx(titleVariants({ align, weight, color }), className)}
      {...props}
    >
      {children}
    </Component>
  );
});
