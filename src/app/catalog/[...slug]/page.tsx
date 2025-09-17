import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import { CatalogApiResponse } from '@/entities/catalog/catalog.type';
import { CatalogDetail } from '@/widgets/catalog-detail';
import { CatalogList } from '@/widgets/catalog-list';

// Helper to parse URL and create slug array
const getSlugArrayFromUrl = (url: string) => {
  return url
    .replace(/^\/|\/$/g, '')
    .replace(/^catalog\//, '')
    .split('/');
};

// This function tells Next.js which paths to pre-render at build time
export async function generateStaticParams() {
  const response = await fetch('https://litra-adm.workup.spb.ru/api/catalog/');
  const data: CatalogApiResponse = await response.json();
  const itemSlugs = data.items.map((item) => ({
    slug: getSlugArrayFromUrl(item.url),
  }));
  const sectionSlugs = data.sections.map((section) => ({
    slug: getSlugArrayFromUrl(section.url),
  }));
  return [...itemSlugs, ...sectionSlugs];
}

const getPageData = async (slug: string) => {
  const response = await fetch(
    `https://litra-adm.workup.spb.ru/api/catalog/${slug}/`,
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch data for slug: ${slug}`);
  }
  return response.json();
};

export default async function DynamicCatalogPage(props: {
  params: { slug: string[] };
}) {
  const params = await props.params;
  const queryClient = new QueryClient();
  const slugPath = params.slug.join('/');

  const pageData = await getPageData(slugPath);

  // Check if the data looks like a section page (has an 'items' array)
  const isSectionPage = pageData.hasOwnProperty('items');

  if (isSectionPage) {
    // It's a section page, prefetch using the catalogList key with the full path
    await queryClient.prefetchQuery({
      queryKey: ['catalogList', `/catalog/${slugPath}/`],
      queryFn: () => pageData, // Use the data we already fetched
    });
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CatalogList />
      </HydrationBoundary>
    );
  }

  // It's a product detail page
  await queryClient.prefetchQuery({
    queryKey: ['catalogDetail', slugPath],
    queryFn: () => pageData, // Use the data we already fetched
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogDetail slug={slugPath} />
    </HydrationBoundary>
  );
}
