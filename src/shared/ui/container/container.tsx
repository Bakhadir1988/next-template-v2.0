import { containerVariants } from './container.variants';

import type { ContainerProps } from './container.types';

export const Container = ({
  className,
  children,
  maxWidth,
  disablePadding,
  background,
  border,
  ...rest
}: ContainerProps) => {
  return (
    <div
      className={containerVariants({
        className,
        maxWidth,
        disablePadding,
        background,
        border,
      })}
      {...rest}
    >
      {children}
    </div>
  );
};
