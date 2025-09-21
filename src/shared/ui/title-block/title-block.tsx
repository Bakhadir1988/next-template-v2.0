import React from 'react';

import clsx from 'clsx';

import { Box } from '../box';
import { Title } from '../title/title';

import styles from './title-block.module.scss';

export const TitleBlock = ({
  tag = 'h1',
  className,
  title,
  description,
}: {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
  title?: string;
  description?: string;
}) => {
  return (
    <Box
      className={clsx(styles.root, className)}
      display={'flex'}
      flexDirection={'column'}
      gap={'spacing'}
    >
      <Title as={tag}>{title}</Title>
      {description ? (
        <span dangerouslySetInnerHTML={{ __html: description }} />
      ) : null}
    </Box>
  );
};
