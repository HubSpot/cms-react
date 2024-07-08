# @hubspot/cms-components

`@hubspot/cms-components` is a runtime library providing primitives to interact with CMS React features and other HubSpot data from your components.

## Getters

### `getHubID`

`( ) => number`

Returns the the current account ID (“Hub ID” or “portal ID”) for the page being rendered

### `getIsDeployed`

`( ) => boolean`

Returns `true` for components rendered live for a deployed project and `false` when rendering in the dev server.

### `getSecret`

`(secretName: string) => string`

Returns a value for a given secret key. The secret must be defined using `hs secrets` in the CLI and the key must be included in a `secretNames` array in your `cms-assets.json` configuration. To prevent accidentally leaking secrets, `getSecret()`:
  - **Cannot** be called at the top-level of a module
  - **Cannot** be called from inside an island

In other words, `getSecert` _must be called from_ a React component function that is rendered on the server. And if you want to pass a secret to client-side code—which makes it available public "view-source" viewing—you must explicitly pass the secret string via an island prop.

See the [Secrets section](./secrets) for more information on usage.

## Hooks

We provide a number of React hooks from the `@hubspot/cms-components` package to help write components that run on both the server and the browser.

### `useAfterIslandHydration`

`( ) => boolean`

Will return `true` only after hydration is completed. More specifically it will:

- Return `false` during the initial render on the server.
- Return `false` during the first render that happens inside the browser.
- Return `true` during any subsequent renders that happen after the component has been “mounted” in the browser.

This hook is useful because React requires server-rendered HTML to match the initial client render. See the [Server/Client Rendering section](../appendix#server-side-client-side-rendering) in the appendix for more information.

### `￼useIsServerRender`

`( ) => boolean`

Returns `true` while the component is being rendered on the server and `false` in the browser. Note, in most cases it is better to use `useAfterIslandHydration()`, since it makes it easier for your code to “do the right thing” for hydration.

### `usePageUrl`

`( ) => URL`

Returns the current page [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL). Works on server and is reactive to changes to the URL on client. This can be useful when components need to react to URL changes, such as query params, while also supporting server rendering. To programmatically trigger non-navigation URL changes, use `pushHistoryState()` which is identical to `window.history.pushState()` but integrates with `usePageUrl()` to ensure it receives change events.

### `useInlineHeadAsset`

`(renderFunc: () => JSX.Element) => void`

Provides an API to pass HTML to render in the `<head>`. This is most useful for collecting CSS from CSS-in-JS libraries and including the emitted CSS in the initial page response. See [Styling](./styling) for more details.

### `useSharedIslandState`

```javascript
const [sharedState, updateSharedState, sharedStateID] = useSharedIslandState();
```

Returns an object of state shared multiple islands and updater function. It works similarly to `useState`, but updating the state via `updateSharedState(newValue)` will "reach across" and update all of the other islands that also use `useSharedIslandState()`. Works in coordination with the `SharedIslandState` component.

### `useSharedIslandReducer`

```javascript
const [sharedState, dispatch] = useSharedIslandReducer();
```

Returns an object of state shared multiple islands and a dispatch function. It works similarly to `useReducer`, but actions dispatched will "reach across" and update all of the other islands that also use `useSharedIslandReducer()`. Works in coordination with the `SharedIslandReducer` component.

## Components

### `<Island>`

See the [Islands](./islands) section for details.

### `<SharedIslandState>`

Defines the initial value for the shared state accessed in `useSharedIslandState()` by other islands in this JS module or partial. All islands that are are "wrapped" by `SharedIslandState` (i.e. are children or descendents of the children) will share a single state reference. Note, `SharedIslandState` must be rendered on the server and cannot be contained inside an island.

```javascript
<SharedIslandState value={...}>
  …
</SharedIslandState>
```

### `<SharedIslandReducer>`

Defines the reducer function and initial value for the shared reducer state accessed in `useSharedIslandReducer()` by other islands in this JS module or partial. All islands that are are "wrapped" by `SharedIslandReducer` (i.e. are children or descendents of the children) will share a single state reference and dispatch function. Note, `SharedIslandReducer` must be rendered on the server and cannot be contained inside an island and the reducer function passed in must imported with the `?client` suffix (which will automatically prepare code-split that function for the browser to grab it).

```javascript
import reducerFuncReference from '../path/to/reducerFunc.js?client';
<SharedIslandReducer value={...} reducer={reducerFuncReference} >
  …
</SharedIslandReducer>

// reducerFunc.js
export default function reducerFunc(state, action) {
  if (action.type === 'increment') {
    state = {
      ...state,
      new: ‘state value’
    };
  }

  return state;
}
```

## Field Helper Components

The following components are designed to be used with associated module field definitions. They cannot be used for non-field related use cases.

If an associated field is not found at the provided `fieldPath` then the components will render null.

### Icon

#### @hubspot/cms-components/Icon

The Icon component renders a SVG for a referenced Icon field.

##### Props

###### fieldPath

type: `string`

The path of the icon field to render

Examples:

- Top level `fieldPath="icon_field"`

- Nested in a group: `fieldPath="group_field.icon_field"`

- Repeater field: `fieldPath="icon_field[1]"`

- Repeater group field: `fieldPath="group_field[0].icon_field"`

###### iconPurpose

type: `'SEMANTIC' | 'DECORATIVE'`

default: `SEMANTIC`

`SEMANTIC` will set the `role="img"` attribute on the svg, as well as `aria-labelledby` pointing to the [title](#title) element

###### Title

type: `string`

If provided, will render a `<title>` tag within the SVG for accessibilty to be described by `aria-labelledby` via [iconPurpose](#iconpurpose)

###### iconStyle

type: `'REGULAR' | 'SOLID' | 'LIGHT'`

If provided, overrides the default icon style associated with the field. Not all icons have every style. Will only use the override if the icon style exists.

###### SVG element attributes

This component also accepts all valid attributes for an SVG element and will apply them, such as `id`, `style`, etc.

##### Example Usage

```javascript
import { Icon } from '@hubspot/cms-components';

export function Component() {
  return <Icon fieldPath="icon_field" height={10} />;
}

export const meta = {
  label: `Icon Module`,
};

export const fields = [
  {
    type: 'icon',
    default: {
      name: 'Alternate Level Up',
      unicode: 'f3bf',
      type: 'SOLID',
    },
    icon_set: 'fontawesome-5.14.0',
    label: 'Icon',
    name: 'icon_field',
  },
];
```

### RichText

#### @hubspot/cms-components/RichText

The RichText component handles inserting the RichText HTML into your DOM.

##### Props

###### fieldPath

type: `string`

The path of the Rich Text field to render

###### tag

The tag used as the wrapping element for the content.

default: `div`

###### Element attributes

This component passes through all valid attributes to the wrapper tag and applies them, such as `id`, `style`, etc.

##### Example Usage

```javascript
import { RichText } from '@hubspot/cms-components';

export function Component() {
  return <RichText fieldPath="richtext_field" tag="span" />;
}

export const meta = {
  label: `RichText Module`,
};

export const fields = [
  {
    type: 'richtext',
    label: 'Rich text',
    name: 'richtext_field',
    default: '<p><em><strong>Helllo, world!</strong></em></p>',
  },
];
```

### Cta

#### @hubspot/cms-components/Cta

The Cta component inserts Cta HTML into the DOM.

##### Props

###### fieldPath

type: `string`

The path of the Cta field to render

###### tag

The tag used as the wrapping element for the content.

default: `div`

###### Element attributes

This component passes through all valid attributes to the wrapper tag and applies them, such as `id`, `style`, etc.

##### Example Usage

```javascript
import { Cta } from '@hubspot/cms-components';

export function Component() {
  return <Cta fieldPath="cta_field" />;
}

export const meta = {
  label: `CTA Module`,
};

export const fields = [
  {
    type: 'cta',
    label: 'CTA',
    name: 'cta_field',
    default: '13bcd0b3-5192-4570-baff-9a779df01bd8',
  },
];
```

### Form

#### @hubspot/cms-components/Form

The Form field helper component inserts the HubL Form HTML into the DOM.

##### Props

###### fieldPath

type: `string`

The path of the Form field to render

###### tag

The tag used as the wrapping element for the content.

default: `div`

###### Element attributes

This component passes through all valid attributes to the wrapper tag and applies them, such as `id`, `style`, etc.

##### Example Usage

```javascript
import { Form } from '@hubspot/cms-components';

export function Component() {
  return <Form fieldPath="form_field" />;
}

export const meta = {
  label: `Form Module`,
};

export const fields = [
  {
    type: 'form',
    default: {
      form_id: '56208269-add7-458d-b514-7f215e6ad98c',
      message: 'Thanks for submitting the form.',
    },
    label: 'Form',
    name: 'form_field',
  },
];
```

### Menu

#### @hubspot/cms-components/Menu

The Menu field helper component inserts the HubL menu HTML into the DOM.

##### Props

###### fieldPath

type: `string`

The path of the Menu field to render

###### tag

The tag used as the wrapping element for the content.

default: `div`

###### Element attributes

This component passes through all valid attributes to the wrapper tag and applies them, such as `id`, `style`, etc.

##### Example Usage

```javascript
import { Menu } from '@hubspot/cms-components';

export function Component() {
  return <Menu fieldPath="my_menu_field" />;
}

export const meta = {
  label: `Menu Module`,
};

export const fields = [
  {
    type: 'menu',
    default: 57978762829,
    label: 'Menu',
    name: 'my_menu_field',
  },
];
```
