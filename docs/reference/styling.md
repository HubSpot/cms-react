# Styling

Refer to the [styling example project](https://github.com/HubSpot/cms-js-building-block-examples/tree/main/styling/styling-project/styling-app) for working examples of supported methods of styling your components, including a number of major styling libraries.

## Tailwind

You can configure [Tailwind](https://tailwindcss.com/) for your components by doing the following:

- Add a dependency to `tailwindcss` to your `package.json`
- Add a PostCSS configuration file to your project subcomponent including tailwind as a plugin
- Refer to a Tailwind config in that plugin with any Tailwind-specific configuration
- Import a CSS file in your top level component with the base Tailwind layer directives

See the `TailwindPartial` component and the relevant configuration in the example for more detail.

## styled-components

You can use [`styled-components`](https://styled-components.com) in your project by doing the following:

- Add a `dependency` on `styled-components` to your `package.json`
- Create a registry component using the styled-components [server side rendering](https://styled-components.com/docs/advanced#server-side-rendering) API along with [`useInlineHeadAsset()`](./cms-components#useinlineheadasset) and wrap the components you intend to style in it. The example includes a `StyledComponentsRegistry.jsx` you can use.
- For each Island usage, you must wrap each subtree in a registry to capture styles when rendering on the server. To make this easier you may use the `Wrapper` prop on the `Island` component to wrap the contents without needing to edit the island components themselves. Note that  This prop also lets you configure this once by replacing all instances of `<Island />` with a `<StyledIsland />` that looks something like:

::: warning Important
when using the `Wrapper` prop **you must import the component passed with a `?client` suffix** to make sure it can be bundled for the client.
:::

```javascript
import { Island } from '@hubspot/cms-components';
import StyledComponentsRegistry from './StyledComponentsRegistry?client';

export default function StyledIsland(props) {
  return <Island {...props} Wrapper={StyledComponentsRegistry} />
}
```

- You can now `import styled from 'styled-components';` and use it to style your components.

## styled-jsx

Steps to use `styled-jsx` are:

- Add a dependency on `styled-jsx` to your `package.json`
- Create a registry component using the [server side rendering](https://github.com/vercel/styled-jsx#server-side-rendering) API and [`useInlineHeadAsset()`](./cms-components#useinlineheadasset). The example includes a `StyledJSXRegistry.jsx` to refer to or use.
- The registry component for `styled-jsx` must also be wrapped on any `Island` usage to prevent hydration mismatches or missing styles on initial load. Note that `styled-jsx`'s implementation depends on `useId()` hooks in a way that can cause mismatches if not properly configured. See the `StyledJSXIsland.jsx` implementation from the example for an easier pattern of replacing all direct `<Island />` usage.
- You can now use `styled-jsx` to style your components, including ``<style jsx>{` /* CSS here */ `}</style>`` patterns.

## CSS Modules

You can use [CSS Modules](https://github.com/css-modules/css-modules) within any React components by importing a file ending in .module.css, which will return a CSS module object:

```css
/example.module.css */

.red {
  color: red;
}

/How to have global—non-namespaced—styles in CSS modules */
:global(html) {
  border: 6px solid SteelBlue;
}
```

```javascript
import classes from './example.module.css';

export default function MyComponent() {
  return <div className={classes.red}>red text</div>;
}
```

When you important a CSS modules file from inside a React component:

- A `<style>` tag will automatically be inserted into the page for you when the component is server-rendered OR when it is dynamically rendered on in the browser
- Those styles will automatically be namespaced so they don’t interfere with anything else on the page

Note, you can also import regular CSS files into your React components. But their selectors will not be automatically namespaced.

### Dynamic styles based on props

If you need to dynamically adjust styles based on props, here are some options:

- If you have some conditional style that is either on or off, then you can have a className that the React component code conditionally renders in your JSX.
- However if you have some dynamic style that is not a toggle but rather a specific color or number that you need to apply to your styles then you can:
  - Define CSS custom properties in your CSS or CSS modules code and inject new CSS custom property values via React
  - Use React to set inline styles on the specific part of the module HTML needed

Here’s a hypothetical example of all three of those techniques in action:

```css
/example2.module.css */

.fancy-module-wrapper {}

.purple-border {
  border: 2px solid rebeccapurple;
}

.second-text {
  color: var(--second-text-color, mediumvioletred);
}
```

```javascript
import styles from './example2.module.css';

export default function FancierComponent(props) {
  const { hasPurpleBorder, paddingPx, customSecondTextColor } = props;

  // Example: toggling styles via a prop
  const classes = [styles['fancy-module-wrapper']];
  if (hasPurpleBorder) {
    classes.push(styles['purple-border']);
  }

  // Example: using inline style attribute (with React's style syntax)
  const inlineStyles = { padding: paddingPx };

  // Example: setting a CSS custom property value that's picked up by other CSS
  const inlineAndCustomPropertyStyles = {
    ...inlineStyles,
    '--second-text-color': customSecondTextColor,
  };

  return (
    <div className={classes.join(' ')} style={inlineAndCustomPropertyStyles}>
      <p>First text</p>
      <p className={styles['second-text']}>Second text</p>
    </div>
  );
}
```

## Other CSS-in-JS libraries

Other CSS-in-JS libraries that provide a server side rendering API and don't depend on a Babel plugin can be used within HubSpot projects. The same registry pattern described above can be generalized for other libraries to emit CSS to include as part of the server render. The registry will need to be included as a `Wrapper` on any `<Island />` usage as well if there are styles within the island.
