import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { Alert } from './Alert';

export default declareComponent(Alert, {
  name: 'Alert',
  description: 'An inline alert banner with type variants and optional dismiss.',
  group: 'Basic',
  props: {
    message: props.String({
      name: 'Message',
      defaultValue: 'This is an alert message.',
    }),
    type: props.Variant({
      name: 'Type',
      options: ['Info', 'Success', 'Warning', 'Error'],
      defaultValue: 'Info',
    }),
    dismissible: props.Boolean({
      name: 'Dismissible',
      defaultValue: true,
    }),
  },
});
