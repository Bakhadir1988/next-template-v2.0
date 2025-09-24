import { ReactNode } from 'react';

import { dialogVariants } from './dialog.variants';

import type { VariantProps } from 'class-variance-authority';

export type DialogProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof dialogVariants> & {
    width?: 'sm' | 'md' | 'lg';
    children: ReactNode;
    trigger: ReactNode;
    title?: string;
    description?: string;
    hideTitle?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  };
