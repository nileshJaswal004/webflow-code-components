import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { SwiperCarousel } from './SwiperCarousel';

export default declareComponent(SwiperCarousel, {
  name: 'Swiper Carousel',
  description: 'A touch-friendly carousel/slider powered by Swiper.js.',
  group: 'Media',
  props: {
    slide1Title:       props.String({ name: 'Slide 1 Title',       defaultValue: 'Slide One' }),
    slide1Description: props.String({ name: 'Slide 1 Description', defaultValue: 'Add your content here.' }),
    slide2Title:       props.String({ name: 'Slide 2 Title',       defaultValue: 'Slide Two' }),
    slide2Description: props.String({ name: 'Slide 2 Description', defaultValue: 'Add your content here.' }),
    slide3Title:       props.String({ name: 'Slide 3 Title',       defaultValue: 'Slide Three' }),
    slide3Description: props.String({ name: 'Slide 3 Description', defaultValue: 'Add your content here.' }),
    autoplay:         props.Boolean({ name: 'Autoplay',        defaultValue: false }),
    loop:             props.Boolean({ name: 'Loop',             defaultValue: true }),
    showNavigation:   props.Boolean({ name: 'Show Navigation', defaultValue: true }),
    showPagination:   props.Boolean({ name: 'Show Pagination', defaultValue: true }),
  },
});
