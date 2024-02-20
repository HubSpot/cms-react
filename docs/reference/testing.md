# Testing

React components are easy to unit test with [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

To add tests to your own project, start by adding those packages as dev dependencies, as well as `@vitejs/plugin-react` (for React support)

For Vitest to work properly with your React components add a vitest.config.js in your package root.

```javascript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

When writing a test file that uses React Testing Library to render components or referencing any browser-specific APIs, [add this to the top of the file](https://vitest.dev/guide/environment.html#test-environment):

```javascript
// @vitest-environment jsdom
```

This enables React Testing Library’s [`render`](https://testing-library.com/docs/react-testing-library/api/#render) function to work.
