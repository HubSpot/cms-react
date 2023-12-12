# JS Partials

Similar to [global partials](https://developers.hubspot.com/docs/cms/building-blocks/global-content#global-partials-vs-global-modules), JavaScript partials are “slices” of your page that can be replaced with React. These can be used globally within HubL. Partials must be located in the `components/partials/` subdirectory of the JavaScript project component. For instance, if you have a file `components/partials/Header.jsx`, which default exports a React component, then you can include it in your project HubL like so:

```
{% js_partial
   path="@projects/project-folder/js-package/components/partials/Header.jsx"
   pageTitle="My page"
%}
```

Any parameters passed to `js_partial` alongside the `path` will be available within the React component as props.

## Directory Structure Requirements

A JS Partial file can live at either of the following paths, using the directory or file name as the partial name:

`/components/partials/ExamplePartial/index.js`

```
js-package/
└── components/
    └── partials/
        └── ExamplePartial/
            └── index.jsx
```

`/components/partials/ExamplePartial.jsx`

```
js-package/
└── components/
    └── partials/
        └── ExamplePartial.jsx
```

Regardless of the path you chose, the file (i.e. either `ExamplePartial/index.jsx` or `ExamplePartial.jsx`) must contain a default export of your component.
