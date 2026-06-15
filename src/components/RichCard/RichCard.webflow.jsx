import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { RichCard } from './RichCard';

export default declareComponent(RichCard, {
  name: 'Rich Card',
  description: 'A kitchen-sink component using all Webflow prop types.',
  group: 'Reference',
  props: {
    imageUrl: props.Image({
      name: 'Thumbnail Image',
      defaultValue: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80',
    }),
    showBadge: props.Boolean({
      name: 'Show Badge',
      defaultValue: true,
    }),
    title: props.String({
      name: 'Title',
      defaultValue: 'Premium Webflow Course',
    }),
    rating: props.Number({
      name: 'Rating (1-5)',
      defaultValue: 5,
    }),
    buttonUrl: props.Link({
      name: 'Button URL',
      defaultValue: '#',
    }),
    theme: props.Variant({
      name: 'Theme',
      options: ['Light', 'Dark'],
      defaultValue: 'Light',
    }),
  },
});
