'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { CatalogApiResponse } from '@/entities/catalog/catalog.type';

import { CatalogSections } from './components/catalog-sections';

const getCatalogData = async (path: string): Promise<CatalogApiResponse> => {
  // Construct the API path from the browser path
  const apiPath = process.env.NEXT_PUBLIC_API_URL + path;
  const response = await fetch(apiPath.endsWith('/') ? apiPath : `${apiPath}/`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const CatalogList = () => {
  const pathname = usePathname();

  console.log(pathname);

  // Use the pathname for the query key to distinguish between different section pages
  const queryKey = [
    'catalogList',
    pathname.endsWith('/') ? pathname : `${pathname}/`,
  ];

  const { data, isLoading, isError } = useQuery<CatalogApiResponse>({
    queryKey: queryKey,
    queryFn: () => getCatalogData(pathname),
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
    <section>
      <h1>{data.meta.h1}</h1>

      <h2>Разделы</h2>
      <CatalogSections sections={data.sections} />

      <h2>Товары</h2>
      <ul>
        {data.items.map((item) => (
          <li key={item.item_id}>
            <Link href={item.url}>{item.title}</Link>
            <p>{item.price} &#8381;</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
