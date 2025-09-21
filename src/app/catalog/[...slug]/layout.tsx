import { ReactNode } from 'react';

import Link from 'next/link';

import { CatalogSections } from '@/entities/catalog/ui/catalog-sections';
import { getCatalogDataBySlug } from '@/shared/api';
import { API_PATHS } from '@/shared/config/site.config';

import styles from './catalog-slug.module.scss';

export default async function CatalogSlugLayout(props: {
  children: ReactNode;
  params: Promise<{ slug: string[] }>;
}) {
  const { children } = props;
  const params = await props.params;
  const slugPath = params.slug.join('/');

  // Default to NOT showing the sidebar
  let isSection = false;
  try {
    const pageData = await getCatalogDataBySlug(
      `${API_PATHS.CATALOG}${slugPath}/`,
    );
    if ('items' in pageData) {
      isSection = true;
    }
  } catch (error) {
    // If fetch fails, it's likely a 404 or server error, don't show sidebar
    console.error(
      `Error fetching data for slug '${slugPath}' in layout:`,
      error,
    );
  }

  if (isSection) {
    // It's a section page, render with sidebar
    const catalogData = await getCatalogDataBySlug(API_PATHS.CATALOG);
    const sections = 'sections' in catalogData ? catalogData.sections : [];
    return (
      <div className={styles.root}>
        <aside className={styles.sidebar}>
          <h4>
            <Link href={API_PATHS.CATALOG}>Каталог</Link>
          </h4>
          <CatalogSections sections={sections} />
        </aside>
        <main className={styles.main}>{children}</main>
      </div>
    );
  }

  // It's a product page (or an error occurred), render without sidebar
  return <>{children}</>;
}
