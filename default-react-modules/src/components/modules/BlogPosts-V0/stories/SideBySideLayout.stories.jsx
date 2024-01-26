import { Component, fields } from '../index.jsx';
import { moduleStory } from '@hubspot/cms-dev-server/storybook';
import { Default } from './Default.stories.jsx';

export default {
  title: 'BlogPosts/SideBySideLayout',
  component: Component,
};

export const SideBySide = moduleStory(Component, fields);
SideBySide.args = {
  ...Default.args,
  layout: 'sideBySide',
};

export const AlternateImage = moduleStory(Component, fields);
AlternateImage.args = {
  ...Default.args,
  layout: 'sideBySide',
  alternateImage: true,
};
