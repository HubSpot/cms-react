import { Component, fields } from '../index.jsx';
import { moduleStory } from '@hubspot/cms-dev-server/storybook';
import { Default } from './Default.stories.jsx';

export default {
  title: 'BlogPosts/Title',
  component: Component,
};

export const NoTitle = moduleStory(Component, fields);
NoTitle.args = {
  ...Default.args,
  displayForEachListItem: ['image', 'authorImage', 'authorName'],
};
