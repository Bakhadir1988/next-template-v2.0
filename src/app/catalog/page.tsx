import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import { CatalogApiResponse } from '@/entities/catalog/catalog.type';
import { CatalogList } from '@/widgets/catalog-list';

const getCatalogData = async (): Promise<CatalogApiResponse> => {
  const response = await fetch(`https://litra-adm.workup.spb.ru/api/catalog/`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export default async function CatalogPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['catalogList', '/catalog/'],
    queryFn: () => getCatalogData(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogList />
    </HydrationBoundary>
  );
}
