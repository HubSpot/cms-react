# Data Fetching

Getting content and data into your React modules partials can take many forms as the sources are varied and nuanced.

## Server Side

### GraphQL

GraphQL (pro/enterprise) currently exposes the following internal HubSpot data:

* HubDB
* CRM Objects
* Blog
* *Coming Soon* - Knowlege Base

Visit https://app.hubspot.com/graphiql/[portal-id] to explore your schema.

In an ideal world the HubSpot GraphQL integration would be the go to for getting all of your HubSpot content into React components. Currently however, GraphQL only supports what is listed above - refer to the [GraphQL](./js-modules#graphql) documentation. There are some key advantages to using the GraphQL integration with React modules.

- Co-located Query and Component
- One single Query for needed associations e.g. contact->company
- Tight coupling with prerendering: updates to the query or relevant data will update any pages containing the query

### hublParameters

At the template level you can pass information accessed in the HubL context to your React Module. Within your react component you can access this information via `props.hublParameters`.

```handlebars
{% module "contact_profile"
    path="@projects/contact-profile-project/contact-profile-app/components/modules/ContactProfile",
    firstName="{{contact.firstname}}",
    lastName="{{contact.lastname}}",
    email="{{contact.email}}" %}
```

And then on the React side:

```jsx
// contact-profile-project/contact-profile-app/components/modules/ContactProfile/index.jsx
export const Component = (props) => {
  return (
    <div>
      <span>{props.hublParameters.firstName}</span>
      <span>{props.hublParameters.lastName}</span>
      <span>{props.hublParameters.email}</span>
    </div>
  )
}
```

Whether you are passing data via the HubL tags or querying via GraphQL these solutions account only for reading data, not for creating or updating data in your HubSpot portal. React modules and partials today don't offer any new avenues for manipulating your HubSpot Data.

### hublDataTemplate

`hublParameters` does not work for cases where modules are added to the page by a marketer via DnD. For this use case there `hublDataTemplate` can be leveraged. See [hublDataTemplate](./js-modules#hublDataTemplate) for more information

### Server Data Fetching with getServerSideProps

"Server Data Fetching" (pro/enterprise) allows developers to export a function `getServerSideProps` from their CMS React Module definition. `getServerSideProps` must return an object with a `serverSideProps` property and a `cacheConfig` property which configures caching of the module. In the React component the information returned in `serverSideProps` can be accessed via `props.serverSideProps`.

#### Dependency Helpers

In Data Fetching scenarios, you often need to fetch specific data based on various dependencies such as URLs, query parameters, or the HubSpot Contact object. The utility functions `withModuleProps`, `withUrlPath`, `withUrlAndQuery`, and `withContact` help wrap your data-fetching functions and automatically inject relevant dependencies (with TypeScript types). These helpers ensure that your module has the necessary context to fetch and process data effectively.

##### `withModuleProps`

**Purpose:**
Wraps a function to provide module properties without any additional dependencies. Access to `fieldValues`, `hublData`, `dataQueryResult` etc is available.

**Usage:**

```typescript
import { withModuleProps } from 'path/to/helpers';

const fetchData = (props: ModulePropsWithoutSSP) => {
  // Your data fetching logic
};

export const getServerSideProps = withModuleProps(fetchData);
```

##### `withUrlPath`

**Purpose:**
Wraps a function to provide the module properties along with a URL without query parameters. Everything that was present in `withModuleProps`, plus the page URL without the query parameters. Caching at the module level is partly based on the props and dependencies used in data fetching. Specifying you only need the URL and not the Query can optimize that caching as it will not create new cache records for every query param variation.

**Usage:**

```typescript
import { withUrlPath } from 'path/to/helpers';

const fetchData = (props: ModulePropsWithoutSSP, { url }: { url: URLWithoutQuery }) => {
  // Your data fetching logic
};

export const getServerSideProps = withUrlPath(fetchData);
```

##### `withUrlAndQuery`

**Purpose:**
Wraps a function to provide the module properties along with a URL including query parameters. Building on `withUrlPath`, the passed extra dependency will have the query parameters as well. As stated above a new cache record will be created for each permutation the url with query for this module.

**Usage:**

```typescript
import { withUrlAndQuery } from 'path/to/helpers';

const fetchData = (props: ModulePropsWithoutSSP, { url }: { url: URL }) => {
  // Your data fetching logic
};

export const getServerSideProps = withUrlAndQuery(fetchData);
```

##### `withContact`

**Purpose:**
Wraps a function to provide the module properties along with a URL (with query parameters) and a contact. This will pass the url, with the query parameters, and the HubSpot Contact object.

**Usage:**

```typescript
import { withContact } from 'path/to/helpers';

const fetchData = (props: ModulePropsWithoutSSP, { url, contact }: { url: URL; contact: Contact }) => {
  // Your data fetching logic
};

export const getServerSideProps = withContact(fetchData);
```

#### How It Works

Each of these helper functions wraps your data-fetching function and injects the relevant dependencies based on the type of data you need to fetch. This process ensures that your function has the necessary context and dependencies to operate correctly, streamlining your data-fetching logic and maintaining consistency across your modules.

For example, when you use `withUrlPath`, the wrapped function will receive a URL without query parameters, making it easy to fetch data based on the path alone. Similarly, `withContact` ensures that your function has access to both the URL, query, and contact information, allowing for more complex data-fetching scenarios.

#### Caching

Under the hood, the use of `getServerSideProps` introduces a new architecture which creates a cache between our edge CDN and data center where we render the React Modules. This caching strategy is outside our current [prerendering strategy](https://developers.hubspot.com/docs/cms/developer-reference/cdn/prerendering). This means that other parts of the page beside the module can be statically prerendered and the module itself can always be dynamic or cached by caching rules the developer defines. We have set a default 10 second cache (`Cache-control: max-age=10`) for these Data Fetching modules.

Cache "keys" are based on the following:

* Project Build Number
* Module Props
  * This includes fieldValues, hublData, dataQueryResult etc..
* Injected dependency values
  * For example if `withUrlPath` is used a unique cache key will be created each time the module is rendered within a page of a new URL path.

Knowing this, if you hadn't made changes to any data flowing into the module, but still wanted to bust the cache, a new project build would suffice.

The `caching` property that is returned from `getServerSideProps` currently has one property `cacheControl`. This represents the `Cache-Control` header, and the properties can be any of the standard directives.

```typescript
import { withModuleProps } from 'path/to/helpers';

const fetchData = async (props: ModulePropsWithoutSSP) => {
  // Your data fetching logic
  const results = await fetch(...).then(response => response.json())

  return {
    serverSideProps: {
      results
    },
    caching: {
      cacheControl: {
        maxAge: 60
      }
    }
  }
};

export const getServerSideProps = withModuleProps(fetchData);
```

In the above example the module will be cached for 60 seconds, and any request after that will trigger a re-cache.

In local development the module is rendered on the developers machine, and so no caching is at play.

## Client Side

### HubSpot Data

As was the case without CMS React components, you can make use of public APIs to fetch your HubSpot data from the browser. While these new components don't offer any HubSpot specific tools for data fetching on the client, we think the introduction of [Islands](./islands) will allow for more optimized and ergonomic client side data fetching. Relative to updating your HubSpot data - the recommended path would still be to implement a [Serverless Function](https://developers.hubspot.com/docs/cms/data/serverless-functions) that is responsible for securely making calls to HubSpot APIs. The serverless function would then expose an endpoint to respond to requests to from the client.

### External Content

Similar to the client side HubSpot Content scenario there is no real "change" in in terms of what is possible for fetching data on the client.
