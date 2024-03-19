
# @hubspot/cms-dev-server

## Basic Usage

`@hubspot/cms-dev-server` is a package that allows users to start an Express + Vite dev server enabling an auto-reloading local development workflow that is nearly identical to your deployed components. The `cms-dev-server` also enables rendering local versions of your components on live CMS pages to aid in development.

Users can start the cms-dev-server by running `hs-cms-dev-server /path/to/components-directory` in a project that has `@hubspot/cms-dev-server` installed.

For example, a CMS page with JS rendered components “https://cmssite.com/page" would be accessible by visiting one of:

- http://cmssite.com.hslocal.net:3000/page
- http://cmssite.com.localhost:3000/page

Or by visiting http://hslocal.net:3000/proxy and pasting in the page you want to proxy.

Similar to how previewing a page from the page editor works, you can force the page to render with the context of a contact by passing an `email` parameter. For example `http://cmssite.com.hslocal.net:3000/page?email=bh@hubspot.com` will cause the contact object to be populated based on the email parameter value.

You may also start the dev server with the `--ssl` option, which enables:

- https://cmssite.com.hslocal.net:3000/page
- https://cmssite.com.localhost:3000/page

## Routes

When the CMS Dev Server for CMS React starts it will look at the directory structure and look for `partials` and `modules` within `components`. It will then dynamically create routes based on what it finds there.

### Modules

The CMS Dev Server offers two different rotes for your modules; `/module/[module_name]` and `/preview/module/[module_name]`.

#### `/module/[module_name]`

The `/module/[module_name]` route is rendered entirely locally without talking to the HubSpot backend.

You can work "offline" and "unauthenticated" at this route - with caveats for GraphQL.

Field values that are used are derived entirely from the Field default values and from parameter level overrides. Param level overrides can be passed via `fields` param which expects stringified JSON of fieldValues that matches what is the passed fieldValues prop (matching the fields definition structure).

GraphQL data in this context is fetched from your local machine using your local access token as the auth for the collector service. These queries are cached, but you can bust the cache with the `hsLocalQueryKey` query parameter.

`hublDataTemplate` is not supported at this route.

`hublParams` at this route will always be an empty object `{}`.

`Icon`, `CTA`, and other `@hubspot/cms-component` Field helpers are not supported at this route.

#### `/preview/module/[module_name]`

You need to be "online" and "authenticated" to use this route.

The `/preview/module/[module_name]` route does talk to the HubSpot backend and behaves similarly to viewing a module in the Design Previewer.

Field values that are used rely on defaults as there is no module instance to pull from. There is no `fields` param available here for overrides.

GraphQL data is derived on the BE and there is no query from the local server to the GraphQL service.

`hublDataTemplate` is supported at this route, the assumed context is similar to that of the Design Previewer.

`Icon`, `CTA`, and other `@hubspot/cms-component` Field helpers are supported at this route.

### Partials

The CMS Dev Server offer a route for partials; `/partial/[partial_file_name]`.

Partials are very thin and do not support GraphQL or `hublDataTemplate`. In the context of the dev server `hublParameters` will always be and empty object `{}`.

## Storybook

`cms-dev-server` includes a [Storybook](https://storybook.js.org/) integration. Pass a `--storybook` option when starting the server to start a Storybook instance alongside the built-in dev server. You may then add `.stories.jsx` files alongside your components to build stories for testing or development. At the root http://hslocal.net:3000 page there should be a link to the Storybook UI for your project.
To make building stories for HubSpot modules easier, `cms-dev-server` provides helpers to auto-generate `argTypes` based on module fields. See the [GraphQL and Storybook](https://github.com/HubSpot/cms-react/tree/main/graphql-storybook/gql-storybook-project/gql-storybook-app) example project for usage of `moduleStory()`.
Storybook is built with client components in mind, so components that cross island boundaries can have unexpected lifecycle behavior when rendered in a story. Because server-only components never make it to the browser, they cannot be hot reloaded and a full re-render is necessary to update the server response. To fully emulate hybrid rendering in Storybook at the cost of hot module reloading, you may use `moduleStoryWithIsland()` in your story in place of `moduleStory()`.
