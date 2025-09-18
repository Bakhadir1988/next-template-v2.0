import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import { getCatalogData } from '@/shared/api';
import { CatalogListWidget } from '@/widgets/catalog-list-widget';

export default async function CatalogPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['catalogList', '/catalog/'],
    queryFn: () => getCatalogData(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogListWidget />
    </HydrationBoundary>
  );
}
