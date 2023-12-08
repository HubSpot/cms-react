# Islands

To use an interactive React component in your page—any component that responds to user input or has state—you need to wrap it with an `<Island>`.

- Here’s how you do that: When importing the component, add `?island` to the end of the import specifier
- Render the Island component from `@hubspot/cms-components`, and pass `InteractiveComponent` from the result of the `?island` import as the `module` prop
- Any serializable props (no functions) can be passed to `Island` and will be received by the component passed to module (`InteractiveComponent` will receive `someProp` when it renders both on the server and client)

```javascript
import { useState } from 'react';
import { Island } from '@hubspot/cms-components';
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

### `hydrateOn`

When rendering a page with Islands on the server the output includes a script to initialize Islands on the client. The default behavior of the island initialization script is to eagerly hydrate all Islands as soon as possible, i.e., on load, but there are other strategies available when hydrating components.

The available hydration types are:

- `load` (default)
- `idle`
- `visible`

These types can be set as the hydrateOn prop on the Island Component, for example:

```javascript
<Island module={InteractiveComponent} hydrateOn=”visible” />
```

For islands with the `idle` hydration type we use [requestIdleCallback](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback), allowing the hydration to be deferred. This is good for lower priority components, allowing client resources to be used first on higher priority.

For Islands with the `visible` hydration type we don’t hydrate until the element is visible on screen by using the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). This mode is good for components that aren't visible to the user immediately, e.g., if they are further down a long page.

Hydrating means downloading and initializing your Island component code, so using these different hydration types strategically to defer some of that work can help boost initial page load performance!

### `clientOnly`

`boolean`

This is set to `false` by default, but when set to `true` then the Island won’t be rendered on the server. This can be useful for components that rely on logic/libraries that can only run in the browser.
