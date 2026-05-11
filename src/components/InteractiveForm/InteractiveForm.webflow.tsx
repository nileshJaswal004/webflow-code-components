import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { InteractiveForm } from './InteractiveForm';

export default declareComponent(InteractiveForm, {
  name: 'Interactive Form',
  description: 'A contact form demonstrating controlled inputs, validation, and simulated submission state.',
  group: 'Interactive',
  props: {
    formTitle: props.String({
      name: 'Form Title',
      defaultValue: 'Contact Us',
    }),
    submitButtonText: props.String({
      name: 'Submit Button Text',
      defaultValue: 'Send Message',
    }),
    successMessage: props.String({
      name: 'Success Message',
      defaultValue: 'Thank you! Your message has been received.',
    }),
  },
});
