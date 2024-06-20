# Getting Started Example

The getting started example within this directory covers a variety of key features/components of working with CMS React within a HubSpot website. This guide outlines the specifics of using CMS React primitives such as Modules, Fields, and Islands, as well as integrating third-party dependencies, styling, assets, and setting up local development tooling for your project.

## Setup

### Environment

To set up your development environment to work with CMS React, you’ll need the following:

- A HubSpot account with CMS Free, Starter, Pro, or Enterprise access
- Node.js v18.0 or higher and the associated version of NPM

## Creating and Deploying a CMS React Project

### 1. Clone the Repo

First, clone the CMS React repository:

```bash
git clone https://github.com/HubSpot/cms-react.git
```

CMS React projects have a 3 significant directories:

- `getting-started-project`: The HubSpot project directory that gets uploaded via the Projects system to build and deploy your CMS React code found in the `/src` directory.
- `getting-started-project/src`: A package inside your project directory containing all your assets, styles, components, modules, islands, and any local development tooling you need, such as ESLint, Prettier, TypeScript, etc.
- `getting-started-theme`: This is where your HubL templates and theme configuration lives.

At the root of this example, you will configure any local dev tooling you want, such as ESLint, Prettier, TypeScript, etc.

### 2. Install Dependencies

Navigate to the `cms-react/examples/getting-started` directory in your terminal and run:

```bash
npm install
```

This will install all the local development tooling you need, including `@hubspot/cli`, `@hubspot/cms-dev-server`, and any other dev tooling you configured.

### 3. Local Development

To run this example project locally, navigate to the `getting-started-project/src` directory and run:

```bash
npm run start
```

*This example makes use of a weather API through [RapidAPI](https://rapidapi.com/search?term=weatherapi-com&sortBy=ByRelevance). You will need to go through the process of singing up for this service (free) to fully see this example in action. Once you have an API Key you can add it to `getting-started-project/src/utils.ts` at the `apiKey` constant.*

Then navigate to [http://hslocal.net:3000](http://hslocal.net:3000) to see an index page that links to all your modules. Click on the "local version" of the "Weather" module.

In your local code editor from the `getting-started-project/src` directory open `components/modules/Weather/index.tsx` and change the `city` field default from "Boston" to your local city.

See your changes live update in the browser.

### 4. Uploading and Deploying on HubSpot

Run `hs init` from the root of the repository to configure it to upload to your HubSpot account using your personal access key. When setting up JavaScript assets for the first time, you will need to deactivate and regenerate your personal access key, ensuring it includes `CMS Pages`, `Design Manager`, `Developer Projects`, and `GraphQL Data Fetching` permissions. This will create a `hubspot.config.yaml` file required for both uploading changes and local development. See the [HubSpot CLI documentation](https://developers.hubspot.com/docs/cms/guides/getting-started-with-local-development) for more information.

> **Warning:** If you are using an existing access key from a previous call to `hs init` or `hs auth`, you will need to deactivate and regenerate the access key to include new scopes necessary for local CMS React development.

Navigate back to `/examples/getting-started/` and run:

```bash
npm run deploy
```

This will upload the `getting-started-project` to your HubSpot account. Once uploaded, built, and deployed, you can use your react modules in your website pages just as you would with any other modules.

From the repository root, run:

```bash
npm run upload:hubl
```

This uploads the corresponding example HubL files to your account. You should now be able to create a page from one of the `getting-started-theme` templates and see the output of the React components in the page preview.

### 5. Previewing Local Changes on Proxied Pages

You can preview your local CMS React components inside live HubL-rendered pages. To do this, create a page:

- Go to Website Pages
- Click “Create”, then “Create Website Page"
- Write a page name and click “Create page”
- Switch your active theme to "CMS React - Getting Started Theme" and select one of the templates
- Name the page in the settings tab, then publish and preview it

To proxy that page locally:

- Run the local dev server as described above
- Visit the newly created page in your browser
- Open the sprocket menu and select `Open Local Dev Server`
- Your local JavaScript source changes will appear immediately in the context of the HubL page

## Functionality

This project includes modules, module fields, and islands. Modules are the primary building block of the HubSpot CMS, and Islands enable client-side interactivity for React-powered modules. We have 3 modules:

- **Header**: A React module without islands.
- **Footer**: Another example of a React module without islands.
- **Weather**: A module leveraging our island architecture to fetch and render data from an API client-side, enabling users to change the data they wish to fetch, and formatting dates using a third-party dependency.

In addition to the above, we are using module css to scope our styles to a given file. For more styling options, check out our [Styling example](https://github.com/HubSpot/cms-react/tree/main/examples/styling).
