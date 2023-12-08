import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import postcssNested from 'postcss-nested';
import tailwindConfig from './tailwind.config.js';

export default {
  plugins: [tailwind(tailwindConfig), postcssNested, autoprefixer()],
};
