# Release Log

## 2023-01-19

Type: Security fix

Part of: `@hubspot/cms-components@0.13.11` (and our internal build code that uses that)

Make sure that more globals in inline script elements (like `__hsServerPageUrl`, `__hsSS`, etc) are escaped so that malacious input like `'alert('got you')` or `</script><script>alert('got you')</script>` are fully escaped.

## 2023-01-02

Type: Bug Fix

Part of: `@hubspot/cms-dev-server@0.13.9`

Fixed proxying of root urls

## 2023-01-02

Type: Bug Fix

Part of: `@hubspot/cms-dev-server@0.13.8`

Fixed props passed to a JS partial when proxying a page

## 2023-12-19

Type: Enhancement

Part of: `@hubspot/cms-dev-server@0.13.7`

Change: Add field validation output to console and dev server render

Example Usage: No change, user will see fields validation error overlay when viewing the "module" route in the dev server and errors/warnings in the developer console for proxy and module routes.
[Field Validation - Watch Video](https://www.loom.com/share/c6c524f1037e406aa8df52449b23c40f)

[![Field validation thumbnail](https://cdn.loom.com/sessions/thumbnails/private/c6c524f1037e406aa8df52449b23c40f-with-play.gif?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9jZG4ubG9vbS5jb20vc2Vzc2lvbnMvdGh1bWJuYWlscy9wcml2YXRlL2M2YzUyNGYxMDM3ZTQwNmFhOGRmNTI0NDliMjNjNDBmLXdpdGgtcGxheS5naWYiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3MDQ0NzAwMTh9fX1dfQ__&Key-Pair-Id=APKAJQIC5BGSW7XXK7FQ&Signature=OoiPLEn8t8I%7EZ9o7jkOq67dpo3nQB92FZvTcEzwjtby5EUr7CF97psC3HjxrL-v51VCH1f1e28fQXrxNxCbFqylFOxGWceqoef8FwHQew08r3V-CtnHkyLjC63gBGz9egvl12WeMUooYmo4WhCMOh7gpSniEPicfgNqHmnnXndlcjSvdylVyvjSsSj598u6lGnD1YEqYXKgZzY75MxC9ifjqg4mKylaQf7kqDFhcwx1xCXVzpLm5Q3lalMNmVNQ9a33GTTpUWe6gww0BrUviwNvI3mgWn9UY1KY8DSewHh%7E8iM%7EQV%7EfTRHwIyMUvBuQ8eJ6u1cy9t9N0qYNSx9ybQw__)](https://www.loom.com/share/c6c524f1037e406aa8df52449b23c40f)

---

Type: Bug Fix

Part of: `@hubspot/cms-dev-server@0.13.6`

Change: Fix prop shape for GraphQL query data result for use with Storybook.

---

Type: Security Fix, Enhancement

Part of: Platform Release

Change: Ensure that serialized island props have `</script>` escaped to prevent XSS attacks with user generated content that maliciously closes the inline script block and tries to inject JS code.

## 2023-12-06

Type: Bug Fix

Part of: `@hubspot/cms-components@0.13.0`

Fix `<ImageField>`, `<EmbedField>`, and others to take a `resizable` prop instead of the incorrect "resizeable" spelling.

## 2023-11-14

Type: Enhancement

Part of: `@hubspot/cms-components@0.12.0`

Change: Add `Audio` field component for new `audioplayer` field type

## 2023-11-08

Type: Bug Fix

Part of: `@hubspot/cms-components@0.11.3`

Change: Add support for `propertyAliasesPaths`

Example Usage: When defining fields one can use the new property like so:

```jsx
  <ColorField
    name="test"
    label="test label"
    propertyAliasesPaths={{
      color: ['color'],
    }}
  />
```

Will result in:

```json
 {
    "type": "color",
    "name": "test",
    "label": "test label",
    "aliases_mapping": {
      "property_aliases_paths": {
        "color": [
          "color",
        ],
      },
    },
  }
```

---

Type: Enhancement

Part of: `@hubspot/cms-components@0.11.1`

Change: Added `<RichTextFieldWrapper />` component.

Example Usage:

```jsx
import { RichTextFieldWrapper } from '@hubspot/cms-components';

function SomeTextComponent({ fieldValues }) {
  const { richTextFieldName: richTextValue } = fieldValues;

  return (
    <RichTextFieldWrapper

      // Pass in a rich text field's value
      fieldValue={richTextValue}

      // optional, changes the wrapper element (defaults to div)
      tag="article"

      // Also supports other standard React attributes for HTML
      // like id, className, on*,   style, data-*, aria-*, etc
    />
  );
}
```

All props other than `fieldValue` and `tag` are applied to the `tag` element as HTML Attributes.

---

Type: Bug Fix

Part of: `@hubspot/cms-components@0.11.1`

Change: Add support for `inheritedValueDefaultValuePath` and `inheritedValuePropertyValuePaths` within Fields definitions.

Example Usage: When defining fields one can use the two new properties like so:

```jsx
  <TextField
    name="test"
    label="test label"
    inheritedValueDefaultValuePath="fields.bodyFont"
    inheritedValuePropertyValuePaths={{
      color: 'module.secondary_color.color',
    }}
  />
```

Will result in:

```json
 {
    "name": "test",
    "inherited_value": {
      "default_value_path": "fields.bodyFont",
      "property_value_paths": {
        "color": "module.secondary_color.color",
      },
    },
    ...
  }
```

---

Type: Enhancement

Part of: `@hubspot/cms-components@0.11.0`

Added secrets integration. See [documentation](https://github.hubspot.com/cms-js-building-block-examples/reference/secrets.html) for more information and example usage

## 2023-10-16

Type: Small tweak

Part of: `@hubspot/cms-components@0.10.4`

Added `data-hs-island` attribute to island wrapper elements.

---

Type: Bug Fix

Part of: `@hubspot/cms-components@0.10.3`

Change: Support `locked` in FieldGroup and RepeatedFieldGroup

---

Type: Bug Fix

Part of: `@hubspot/cms-components@0.10.3`

Change: Support `helpText` and `inlineHelpText` in `FieldGroup` and `RepeatedFieldGroup`

## 2023-10-02

Type: Bug Fix

Part of: `@hubspot/cms-components@0.10.2`

Change: Correct types for SpacingLimitType, SpacingValueType, and Advanced Visibility

---

Type: Bug Fix

Part of: `@hubspot/cms-components@0.10.2`

Change: Add support for visibility in RepeatedFieldGroup

---

Type: Enhancement

Part of: `@hubspot/cms-components@0.10.2`

Change: Add `useIsDebug`, `logInfoDebugOnly`, `logWarnDebugOnly`, and `logErrorDebugOnly`

Example Usage: When visiting your page, `useIsDebug` will return true and the logging functions with log when you set `hsDebug` to true in your query parameters. e.g. "mydomain.com/home?hsDebug=true". Note that use of `hsDebug` will disable pre-rendering for that page while it is in use.

```javascript
import { useIsDebug, logInfoDebugOnly } from '@hubspot/cms-components'

function PicardComponent() {
  const isDebug = useIsDebug();

  const picardCommand = isDebug ? 'make it so' : 'engage';

  return (
    <>
      <h1>{`${picardCommand}`}</h1>
    </>
  );
}

const TestLogInfoDebugComponent = ({ logArgs }) => {
  logInfoDebugOnly(...logArgs);

  return null;
};
```

---

Type: Bug Fix

Part of: `@hubspot/cms-dev-server@0.10.1`

Change: Add babel macros support to storybook server

## 2023-09-26

Type: Enhancement

Part of: `@hubspot/cms-dev-server@0.10.0`

Added `help/--help` command to the development server.

Example usage:

```sh
>hs-cms-dev-server help

              HubSpot CMS Dev Server

Usage: hs-cms-dev-server <path> [options]

Mandatory:
    <path>                  Path to the directory containing your assets.

Options:
    -c, --config            Path to alternate hubspot.config.yaml configuration.
    -a, --account           The account name or id to use for the dev server.
    --ssl                   Enables SSL for the dev server, serving it over an https:// URL.
    --storybook             Launches a Storybook dev server.

For more information on HubSpot CMS JS Rendering, visit:
https://github.hubspot.com/cms-js-building-block-examples/

```

---

Type: Bug Fix

Part of: `@hubspot/cms-components@0.10.0`

Change: Add support for visibility in FieldGroup

---

Type: Bug Fix

Part of: `@hubspot/cms-components@0.10.0`

Change: Add support for `limits` for the "Spacing" field type.

---

Type: Bug Fix

Part of: `@hubspot/cms-components@0.10.0`

Change: Add support for `resizable`, `show_advanced_options`, and `show_preview` for the "Video" field type.

---

Type: Enhancement

Part of: Platform Release

Change: Added support for `meta.json` icons via file imports

Example usage:

``` javascript
import reactIcon from './react-icon.svg';

export const meta = {
  label: `Module`,
  icon: reactIcon,
};
```
