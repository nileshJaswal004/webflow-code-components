import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { LiveCandidateFeed } from './LiveCandidateFeed';

export default declareComponent(LiveCandidateFeed, {
  name: 'Live Candidate Feed',
  description: 'Fetches live mock candidate data from randomuser.me API.',
  group: 'Dynamic',
  props: {
    title: props.String({ 
      name: 'Feed Title', 
      defaultValue: 'Recently Active Candidates' 
    }),
    resultsCount: props.Number({ 
      name: 'Number of Candidates', 
      defaultValue: 3 
    }),
  },
});
