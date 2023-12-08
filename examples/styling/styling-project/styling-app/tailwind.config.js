import { fileURLToPath } from 'url';
const componentsDir = fileURLToPath(new URL('./components', import.meta.url));

export default {
  content: [`${componentsDir}/**/*.{js,ts,jsx,tsx}`],
  theme: {
    extend: {},
  },
  plugins: [],
};
