import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import { getCatalogDataBySlug } from '@/shared/api';
import { API_PATHS } from '@/shared/config/site.config';
import { CatalogListWidget } from '@/widgets/catalog-list-widget';

export default async function CatalogPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['catalogList', API_PATHS.CATALOG],
    queryFn: () => getCatalogDataBySlug(API_PATHS.CATALOG),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogListWidget />
    </HydrationBoundary>
  );
}
