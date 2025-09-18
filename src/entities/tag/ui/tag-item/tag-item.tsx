import Link from 'next/link';

import { TagDto } from '../../model/tag.type';

import styles from './tag-item.module.scss';

export const TagItem = ({ tag }: { tag: TagDto }) => {
  return (
    <Link href={tag.url} className={styles.root}>
      {tag.title}
    </Link>
  );
};
