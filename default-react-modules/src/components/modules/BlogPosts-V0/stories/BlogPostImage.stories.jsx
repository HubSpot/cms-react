import { Component, fields } from '../index.jsx';
import { moduleStory } from '@hubspot/cms-dev-server/storybook';
import { Default } from './Default.stories.jsx';

export default {
  title: 'BlogPosts/Image',
  component: Component,
};

export const NoImage = moduleStory(Component, fields);
NoImage.args = {
  ...Default.args,
  displayForEachListItem: ['title', 'authorName', 'authorImage'],
};

export const FullSizeImage = moduleStory(Component, fields);
FullSizeImage.args = {
  ...Default.args,
  fullImage: true,
};
