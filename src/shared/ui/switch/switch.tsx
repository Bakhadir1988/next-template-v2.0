'use client';
import React from 'react';

import * as SwitchPrimitive from '@radix-ui/react-switch';
import clsx from 'clsx';

import styles from './switch.module.scss';
import { SwitchProps } from './switch.types';

export const Switch = ({ label, className, ...props }: SwitchProps) => (
  <div className={styles.wrapper}>
    {label && (
      <label className={styles.label} htmlFor="s1">
        {label}
      </label>
    )}
    <SwitchPrimitive.Root
      {...props}
      id="s1"
      className={clsx(styles.root, className)}
    >
      <SwitchPrimitive.Thumb className={styles.thumb} />
    </SwitchPrimitive.Root>
  </div>
);
