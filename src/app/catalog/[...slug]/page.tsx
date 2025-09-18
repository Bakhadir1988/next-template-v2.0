import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import { getCatalogData, getCatalogDataBySlug } from '@/shared/api';
import { CatalogDetailWidget, CatalogListWidget } from '@/widgets';

// Преобразует URL в массив сегментов (slug) для динамических маршрутов Next.js.
const getSlugArrayFromUrl = (url: string) => {
  return url
    .replace(/^\/|\/$/g, '')
    .replace(/^catalog\//, '')
    .split('/');
};

// Функция Next.js для генерации статических путей во время сборки.
export async function generateStaticParams() {
  try {
    const data = await getCatalogData();

    const slugs = [
      ...data.items.map((item) => ({ slug: getSlugArrayFromUrl(item.url) })),
      ...data.sections.map((section) => ({
        slug: getSlugArrayFromUrl(section.url),
      })),
    ];

    console.log(`Generated ${slugs.length} static catalog paths`);
    return slugs;
  } catch (error) {
    console.error('Failed to generate static params:', error);
    throw new Error('Failed to generate static params');
  }
}

// Получает данные для конкретной страницы, используя новый API-слой

const getPageData = async (slug: string) => {
  let response;
  try {
    return await getCatalogDataBySlug(slug);
  } catch (error) {
    // Ловим только ошибки сети (если fetch не удался)
    console.error('Fetch error in getPageData:', error);
    throw new Error(`Network error when fetching data for slug: ${slug}`);
  }

  // Проверяем статус ответа уже после try-catch
  if (response.status === 404) {
    // Вызываем notFound, если страница не найдена.
    // Это не будет поймано в catch выше.
    notFound();
  }

  if (!response.ok) {
    // Для всех других ошибок (500, 401 и т.д.) выбрасываем ошибку,
    // чтобы показать страницу с ошибкой сервера.
    throw new Error(`API returned non-OK status: ${response.status}`);
  }

  return response.json();
};

export default async function DynamicCatalogPage(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  const queryClient = new QueryClient();
  const slugPath = params.slug.join('/');

  const pageData = await getPageData(slugPath);

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
