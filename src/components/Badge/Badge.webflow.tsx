import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { Badge } from './Badge';

export default declareComponent(Badge, {
  name: 'Badge',
  description: 'A small inline label with status variants.',
  group: 'Basic',
  props: {
    text: props.String({
      name: 'Text',
      defaultValue: 'Badge',
    }),
    variant: props.Variant({
      name: 'Variant',
      options: ['Default', 'Success', 'Warning', 'Error'],
      defaultValue: 'Default',
    }),
  },
});
