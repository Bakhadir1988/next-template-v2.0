import { boxVariants } from './box.variants';

import type { BoxProps } from './box.types';

export const Box = ({
  display,
  flexDirection,
  flexWrap,
  gap,
  rowGap,
  columnGap,
  align,
  justify,
  children,
  columns,
  rows,
  className,
  ...props
}: BoxProps) => {
  const getFilteredProps = () => {
    if (display === 'grid') {
      return {
        display,
        gap,
        rowGap,
        columnGap,
        align,
        justify,
        columns,
        rows,
      };
    }

    if (display === 'flex') {
      return {
        display,
        flexDirection,
        flexWrap,
        gap,
        rowGap,
        columnGap,
        align,
        justify,
      };
    }

    // Если display не указан, возвращаем все свойства
    return {
      display,
      flexDirection,
      flexWrap,
      gap,
      rowGap,
      columnGap,
      align,
      justify,
      columns,
      rows,
    };
  };

  const filteredProps = getFilteredProps();

  return (
    <div
      className={boxVariants({
        className,
        ...filteredProps,
      })}
      {...props}
    >
      {children}
    </div>
  );
};
