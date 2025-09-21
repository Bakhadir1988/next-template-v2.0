'use client';

import { useQuery } from '@tanstack/react-query';

import { ProductType } from '@/entities/product';

const getProductData = async (slug: string): Promise<ProductType> => {
  const response = await fetch(
    `https://litra-adm.workup.spb.ru/api/catalog/${slug}/`,
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const CatalogDetailWidget = ({ slug }: { slug: string }) => {
  const { data, isLoading, isError } = useQuery<ProductType>({
    queryKey: ['catalogDetail', slug],
    queryFn: () => getProductData(slug),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <h1>{data?.title}</h1>
    </div>
  );
};
