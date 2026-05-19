import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { Tabs } from './Tabs';

export default declareComponent(Tabs, {
  name: 'Tabs',
  description: 'An accessible tabbed content switcher with 3 configurable panels.',
  group: 'Navigation',
  props: {
    tab1Label:   props.String({ name: 'Tab 1 Label',   defaultValue: 'Overview' }),
    tab1Content: props.String({ name: 'Tab 1 Content', defaultValue: 'Content for tab 1.' }),
    tab2Label:   props.String({ name: 'Tab 2 Label',   defaultValue: 'Features' }),
    tab2Content: props.String({ name: 'Tab 2 Content', defaultValue: 'Content for tab 2.' }),
    tab3Label:   props.String({ name: 'Tab 3 Label',   defaultValue: 'Details' }),
    tab3Content: props.String({ name: 'Tab 3 Content', defaultValue: 'Content for tab 3.' }),
    defaultTab:  props.Variant({
      name: 'Default Active Tab',
      options: ['Tab 1', 'Tab 2', 'Tab 3'],
      defaultValue: 'Tab 1',
    }),
  },
});
