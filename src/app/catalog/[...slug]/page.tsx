import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import { CatalogApiResponse } from '@/entities/catalog/catalog.type';
import { CatalogDetail } from '@/widgets/catalog-detail';
import { CatalogList } from '@/widgets/catalog-list';

// Преобразует URL в массив сегментов (slug) для динамических маршрутов Next.js.
const getSlugArrayFromUrl = (url: string) => {
  return url
    .replace(/^\/|\/$/g, '')
    .replace(/^catalog\//, '')
    .split('/');
};

// Функция Next.js для генерации статических путей во время сборки.
// Она сообщает Next.js, какие страницы необходимо предварительно отрендерить.
export async function generateStaticParams() {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL!}catalog/`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data: CatalogApiResponse = await response.json();

    const slugs = [
      ...data.items.map((item) => ({ slug: getSlugArrayFromUrl(item.url) })),
      ...data.sections.map((section) => ({
        slug: getSlugArrayFromUrl(section.url),
      })),
    ];

    console.log(`✅ Generated ${slugs.length} static catalog paths`);
    return slugs;
  } catch (error) {
    console.error('❌ Failed to generate static params:', error);
    throw new Error('Failed to generate static params');
  }
}

// Получает данные для конкретной страницы (раздела или товара) по ее slug.
const getPageData = async (slug: string) => {
  let response;
  try {
    response = await fetch(
      `https://litra-adm.workup.spb.ru/api/catalog/${slug}/`,
    );
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
        <CatalogList />
      </HydrationBoundary>
    );
  }

  await queryClient.prefetchQuery({
    queryKey: ['catalogDetail', slugPath],
    queryFn: () => pageData,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogDetail slug={slugPath} />
    </HydrationBoundary>
  );
}
