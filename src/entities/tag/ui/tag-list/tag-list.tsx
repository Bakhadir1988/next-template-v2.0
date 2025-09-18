import { Box } from '@/shared/ui';

import { TagDto } from '../../model/tag.type';
import { TagItem } from '../tag-item';

import styles from './tag-list.module.scss';

export const TagList = ({
  tags,
  title,
}: {
  tags: TagDto[];
  title?: string;
}) => {
  return (
    <Box
      display={'grid'}
      flexDirection={'column'}
      gap={'spacing'}
      className={styles.root}
    >
      {title && tags.length > 0 && <h2>{title}</h2>}
      <Box display={'flex'} flexWrap={'wrap'} gap={'spacing'}>
        {tags.map((tag) => (
          <TagItem key={tag.item_id} tag={tag} />
        ))}
      </Box>
    </Box>
  );
};
