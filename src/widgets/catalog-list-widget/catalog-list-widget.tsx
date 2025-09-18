'use client';

import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

import { CatalogApiResponse } from '@/entities/catalog/model/catalog.type';
import { ProductCard } from '@/entities/product/ui/product-card/product-card';
import { TagList } from '@/entities/tag';

import { CatalogSections } from '../../entities/catalog/ui/catalog-sections';

const getCatalogData = async (path: string): Promise<CatalogApiResponse> => {
  // Construct the API path from the browser path
  const apiPath = process.env.NEXT_PUBLIC_API_URL + path;
  const response = await fetch(apiPath.endsWith('/') ? apiPath : `${apiPath}/`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const CatalogListWidget = () => {
  const pathname = usePathname();

  const { data, isLoading, isError } = useQuery<CatalogApiResponse>({
    queryKey: ['catalogList', pathname],
    queryFn: () => getCatalogData(pathname!),
    enabled: !!pathname,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <section className="container">
      <h1>{data.meta.h1}</h1>
      <CatalogSections sections={data.sections} />
      <TagList tags={data.upper_tags} title="Верхние теги" />

      {data.items.length > 0 && (
        <>
          <h2>Товары</h2>
          <div
            style={{
              display: 'grid',
              gap: '20px',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            }}
          >
            {data.items.map((item) => (
              <ProductCard key={item.item_id} product={item} />
            ))}
          </div>
        </>
      )}

      <TagList tags={data.lower_tags} title="Нижние теги" />
    </section>
  );
};
