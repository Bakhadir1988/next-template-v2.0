'use client';

import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

import { CatalogApiResponse } from '@/entities/catalog/model/catalog.type';
import { CatalogSections } from '@/entities/catalog/ui/catalog-sections';
import { ProductList } from '@/entities/product';
import { TagList } from '@/entities/tag';
import { useCatalogInteractions } from '@/features/catalog/use-catalog-interactions';
import { FilterWidget } from '@/features/filter/ui/filter-widget/filter-widget';
import { getCatalogDataBySlug } from '@/shared/api';
import { Pagination, Section, Title } from '@/shared/ui';

export const CatalogListWidget = () => {
  const pathname = usePathname();

  const slug = pathname.replace(/^\/catalog\//, '').replace(/\/$/, '');

  const { data, isLoading } = useQuery<CatalogApiResponse>({
    queryKey: ['catalogList', pathname],
    queryFn: () =>
      getCatalogDataBySlug(pathname) as Promise<CatalogApiResponse>,
    enabled: !!slug,
  });

  const { handlePageChange, handleApplyFilters } = useCatalogInteractions(
    pathname,
    data,
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <>
      <Title as={'h1'}>{data.section.title}</Title>
      <CatalogSections sections={data.sections} />
      {data.upper_tags.length > 0 && (
        <TagList tags={data.upper_tags} title="Верхние теги" />
      )}

      <Section>
        <div>
          {data.section.item_id && (
            <FilterWidget
              sectId={data.section.item_id}
              onApplyFilters={handleApplyFilters}
            />
          )}
        </div>
        {data.items.length > 0 && <ProductList items={data.items} />}

        {data.pagi && data.pagi.total_pages > 1 && (
          <Pagination
            currentPage={Number(data.pagi.current_page)}
            totalPages={data.pagi.total_pages}
            onPageChange={handlePageChange}
          />
        )}
      </Section>

      {data.lower_tags.length > 0 && (
        <TagList tags={data.lower_tags} title="Нижние теги" />
      )}
    </>
  );
};
