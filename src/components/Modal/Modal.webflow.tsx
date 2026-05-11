import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { Modal } from './Modal';

export default declareComponent(Modal, {
  name: 'Modal Overlay',
  description: 'A popup modal demonstrating portals/overlays, escape key listeners, and click-outside handling.',
  group: 'Interactive',
  props: {
    buttonText: props.String({
      name: 'Trigger Button Text',
      defaultValue: 'Open Modal',
    }),
    title: props.String({
      name: 'Modal Title',
      defaultValue: 'Modal Title',
    }),
    content: props.String({
      name: 'Modal Content',
      defaultValue: 'This is the modal content. You can put anything you want in here.',
    }),
    closeText: props.String({
      name: 'Close Button Text',
      defaultValue: 'Close',
    }),
  },
});
