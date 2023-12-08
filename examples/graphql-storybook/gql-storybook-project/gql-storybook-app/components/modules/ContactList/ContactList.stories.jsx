import { moduleStory } from '@hubspot/cms-dev-server/storybook';

import { Component, fields } from './index.tsx';

export default {
  title: 'ContactTable',
  component: Component,
};

export const Default = moduleStory(Component, fields, {
  dataQueryResult: {
    data: {
      CRM: {
        contact_collection: {
          items: [
            {
              firstname: 'Cool',
              lastname: 'Robot',
              email: 'coolrobot@hubspot.com',
              company: 'HubSpot',
              _metadata: { id: 1 },
            },
            {
              firstname: 'Brian',
              lastname: 'Halligan',
              email: 'bh@hubspot.com',
              company: 'HubSpot',
              _metadata: { id: 2 },
            },
          ],
        },
      },
    },
  },
});
