import blogIcon from './assets/blog.svg';
import { ModuleMeta } from '../../../types/modules.js'

export const meta: ModuleMeta = {
  label: 'Post listing',
  host_template_types: ['BLOG_LISTING', 'BLOG_POST', 'PAGE'],
  icon: blogIcon,
  categories: ['blog'],
};
