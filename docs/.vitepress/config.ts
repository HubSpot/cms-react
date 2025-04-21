import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'HubSpot - CMS React',
  description: 'Archived documentation site for HubSpot CMS React',
  base: '/cms-react/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Official Docs', link: 'https://developers.hubspot.com/docs/guides/cms/react/overview' },
      { text: 'Examples', link: 'https://github.com/HubSpot/cms-react/tree/main/examples' },
      { text: 'Release Log', link: 'release-log' },
    ],
  },
});
