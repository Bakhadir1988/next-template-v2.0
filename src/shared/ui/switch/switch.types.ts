import { ComponentProps } from 'react';

import * as Switch from '@radix-ui/react-switch';

export type SwitchProps = ComponentProps<typeof Switch.Root> & {
  label?: string;
  className?: string;
};
