import { Tag as TagType } from '@/entities/tag';

import { Tag } from '../../shared/ui/tag';

import styles from './tag-list.module.scss';

interface TagListProps {
  tags: TagType[];
  title?: string;
}

export const TagList = ({ tags, title }: TagListProps) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      {title && <h2>{title}</h2>}
      <ul className={styles.list}>
        {tags.map((tag) => (
          <li key={tag.item_id}>
            <Tag tag={tag} />
          </li>
        ))}
      </ul>
    </div>
  );
};
