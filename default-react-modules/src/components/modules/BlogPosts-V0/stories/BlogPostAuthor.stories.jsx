import { Component, fields } from '../index.jsx';
import { moduleStory } from '@hubspot/cms-dev-server/storybook';
import { Default } from './Default.stories.jsx';

export default {
  title: 'BlogPosts/Author',
  component: Component,
};

export const NoAuthorImage = moduleStory(Component, fields);
NoAuthorImage.args = {
  ...Default.args,
  displayForEachListItem: ['image', 'title', 'authorName'],
};

export const NoAuthorName = moduleStory(Component, fields);
NoAuthorName.args = {
  ...Default.args,
  displayForEachListItem: ['image', 'title', 'authorImage'],
};

export const NoAuthorNameOrImage = moduleStory(Component, fields);
NoAuthorNameOrImage.args = {
  ...Default.args,
  displayForEachListItem: ['image', 'title'],
};
