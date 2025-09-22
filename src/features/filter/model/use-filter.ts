import { useQuery } from '@tanstack/react-query';

import {
  FilterResponse,
  FilterCatalog,
  FilterProp,
  PriceFilter,
  EnumFilter,
  FilterValue,
} from '@/entities/filter/model/filter.type';
import { getFilter } from '@/shared/api/filter-api';

export const useFilter = (sectId: string) => {
  return useQuery<FilterResponse, Error, FilterProp[]>({
    queryKey: ['filter', sectId],
    queryFn: () => getFilter(sectId),
    select: (data) => {
      const catalog = data.props.find((p) => p.type_name === 'Каталог') as
        | FilterCatalog
        | undefined;

      if (!catalog) {
        return [];
      }

      const nogroupProps = catalog.groups.__nogroup?.props ?? {};
      const charsProps = catalog.groups.chars?.props ?? {};

      const combinedProps = { ...nogroupProps, ...charsProps };

      const nonEmptyFilters = Object.values(combinedProps).filter((prop) => {
        if (['PRICE', 'FLOAT', 'INTEGER'].includes(prop.type)) {
          const filter = prop.filter as PriceFilter;
          return filter.min !== null && filter.max !== null;
        }
        if (prop.type === 'ENUM') {
          const filter = prop.filter as EnumFilter | [];
          if (Array.isArray(filter)) {
            return filter.length > 0;
          }
          return Object.keys(filter).length > 0;
        }
        if (prop.type === 'BOOLEAN') {
          const filter = prop.filter as FilterValue[];
          return filter.every((f) => f.total_count !== undefined);
        }
        return true;
      });

      return nonEmptyFilters;
    },
  });
};
