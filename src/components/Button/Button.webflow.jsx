import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { Button } from './Button';

export default declareComponent(Button, {
  name: 'Button',
  description: 'A button component with variants and sizes.',
  group: 'Basic',
  props: {
    label: props.String({
      name: 'Label',
      defaultValue: 'Click Me',
    }),
    variant: props.Variant({
      name: 'Variant',
      options: ['Primary', 'Secondary', 'Outline'],
      defaultValue: 'Primary',
    }),
    size: props.Variant({
      name: 'Size',
      options: ['Small', 'Medium', 'Large'],
      defaultValue: 'Medium',
    }),
  },
});
