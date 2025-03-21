# HubSpot CMS React

## Documentation

Check out an expanded documentation page at <a href="https://github.hubspot.com/cms-react/" target="_blank">https://github.hubspot.com/cms-react/</a>

## Welcome!

Thank you for taking the time to learn about HubSpot CMS React. As always our goal is to solve for our customers so we welcome any and all feedback. Chat away in [\#cms-react](https://hubspotdev.slack.com/archives/C04AY1H2204) with other HubSpot developers who are pushing forward with developing with React on the Hubspot CMS. If you do not have access to the developer slack, you can request access [here](https://developers.hubspot.com/slack).

## How do React modules on the CMS work?

CMS React Modules and Partials are building blocks you can use to write React and JavaScript instead of HubL inside the HubSpot CMS. Note this doesn’t mean you will switch entirely away from HubL, rather we want to provide a pathway to begin writing React to render on both on the server and client. JS modules and partials are built from React components and can directly be referenced via HubL tags in your templates.

## Can I use React modules on my CMS account?

Yes! Working with React modules is generally available and can be used with all tiers of the CMS, including free.

## [Default React modules](default-react-modules)

This directory contains a copy of all of our internal default React modules. As React modules do not appear in the Design manager, we made them available within this public repository so you can make your own copy and edit as you like. The modules you find in this directory are synced up with our internal code to ensure we keep them up to date.

### What if I don't see a default React module in this repo but that is available for use within Hubspot?
Some default React modules contain code that is internal to Hubspot and thus cannot be used in a general way by external developers. If you are are seeking to utilize one of these modules, or otherwise get a better sense of how it works, please reach out to a developer advocate for more information.

## [React module boilerplate](react-module-boilerplate)

If you'd like to get started with your own React module or one of our defaults, we have provided a boilerplate project for you to pick up and get started right away. This boilerplate comes complete with a Sample module so you can test working with this repo with only a few steps on your part. In order to get working with this boilerplate you simply have to:

- Become familiar with working with our CLI, if you are not already, with our [Hubspot CLI documentation](https://developers.hubspot.com/docs/cms/guides/getting-started)
- Run `hs init` and select your portal.
- Within the react-module-boilerplate/src run `yarn deploy` or `npm deploy`, which is a helper script we offer which runs the `hs project upload` CLI command.
- You will be prompted to create this project in your portal. Confirm and the project will be created.
- Wait a few moments for the deploy to finish. You can view the projects within your portal at `https://app.hubspot.com/developer-projects/{YOUR_PORTAL_ID}`

Once the module is uploaded you should be able to see it when you go to edit a page, adding it like any other module.

## Examples

In this repository is example usage of some of key features of React modules. These examples are are best understood alongside our official <a href="https://github.hubspot.com/cms-react/" target="_blank">docs</a>. You can quickly try things out without any local setup by [opening this repo in Codesandbox.io](https://codesandbox.io/p/sandbox/stoic-pateu-g20chg?file=%2Fcms-react%2FREADME.md).

### [Getting Started](examples/getting-started)

The "Getting Started" example is the most up to date example of CMS React basics. It illustrates the definition and development of Modules with React, uses 3rd party dependencies, islands, and CSS Modules.

### [Hello World](examples/hello-world)

**NOTE:** this is an older example, and [Getting Started](getting-started) is a better first example

The "Hello World" example combines partials, modules, islands and CSS modules for styling to show a more cohesive yet straightforward example of how CMS React components and APIs work together.

### [Styling](examples/styling)

In this example, we take a look at three different approaches to styling React components. This is not an exhaustive list and there are many ways that styles can be organized and implemented.

### [Islands](examples/islands)

Islands are a key concept for React modules in HubSpot. In addition to stitching server-rendered React components into the HTML generated by HubL, JS modules and partials support client-side interactivity with islands. Similar to the islands concept from [Astro](https://astro.build/), [Fresh](https://fresh.deno.dev/), and others, you can add an `<Island />` inside your JS module or partial to automatically code-split and render a component on both the server and client. In addition to allowing you to reuse JavaScript code between the server and browser, islands help you write performant websites by giving you precise control over what JavaScript is shipped to the browser and when it runs.

### [Graphql + Storybook](examples/graphql-storybook)

GraphQL is the future for querying HubSpot data in your CMS pages. As part of JS Modules, a developer can export a GraphQL query string and the Module's root component will then be passed the query result. Additionally we show how a Module that uses GraphQL can be developed using our Storybook integration. This integration will automatically understand the field types of a module and generate controls for a Storybook story.

### [Todo MVC](examples/todo-mvc)

It seems with every new FE technology on the web comes an implemetation of TodoMVC. We didn't want to be left out and ported a recent version that made use of React and React hooks to work as a JS Module with Islands. Additionally there is an example of our `sharedIslandReducer` which provides a redux like interface for sharing state across islands.
