import { sectionVariants } from './section.variants';

import type { SectionProps } from './section.types';

export const Section = ({
  className,
  padding,
  background,
  border,
  children,
  ...rest
}: SectionProps) => {
  return (
    <section
      className={sectionVariants({ className, padding, background, border })}
      {...rest}
    >
      {children}
    </section>
  );
};
