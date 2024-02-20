# Data Fetching

Getting content and data into your React modules partials can take many forms as the sources are varied and nuanced.

## HubSpot Content - Server Side

In an ideal world the HubSpot GraphQL integration would be the go to for getting all of your HubSpot content into React components. Currently however, GraphQL only supports querying HubDB and Custom Objects - refer to the [GraphQL](#graphql) documentation above. There are some key advantages to using the GraphQL integration with React modules.

- Co-located Query and Component
- One single Query for needed associations e.g. contact->company
- Tight coupling with prerendering: updates to the query or relevant data will update any pages containing the query

That said there are other kinds of HubSpot data you might want access to within your components. The best way to accomplish this today is by passing that information from a HubL template to a React component via the `js_partial` or `module` HubL tags. For example:

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

## HubSpot Content - Client Side

As was the case without CMS React components, you can make use of public APIs to fetch your HubSpot data from the browser. While these new components don't offer any HubSpot specific tools for data fetching on the client, we think the introduction of [Islands](#islands) will allow for more optimized and ergonomic client side data fetching. Relative to updating your HubSpot data - the recommended path would still be to implement a [Serverless Function](https://developers.hubspot.com/docs/cms/data/serverless-functions) that is responsible for securely making calls to HubSpot APIs. The serverless function would then expose an endpoint to respond to requests to from the client.

## External Content - Server Side

While there is no pathway for this currently, our goal is to open up a pathway for developers to make asynchronous requests dynamically at render time, including server-side API requests to third-party services. In addition to potential performance benefits, with server-side data fetching a developer can make requests that require secrets or authentication safely. We do not currently have a timeline for when this will be available.

## External Content - Client Side

Similar to the client side HubSpot Content scenario there is no real "change" in in terms of what is possible for fetching data on the client.
