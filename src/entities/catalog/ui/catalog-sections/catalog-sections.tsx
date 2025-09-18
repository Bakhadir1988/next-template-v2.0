import Link from 'next/link';

import styles from './catalog-sections.module.scss';

interface Section {
  item_id: string;
  title: string;
  url: string;
  sections?: Section[];
}

interface CatalogSectionsProps {
  sections: Section[];
}

export const CatalogSections = ({ sections }: CatalogSectionsProps) => {
  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <>
      <h2>Разделы</h2>
      <ul className={styles.list}>
        {sections.map((section) => (
          <li key={section.item_id} className={styles.item}>
            <Link href={section.url} className={styles.link}>
              {section.title}
            </Link>
            {section.sections && (
              <ul className={styles.nestedList}>
                {section.sections.map((nestedSection) => (
                  <li key={nestedSection.item_id} className={styles.item}>
                    <Link href={nestedSection.url} className={styles.link}>
                      {nestedSection.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};
