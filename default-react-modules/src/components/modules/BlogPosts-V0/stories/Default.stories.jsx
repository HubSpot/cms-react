import { Component, fields } from '../index.jsx';
import { moduleStory } from '@hubspot/cms-dev-server/storybook';

export default {
  title: 'BlogPosts/Default',
  component: Component,
};

export const Default = moduleStory(Component, fields);
