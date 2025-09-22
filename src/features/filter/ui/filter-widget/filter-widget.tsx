'use client';
import { useEffect, useState } from 'react';

import { FilterType } from '@/entities/filter/model/filter.type';
import { Button } from '@/shared/ui/button';
import { Skeleton } from '@/shared/ui/skeleton/skeleton';

import { FilterValueType } from '../../model/filter-values.type';
import { useFilter } from '../../model/use-filter';
import { FilterItem } from '../filter-item/filter-item';

import styles from './filter-widget.module.scss';

interface FilterWidgetProps {
  sectId: string;
  onApplyFilters: (filters: Record<string, FilterValueType>) => void;
}

export const FilterWidget = ({ sectId, onApplyFilters }: FilterWidgetProps) => {
  const { data: filters, isLoading, isError } = useFilter(sectId);
  const [filterValues, setFilterValues] = useState<
    Record<string, FilterValueType>
  >({});

  // Debounce for sliders
  const [debouncedSliderValues, setDebouncedSliderValues] = useState({});

  useEffect(() => {
    const handler = setTimeout(() => {
      onApplyFilters(filterValues);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedSliderValues]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFilterChange = (
    key: string,
    value: FilterValueType,
    type: FilterType,
  ) => {
    const newValues = { ...filterValues, [key]: value };
    setFilterValues(newValues);

    if (['PRICE', 'FLOAT', 'INTEGER'].includes(type)) {
      setDebouncedSliderValues(newValues);
    } else {
      onApplyFilters(newValues);
    }
  };

  const handleClearAll = () => {
    setFilterValues({});
    onApplyFilters({});
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
            value={filterValues[filter.prop_id]}
            onChange={(value) =>
              handleFilterChange(filter.prop_id, value, filter.type)
            }
          />
        ))}
        {hasActiveFilters && (
          <Button variant={'link'} onClick={handleClearAll}>
            Очистить все
          </Button>
        )}
      </div>
    </div>
  );
};
