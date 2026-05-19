import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { Card } from './Card';

export default declareComponent(Card, {
  name: 'Card',
  description: 'A content card with optional badge, title, description, and CTA link.',
  group: 'Content',
  props: {
    title: props.String({ name: 'Title', defaultValue: 'Card Title' }),
    description: props.String({ name: 'Description', defaultValue: 'A short description.' }),
    badge: props.String({ name: 'Badge Label', defaultValue: '' }),
    ctaText: props.String({ name: 'CTA Text', defaultValue: 'Learn More' }),
    ctaUrl: props.String({ name: 'CTA URL', defaultValue: '#' }),
    variant: props.Variant({
      name: 'Variant',
      options: ['Default', 'Outlined', 'Elevated'],
      defaultValue: 'Default',
    }),
  },
});
