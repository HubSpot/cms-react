import { defineConfig } from 'vitepress';
import fieldTypesSidebar from '../field-types/typedoc-sidebar.json';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'HubSpot - CMS React',
  description: 'Archived documentation site for HubSpot CMS React',
  base: '/cms-react/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Release Log', link: 'release-log' },
    ],
  },
});
