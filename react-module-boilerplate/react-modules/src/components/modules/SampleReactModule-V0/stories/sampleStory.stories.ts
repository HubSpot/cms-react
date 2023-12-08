import { moduleStory } from '@hubspot/cms-dev-server/storybook';
import { Component, fields } from '../index.js';

// Define meta for story
export default {
  title: 'SampleReactModule',
  component: Component,
};

/*
 *Create the config interface. Allows TS to understand
 *what the config argument should look like. This should
 *be modeled after the field structure.
 */

interface SampleReactModuleConfig {
  heading?: string;
  defaultCount?: number;
}

/*
 *This part can look different depending on how many stories
 *you plan on writing. In this case SampleReactModuleStory is a factory
 *which creates instances of moduleStory. It takes a single
 *argument, config, which is defined above.
 */

let SampleReactModuleStory = (config: SampleReactModuleConfig) =>
  moduleStory(Component, fields, config);

export const Default = SampleReactModuleStory({});
export const HasHeading = SampleReactModuleStory({ heading: 'Test heading' });

/*
 *This is another way that you could write a story.
 *In this instance we are setting a default count.
 *Note that default count is not defined as a field value
 *but rather something a developer might hardcode on the module.
 *(Check `../index.tsx` for more details)
 */

const hasDefaultCountConfig: SampleReactModuleConfig = {
  heading: 'Alternate heading',
  defaultCount: 15,
};
export const HasDefaultCount = moduleStory(
  Component,
  fields,
  hasDefaultCountConfig
);
