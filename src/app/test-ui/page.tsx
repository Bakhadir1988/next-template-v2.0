'use client';
import React, { useState } from 'react';

import { Checkbox } from '@/shared/ui/checkbox';
import { Slider } from '@/shared/ui/slider';
import { Switch } from '@/shared/ui/switch';

const TestUiPage = () => {
  const [sliderValue, setSliderValue] = useState([20, 80]);

  return (
    <div
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <h1>Test UI Components</h1>

      <section>
        <h2>Checkbox</h2>
        <Checkbox label="Accept terms and conditions" />
      </section>

      <section>
        <h2>Switch</h2>
        <Switch label="Enable notifications" />
      </section>

      <section>
        <h2>Slider</h2>
        <Slider
          defaultValue={sliderValue}
          onValueChange={setSliderValue}
          max={100}
          step={1}
        />
        <div>Current Value: {sliderValue.join(', ')}</div>
      </section>
    </div>
  );
};

export default TestUiPage;
