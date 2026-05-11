import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { FAQAccordion } from './FAQAccordion';

export default declareComponent(FAQAccordion, {
  name: 'FAQ Accordion',
  description: 'An interactive accordion for frequently asked questions.',
  group: 'Interactive',
  props: {
    title: props.String({
      name: 'Title',
      defaultValue: 'Frequently Asked Questions',
    }),
    allowMultiple: props.Boolean({
      name: 'Allow Multiple Open',
      defaultValue: false,
    }),
  },
});
