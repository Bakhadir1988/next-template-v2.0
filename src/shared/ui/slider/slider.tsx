'use client';
import React from 'react';

import * as SliderPrimitive from '@radix-ui/react-slider';
import clsx from 'clsx';

import styles from './slider.module.scss';
import { SliderProps } from './slider.types';

export const Slider = ({ className, ...props }: SliderProps) => (
  <SliderPrimitive.Root {...props} className={clsx(styles.root, className)}>
    <SliderPrimitive.Track className={styles.track}>
      <SliderPrimitive.Range className={styles.range} />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className={styles.thumb} />
    <SliderPrimitive.Thumb className={styles.thumb} />
  </SliderPrimitive.Root>
);
