'use client';

import { useQuery } from '@tanstack/react-query';

import { CatalogItem } from '@/entities/catalog/catalog.type';

const getProductData = async (slug: string): Promise<CatalogItem> => {
  const response = await fetch(
    `https://litra-adm.workup.spb.ru/api/catalog/${slug}/`,
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const CatalogDetail = ({ slug }: { slug: string }) => {
  const { data, isLoading, isError } = useQuery<CatalogItem>({
    queryKey: ['catalogDetail', slug],
    queryFn: () => getProductData(slug),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  console.log('data', data);

  return (
    <div>
      <h1>{data?.title}</h1>
      <p>Price: {data?.price} &#8381;</p>
      {data?.content && (
        <div dangerouslySetInnerHTML={{ __html: data.content }} />
      )}
    </div>
  );
};
