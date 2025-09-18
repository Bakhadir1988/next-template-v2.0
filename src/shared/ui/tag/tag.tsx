import Link from 'next/link';

import { Tag as TagType } from '@/entities/tag';

import styles from './tag.module.scss';

interface TagProps {
  tag: TagType;
}

export const Tag = ({ tag }: TagProps) => {
  return (
    <Link href={tag.url} className={styles.tag}>
      {tag.title}
    </Link>
  );
};
