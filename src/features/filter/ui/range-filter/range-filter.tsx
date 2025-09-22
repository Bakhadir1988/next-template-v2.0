'use client';
import React from 'react';

import { FilterProp, PriceFilter } from '@/entities/filter/model/filter.type';
import { Input } from '@/shared/ui/input/input';
import { Slider } from '@/shared/ui/slider';

import styles from './range-filter.module.scss';

interface RangeFilterProps {
  filter: FilterProp;
  value?: [number, number];
  onChange: (value: [number, number]) => void;
}

export const RangeFilter = ({ filter, value, onChange }: RangeFilterProps) => {
  const priceFilter = filter.filter as PriceFilter;
  const min = parseFloat(priceFilter.min);
  const max = parseFloat(priceFilter.max);

  const step = filter.type === 'FLOAT' ? 0.1 : 1;

  const internalValue = value ?? [min, max];

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseFloat(e.target.value);
    if (!isNaN(newMin)) {
      onChange([newMin, internalValue[1]]);
    }
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseFloat(e.target.value);
    if (!isNaN(newMax)) {
      onChange([internalValue[0], newMax]);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Slider
        min={min}
        max={max}
        step={step}
        value={internalValue}
        onValueChange={onChange}
      />
      <div className={styles.values}>
        <Input
          type="number"
          value={internalValue[0]}
          onChange={handleMinInputChange}
        />
        <span>-</span>
        <Input
          type="number"
          value={internalValue[1]}
          onChange={handleMaxInputChange}
        />
      </div>
    </div>
  );
};
