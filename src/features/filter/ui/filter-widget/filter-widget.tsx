'use client';
import { useState } from 'react';

import { Button } from '@/shared/ui/button';
import { Skeleton } from '@/shared/ui/skeleton/skeleton';

import { FilterValueType } from '../../model/filter-values.type';
import { useFilter } from '../../model/use-filter';
import { FilterItem } from '../filter-item/filter-item';

import styles from './filter-widget.module.scss';

interface FilterWidgetProps {
  sectId: string;
}

export const FilterWidget = ({ sectId }: FilterWidgetProps) => {
  const { data: filters, isLoading, isError } = useFilter(sectId);
  const [filterValues, setFilterValues] = useState<
    Record<string, FilterValueType>
  >({});

  const handleFilterChange = (key: string, value: FilterValueType) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearAll = () => {
    setFilterValues({});
  };

  const hasActiveFilters = Object.values(filterValues).some((value) => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value !== undefined && value !== null && value !== false;
  });

  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.list}>
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} style={{ height: '38px', width: '120px' }} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching filters</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        {filters?.map((filter) => (
          <FilterItem
            key={filter.prop_id}
            filter={filter}
            value={filterValues[filter.tpl_key]}
            onChange={(value) => handleFilterChange(filter.tpl_key, value)}
          />
        ))}
        {hasActiveFilters && (
          <Button onClick={handleClearAll}>Очистить все</Button>
        )}
      </div>
    </div>
  );
};
