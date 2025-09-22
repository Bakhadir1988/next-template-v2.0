'use client';
import React from 'react';

import { FilterProp } from '@/entities/filter/model/filter.type';
import { Switch } from '@/shared/ui/switch';

import styles from './boolean-filter.module.scss';

interface BooleanFilterProps {
  filter: FilterProp;
  value: boolean;
  onChange: (value: boolean) => void;
}

export const BooleanFilter = ({
  filter,
  value,
  onChange,
}: BooleanFilterProps) => {
  return (
    <div className={styles.wrapper}>
      <Switch label={filter.title} checked={value} onCheckedChange={onChange} />
    </div>
  );
};
