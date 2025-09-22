'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

import { CatalogApiResponse } from '@/entities/catalog/model/catalog.type';
import { ProductList } from '@/entities/product';
import { TagList } from '@/entities/tag';
import { FilterWidget } from '@/features/filter/ui/filter-widget/filter-widget';
import { getCatalogDataBySlug, postCatalogData } from '@/shared/api';
import { Section, Title } from '@/shared/ui';
import { Pagination } from '@/shared/ui/pagination/pagination';

import { CatalogSections } from '../../entities/catalog/ui/catalog-sections';

export const CatalogListWidget = () => {
  const pathname = usePathname();
  const queryClient = useQueryClient();

  // Extract slug from pathname for the API call
  const slug = pathname.replace(/^\/catalog\//, '').replace(/\/$/, '');

  // 1. Initial data fetch with useQuery using the shared API function
  const { data, isLoading, isError } = useQuery<CatalogApiResponse>({
    queryKey: ['catalogList', pathname], // The key for this page's data
    queryFn: () =>
      getCatalogDataBySlug(pathname) as Promise<CatalogApiResponse>,
    enabled: !!slug,
  });

  // 2. Mutation for subsequent page fetches via POST
  const { mutate: changePage } = useMutation({
    mutationFn: async ({
      sectionId,
      page,
    }: {
      sectionId: string;
      page: number;
    }) => {
      const form = new FormData();
      form.append('comp', 'catblock');
      form.append('page', page.toString());
      form.append('sect_id', sectionId);
      form.append('template', 'catalog');
      const response = await postCatalogData(form);
      // We need to parse the JSON from the response
      return response.json();
    },
    onSuccess: (newData) => {
      // 3. Manually update the query cache with the new page data
      queryClient.setQueryData(
        ['catalogList', pathname], // Use the correct query key
        (oldData: CatalogApiResponse | undefined) => {
          if (!oldData) return;
          return {
            ...oldData,
            items: newData.items || [], // Update items
            pagi: newData.pagi || oldData.pagi, // Update pagination info
          };
        },
      );
    },
    onError: (error) => {
      console.error('Failed to change page', error);
    },
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

  const handlePageChange = (page: number) => {
    const sectionId = data?.section?.item_id;
    if (sectionId) {
      changePage({ sectionId, page });
    }
  };

  return (
    <>
      <Title as={'h1'}>{data.section.title}</Title>
      <CatalogSections sections={data.sections} />
      {data.upper_tags.length > 0 && (
        <TagList tags={data.upper_tags} title="Верхние теги" />
      )}

      <Section>
        <div>
          {data.section.item_id && (
            <FilterWidget sectId={data.section.item_id} />
          )}
        </div>
        {data.items.length > 0 && <ProductList items={data.items} />}

        {data.pagi && data.pagi.total_pages > 1 && (
          <Pagination
            currentPage={Number(data.pagi.current_page)}
            totalPages={data.pagi.total_pages}
            onPageChange={handlePageChange}
          />
        )}
      </Section>

      {data.lower_tags.length > 0 && (
        <TagList tags={data.lower_tags} title="Нижние теги" />
      )}
    </>
  );
};
