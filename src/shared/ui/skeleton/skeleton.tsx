import React from 'react';

import styles from './skeleton.module.scss';

export const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={`${styles.skeleton} ${className}`} {...props} />;
};
