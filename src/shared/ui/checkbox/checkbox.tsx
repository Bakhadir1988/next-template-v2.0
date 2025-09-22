'use client';
import React from 'react';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';

import styles from './checkbox.module.scss';
import { CheckboxProps } from './checkbox.types';

export const Checkbox = ({ id, label, className, ...props }: CheckboxProps) => (
  <div className={styles.wrapper}>
    <CheckboxPrimitive.Root
      {...props}
      id={id}
      className={clsx(styles.root, className)}
    >
      <CheckboxPrimitive.Indicator className={styles.indicator}>
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
    {label && (
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
    )}
  </div>
);
