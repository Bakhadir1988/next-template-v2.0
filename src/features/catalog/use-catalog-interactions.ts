import { useCallback, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CatalogApiResponse } from '@/entities/catalog/model/catalog.type';
import { postCatalogData } from '@/shared/api';
import { postFilterData } from '@/shared/api/filter-api';

import { FilterValueType } from '../filter/model/filter-values.type';

export const useCatalogInteractions = (
  pathname: string,
  data: CatalogApiResponse | undefined,
) => {
  const [activeFilters, setActiveFilters] = useState<
    Record<string, FilterValueType>
  >({});

  const queryClient = useQueryClient();

  const appendFiltersToForm = (
    form: FormData,
    filters: Record<string, FilterValueType>,
  ) => {
    for (const key in filters) {
      const value = filters[key];
      if (Array.isArray(value)) {
        if (
          value.length === 2 &&
          typeof value[0] === 'number' &&
          typeof value[1] === 'number'
        ) {
          form.append(`filter[${key}][gt]`, String(value[0]));
          form.append(`filter[${key}][lt]`, String(value[1]));
        } else {
          value.forEach((v) => {
            if (typeof v === 'string') {
              form.append(`filter[${key}][]`, v);
            }
          });
        }
      } else if (typeof value === 'boolean' && value) {
        form.append(`filter[${key}][]`, 'true');
      }
    }
  };

  const { mutate: changePage } = useMutation({
    mutationFn: async ({
      sectionId,
      page,
      filters,
    }: {
      sectionId: string;
      page: number;
      filters: Record<string, FilterValueType>;
    }) => {
      const form = new FormData();
      form.append('comp', 'catblock');
      form.append('page', page.toString());
      form.append('sect_id', sectionId);
      form.append('template', 'catalog');
      appendFiltersToForm(form, filters);
      const response = await postCatalogData(form);
      return response.json();
    },
    onSuccess: (newData) => {
      queryClient.setQueryData(
        ['catalogList', pathname],
        (oldData: CatalogApiResponse | undefined) => {
          if (!oldData) return { ...newData };
          return {
            ...oldData,
            items: newData.items || [],
            pagi: newData.pagi || oldData.pagi,
          };
        },
      );
    },
  });

  const { mutate: applyFilters } = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await postFilterData(formData);
      return response.json();
    },
    onSuccess: (newData) => {
      queryClient.setQueryData(
        ['catalogList', pathname],
        (oldData: CatalogApiResponse | undefined) => {
          if (!oldData) return { ...newData };
          return {
            ...oldData,
            items: newData.items || [],
            pagi: newData.pagi || oldData.pagi,
          };
        },
      );
    },
  });

  const handleApplyFilters = useCallback(
    (filters: Record<string, FilterValueType>) => {
      const sectionId = queryClient.getQueryData<CatalogApiResponse>([
        'catalogList',
        pathname,
      ])?.section?.item_id;

      if (!sectionId) return;

      setActiveFilters(filters);

      const form = new FormData();
      form.append('comp', 'catblock');
      form.append('sect_id', sectionId);
      form.append('template', 'filter');
      appendFiltersToForm(form, filters);

      applyFilters(form);
    },
    [applyFilters, queryClient, pathname],
  );

  const handlePageChange = (page: number) => {
    const sectionId = data?.section?.item_id;
    if (sectionId) {
      changePage({ sectionId, page, filters: activeFilters });
    }
  };

  return {
    changePage,
    activeFilters,
    handleApplyFilters,
    handlePageChange,
  };
};
