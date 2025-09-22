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

  const handleCheckedChange = (checked: boolean, itemId: string) => {
    if (checked) {
      onChange([...value, itemId]);
    } else {
      onChange(value.filter((v) => v !== itemId));
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        {Object.entries(enumFilter).map(([itemId, filterValue]) => (
          <Checkbox
            key={itemId}
            id={itemId}
            label={`${filterValue.label} (${filterValue.current_count})`}
            checked={value.includes(itemId)}
            onCheckedChange={(checked) =>
              handleCheckedChange(Boolean(checked), itemId)
            }
          />
        ))}
      </div>
    </div>
  );
};
