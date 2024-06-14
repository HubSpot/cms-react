# Getting Started Example
The getting started example within this directory covers a variety of key features/components of working with CMS React within a Hubspot website. The following outlines the specifics around using CMS React primitives such as Modules, Fields, and Islands as well as integrating third party dependencies, styling, assets and even setting up local development tooling for your project.

## Setup

### Environment
To setup your development environment to work with CMS React, you’ll first need a few things:

- A HubSpot account with CMS Free, Starter, Pro, or Enterprise access
- Node.js - v16.0 or higher and associated version of NPM

## Creating and Deploying a CMS React Project
### 1. Clone the Repo

First, clone the CMS React repository:

```
git clone https://github.com/HubSpot/cms-react.git
```

CMS React projects have a few significant directories that are worth noting:
- `getting-started-project`: The HubSpot project directory that gets uploaded via the Projects system to build and deploy your CMS React code found in the `/src` directory.
-  `getting-started-project/src`: A package inside your project directory that contains all your assets, styles, components, modules, islands and any local development tooling you desire such as ESLint, Prettier, TypeScript, etc.
- `getting-started-theme`: This is where your HubL templates and theme configuration lives.
At the root of this example is where you will configure any local dev tooling you would like such as eslint, prettier, etc. This example uses ESlint, TypeScript, and Prettier.

### 2. Install dependencies
- Open your terminal and navigate to the `cms-react/examples/getting-started` directory then run `npm install`. This will install all the local development tooling you need like `@hubspot/cli`, `@hubspot/cms-dev-server` and any dev tooling you configured.

### 3. Local development
To run this example project locally, `cd` into the `getting-started-project/src` directory and run `npm run start` then navigate to [http://hslocal.net:3000](http://hslocal.net:3000) to see an index page that links to all your modules/js_partials.

### 4. Uploading and Deploying on HubSpot
Run `hs init` from the root of the repository to configure it to upload to your HubSpot account using your personal access key. When setting up JavaScript assets for the first time, you will need to deactivate and regenerate your personal access key making sure it includes `CMS Pages`, `Design Manager`, `Developer Projects`, and `GraphQL Data Fetching` permissions. This will create a `hubspot.config.yaml` file that is required for both uploading changes and local development. See the [HubSpot CLI documentation](https://developers.hubspot.com/docs/cms/guides/getting-started-with-local-development?__hstc=75491725.e2098b212e147a7b9be6fd756c0c6815.1649440584659.1667397195793.1667489478959.105&__hssc=75491725.4.1667489478959&__hsfp=1149209764#configure-the-local-development-tools) for more information.

> **Warning**
> If you are using an existing access key from a previous call to `hs init` or `hs auth`, you will need to deactivate and regenerate the access key to include new scopes necessary for local CMS React development.

Next double-check you are still in `getting-started/` and run `npm run deploy` to upload the `getting-started-project` to your HubSpot account. Once the project is uploaded, built, and deployed, you will be able to add the modules and partials to your HubSpot templates.

From the repository root, run `npm run upload:hubl` to upload the corresponding example HubL files to your account.

At this point, you should be able to create a page from one of the `getting-started-theme` templates and see the output of the React components included in them in the page preview.

### 5. Previewing local changes on proxied pages

In addition to direct local previews of JS partials and modules, you can preview your local CMS React components inside of live HubL-rendered pages. To do that you first need to create a page:

- Go to Control Center
- Click “Create”, ”Create Landing page”, write a page name, and click “Create page”..
- Switch your active theme to "CMS React - Getting Started Theme", and select one of the templates
- Give that page a name in the settings tab, then publish that page and preview it.

After that, you can proxy that page locally by:

- Running the local dev server as described above
- Visit the newly created page in your browser
- Open the sprocket menu and select `Open Local Dev Server`:
- Your local JavaScript source changes will appear immediately in the context of the HubL page

## Functionality
You will see within this project, we have modules, module fields, and islands. Modules are the primary building block of the HubSpot CMS and Islands are how we enable client side interactivity for React powered modules. We have 3 modules:
- Header
- Footer
- Weather

Header and Footer are good examples of how you can define react modules without islands. Outside of the new JSX syntax and helper [cms-components](https://github.hubspot.com/cms-react/reference/cms-components.html), this should feel familiar if you've developed on the HubSpot CMS prior to CMS React. However, the `Weather` module leverages our island architecture. In this module, we are fetching and rendering data from an API client-side, enabling users to change the local of the data they wish to fetch, and formatting dates using a third party dependency.

In addition to modules, we have many styling options/capabilities that developers are able to use. This example uses module css to allow developers to scope their CSS to a particular file. For more styling options, checkout our [Styling example](https://github.com/HubSpot/cms-react/tree/main/examples/styling).
