import { Component, fields } from '../index.jsx';
import { moduleStory } from '@hubspot/cms-dev-server/storybook';
import { Default } from './Default.stories.jsx';

export default {
  title: 'BlogPosts/GridStyling',
  component: Component,
};

export const SingleColumn = moduleStory(Component, fields);
SingleColumn.args = {
  ...Default.args,
  columns: 1,
};

export const TwoColumnGrid = moduleStory(Component, fields);
TwoColumnGrid.args = {
  ...Default.args,
  columns: 2,
};

export const FourColumnGrid = moduleStory(Component, fields);
FourColumnGrid.args = {
  ...Default.args,
  columns: 4,
};
