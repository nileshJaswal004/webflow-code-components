import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { StatsBanner } from './StatsBanner';

export default declareComponent(StatsBanner, {
  name: 'Stats Banner',
  description: 'A 4-column banner to display dynamic statistics.',
  group: 'Marketing',
  props: {
    stat1Value: props.String({ name: 'Stat 1 Value', defaultValue: '7' }),
    stat1Label: props.String({ name: 'Stat 1 Label', defaultValue: 'COMPONENTS' }),
    stat2Value: props.String({ name: 'Stat 2 Value', defaultValue: '45+' }),
    stat2Label: props.String({ name: 'Stat 2 Label', defaultValue: 'CSS TOKENS' }),
    stat3Value: props.String({ name: 'Stat 3 Value', defaultValue: '7' }),
    stat3Label: props.String({ name: 'Stat 3 Label', defaultValue: 'CATEGORIES' }),
    stat4Value: props.String({ name: 'Stat 4 Value', defaultValue: 'v1.0' }),
    stat4Label: props.String({ name: 'Stat 4 Label', defaultValue: 'VERSION' }),
  },
});
