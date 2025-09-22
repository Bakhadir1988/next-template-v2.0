'use client';
import React from 'react';

import { ChevronDownIcon, Cross2Icon } from '@radix-ui/react-icons';

import { FilterProp } from '@/entities/filter/model/filter.type';
import { Button } from '@/shared/ui/button';
import { Dropdown } from '@/shared/ui/dropdown/dropdown';

import { FilterValueType } from '../../model/filter-values.type';
import { BooleanFilter } from '../boolean-filter/boolean-filter';
import { EnumFilter } from '../enum-filter/enum-filter';
import { RangeFilter } from '../range-filter/range-filter';

interface FilterItemProps {
  filter: FilterProp;
  value: FilterValueType;
  onChange: (value: FilterValueType) => void;
}

export const FilterItem = ({ filter, value, onChange }: FilterItemProps) => {
  if (filter.type === 'BOOLEAN') {
    return (
      <BooleanFilter
        filter={filter}
        value={typeof value === 'boolean' ? value : false}
        onChange={onChange}
      />
    );
  }

  const renderFilter = () => {
    switch (filter.type) {
      case 'ENUM':
        return (
          <EnumFilter
            filter={filter}
            value={
              Array.isArray(value) && value.every((v) => typeof v === 'string')
                ? (value as string[])
                : []
            }
            onChange={onChange}
          />
        );
      case 'PRICE':
      case 'FLOAT':
      case 'INTEGER':
        return (
          <RangeFilter
            filter={filter}
            value={
              Array.isArray(value) && value.length === 2
                ? (value as [number, number])
                : undefined
            }
            onChange={onChange}
          />
        );
      default:
        return null;
    }
  };

  const hasValue = value && (!Array.isArray(value) || value.length > 0);

  const triggerLabel = () => {
    if (!hasValue) {
      return filter.title;
    }

    if (filter.type === 'ENUM' && Array.isArray(value)) {
      return `${filter.title}: ${value.length}`;
    }

    if (
      ['PRICE', 'FLOAT', 'INTEGER'].includes(filter.type) &&
      Array.isArray(value)
    ) {
      return `${filter.title}: от ${value[0]} до ${value[1]}`;
    }

    if (Array.isArray(value)) {
      return `${filter.title}: ${value.join(', ')}`;
    }

    return `${filter.title}: ${value}`;
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(undefined);
  };

  return (
    <Dropdown
      trigger={
        <Button>
          {triggerLabel()}
          {hasValue ? (
            <Cross2Icon onClick={handleClear} />
          ) : (
            <ChevronDownIcon />
          )}
        </Button>
      }
    >
      {renderFilter()}
    </Dropdown>
  );
};
