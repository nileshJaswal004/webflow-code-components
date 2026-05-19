import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { Toast } from './Toast';

export default declareComponent(Toast, {
  name: 'Toast Notification',
  description: 'A portal-rendered toast/notification that appears above all other content.',
  group: 'Feedback',
  props: {
    message:    props.String({ name: 'Message', defaultValue: 'This is a notification message.' }),
    type:       props.Variant({ name: 'Type', options: ['Info', 'Success', 'Warning', 'Error'], defaultValue: 'Info' }),
    duration:   props.Number({ name: 'Duration (ms)', defaultValue: 3000 }),
    position:   props.Variant({
      name: 'Position',
      options: ['Top Right', 'Top Left', 'Bottom Right', 'Bottom Left', 'Top Center', 'Bottom Center'],
      defaultValue: 'Top Right',
    }),
    buttonText: props.String({ name: 'Trigger Button Text', defaultValue: 'Show Toast' }),
  },
});
