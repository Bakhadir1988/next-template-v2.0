'use client';
import React from 'react';

import {
  FilterProp,
  EnumFilter as EnumFilterType,
} from '@/entities/filter/model/filter.type';
import { Checkbox } from '@/shared/ui/checkbox';

import styles from './enum-filter.module.scss';

interface EnumFilterProps {
  filter: FilterProp;
  value: string[];
  onChange: (value: string[]) => void;
}

export const EnumFilter = ({
  filter,
  value = [],
  onChange,
}: EnumFilterProps) => {
  const enumFilter = filter.filter as EnumFilterType;

  const handleCheckedChange = (checked: boolean, label: string) => {
    if (checked) {
      onChange([...value, label]);
    } else {
      onChange(value.filter((v) => v !== label));
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        {Object.values(enumFilter).map((filterValue) => (
          <Checkbox
            key={filterValue.label}
            id={filterValue.label}
            label={`${filterValue.label} (${filterValue.current_count})`}
            checked={value.includes(filterValue.label!)}
            onCheckedChange={(checked) =>
              handleCheckedChange(Boolean(checked), filterValue.label!)
            }
          />
        ))}
      </div>
    </div>
  );
};
