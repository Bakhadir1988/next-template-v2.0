import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import { getCatalogDataBySlug } from '@/shared/api';
import { API_PATHS } from '@/shared/config/site.config';
import { CatalogDetailWidget, CatalogListWidget } from '@/widgets';

// Преобразует URL в массив сегментов (slug) для динамических маршрутов Next.js.
const getSlugArrayFromUrl = (url: string) => {
  return url
    .replace(/^\/|\/$/g, '')
    .replace(/^catalog\//, '')
    .split('/');
};

// Функция Next.js для генерации статических путей во время сборки.
const getAllPaths = async (initialUrl: string): Promise<string[]> => {
  const processedUrls = new Set<string>();
  const pathsToFetch = [initialUrl];
  const allSlugs: string[] = [];

  while (pathsToFetch.length > 0) {
    const currentUrl = pathsToFetch.shift()!;
    if (processedUrls.has(currentUrl)) {
      continue;
    }
    processedUrls.add(currentUrl);

    try {
      const data = await getCatalogDataBySlug(currentUrl);

      if ('items' in data) {
        // It's a CatalogApiResponse
        data.items.forEach((item) => allSlugs.push(item.url));
        data.sections.forEach((section) => {
          allSlugs.push(section.url); // Add section URL itself
          pathsToFetch.push(section.url); // And fetch its children
        });
      }
    } catch (error) {
      console.error(`Error fetching data for URL: ${currentUrl}`, error);
    }
  }

  return allSlugs;
};

export async function generateStaticParams() {
  try {
    const allPaths = await getAllPaths(API_PATHS.CATALOG);
    const uniquePaths = [...new Set(allPaths)]; // Ensure uniqueness

    const slugs = uniquePaths.map((path) => ({
      slug: getSlugArrayFromUrl(path),
    }));

    console.log(`Generated ${slugs.length} static catalog paths`);
    return slugs;
  } catch (error) {
    console.error('Failed to generate static params:', error);
    throw new Error('Failed to generate static params');
  }
}

const getPageData = async (slug: string) => {
  try {
    // Filter out requests for common file extensions to avoid API calls
    if (slug.match(/\.(js|map|css|png|jpg|jpeg|gif|svg|ico)$/)) {
      notFound();
    }
    const data = await getCatalogDataBySlug(slug);
    return data;
  } catch (error: unknown) {
    // If the API returns a 404, trigger the notFound() page
    if (error instanceof Error && error.message.includes('404')) {
      notFound();
    }
    // For other errors, log them and throw a generic error
    console.error(`Fetch error in getPageData for slug: ${slug}`, error);
    throw new Error(`Failed to fetch data for slug: ${slug}`);
  }
};

export default async function DynamicCatalogPage(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  const queryClient = new QueryClient();
  const slugPath = params.slug.join('/');

  const pageData = await getPageData(`catalog/${slugPath}/`);
  console.log('pageData', pageData);

  // // Страница раздела
  const isSectionPage = pageData.hasOwnProperty('items');

  if (isSectionPage) {
    await queryClient.prefetchQuery({
      queryKey: ['catalogList', `/catalog/${slugPath}/`],
      queryFn: () => pageData,
    });
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CatalogListWidget />
      </HydrationBoundary>
    );
  }

  // Детальная страница товара
  await queryClient.prefetchQuery({
    queryKey: ['catalogDetail', slugPath],
    queryFn: () => pageData,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogDetailWidget slug={slugPath} />
    </HydrationBoundary>
  );
}
