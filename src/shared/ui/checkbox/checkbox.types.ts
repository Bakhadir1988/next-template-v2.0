import { ComponentProps } from 'react';

import * as Checkbox from '@radix-ui/react-checkbox';

export type CheckboxProps = ComponentProps<typeof Checkbox.Root> & {
  id?: string;
  label?: string;
  className?: string;
};
