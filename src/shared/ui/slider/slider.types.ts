import { ComponentProps } from 'react';

import * as Slider from '@radix-ui/react-slider';

export type SliderProps = ComponentProps<typeof Slider.Root> & {
  className?: string;
};
