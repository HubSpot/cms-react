# Islands

```js
import Island from '@hubspot/cms-components';
```

To use an interactive React component in a page—any component that responds to user input or has state—you need to wrap it with an `<Island>`.

- Here’s how you do that: When importing the component, add `?island` to the end of the import specifier
- Render the Island component from `@hubspot/cms-components`, and pass `InteractiveComponent` from the result of the `?island` import as the `module` prop
- Any serializable props (no functions) can be passed to `Island` and will be received by the component passed to module (`InteractiveComponent` will receive `someProp` when it renders both on the server and client)

```javascript
import { useState } from 'react';
import Island from '@hubspot/cms-components';
import InteractiveComponent from '../InteractiveComponent?island';

export default function MyPartial() {
  let [count, setCount] = useState(0);

  return (
    <div>
      <p>
        This content outside of `InteractiveComponent` is server-rendered only
      </p>

      {/*
        This Island wrapper will auto code-split
        InteractiveComponent for you, render it on the server,
        and set it up to hydrate in the browser.
        */}
      <Island module={InteractiveComponent} defaultCount={42} />
    </div>
  );
}
```

```javascript
import { useState } from 'react';

export default function InteractiveComponent({ defaultCount }) {
  let [count, setCount] = useState(defaultCount);

  /*
   Note, this click handler will only work if
   InteractiveComponent was called from inside an <Island>.
   Otherwise the static server HTML returned will be a button
   that does nothing when you try to click it.
   */
  return <button onClick={() => setCount(count + 1)}>Click me!</button>;
}
```

## Island props

Name | Type | Default | Description
-- | -- | -- | --
<span>**clientOnly**</span> | `boolean` | `false` | When set to `true` the Island won’t be rendered on the server. This can be useful for components that rely on logic/libraries that can only run in the browser.
<span>**hydrateOn**</span> | `"load" \| "visible" \| "idle"` | `"load"` | When rendering a page with Islands on the server, the output includes a script to initialize Islands on the client. Hydrating means downloading and initializing the Island component code, so using these different hydration types strategically to defer some of that work can help boost initial page load performance! See [Hydration Types](#hydration-types) below for more information.
<span>**id**</span> | `string` | - | By default we generate a unique ID string for your island such as `island-123456`. But if you wish to provide your own island ID, you can use this prop.
<span>**module**</span> | `React.Component` | - | Please keep in mind that the component passed in as the value of this prop must include the `?island` suffix as a part of the import RUL. Refer to the `InteractiveComponent` example at the top of the docs.
<span>**wrapperTag**</span> | `string `| `"div"` | The string provided must be a valid HTML element tag (e.g. 'span', 'article', 'section', etc).
<span>**wrapperClassName**</span> | `string` | - | This props gets passed through to the wrapping element around the island. Refer to the `wrapperTag` prop for how to customize which HTML element is used as the wrapping element.
<span>**wrapperStyle**</span> | `CSSProperties` | - | The `CSSProperties` provided will be applied inline to the `wrapperTag` of the island.
<span>**Wrapper**</span> | `React.Component` | - | This prop allows you to provide a custom context provider that will wrap the React tree of your island component. This is particularly useful for integrating with [CSS-in-JS libraries](https://github.hubspot.com/cms-react/reference/styling.html#styled-components), such as styled-components, or other context providers that need to encapsulate the component's subtree for applying styles or context values. Please remember that when using the `Wrapper` prop you **must import the component passed with a `?client` suffix** to make sure it can be bundled for the client.

### [Hydration types](#hydration-types)
The default behavior of the island initialization script is to eagerly hydrate all Islands as soon as possible, i.e., on `load`, but there are other strategies available when hydrating components:
- For islands with the `idle` hydration type we use [requestIdleCallback](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback), allowing the hydration to be deferred. This is good for lower priority components, allowing client resources to be used first on higher priority.
- For Islands with the `visible` hydration type we don’t hydrate until the element is visible on screen by using the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). This mode is good for components that aren't visible to the user immediately, e.g., if they are further down a long page.
