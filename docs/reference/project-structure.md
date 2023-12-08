# Project Structure

This is the top-level structure to be used for JS rendering projects:

```
project-folder/
│
├── js-package/
│   ├── components/
│   │   ├── partials/
│   │   └── modules/
│   ├── cms-assets.json
│   └── package.json
│
├── … optionally other project components …
│
└── hsproject.json
```

A `hsproject.json` file must be inside the root of your project folder in order for `hs project upload` to recognize your project. A `cms-assets.json` file must be inside of your JavaScript asset package subfolder so that the project build can recognize and correctly build your JS components.

CMS JS Building Blocks introduces the “CMS assets” project component alongside private apps, CRM extensions, and serverless functions. To learn more about HubSpot projects, you can check out the [projects beta documentation](https://developers.hubspot.com/docs/platform/build-and-deploy-using-hubspot-projects).

:::info Note
The linked documentation notes that "Create a project (BETA)" is available for "Sales Hub" and "Service Hub" enterprise. JS Building Blocks within the CMS is available for all tiers and therefore so is use of the Projects system to support them.
:::

Building and deploying is straightforward. A project can be uploaded for build and deploy with the `hs project upload` command. The command can be run in the root of a project with no argument or a directory path can be passed i.e. `hs project upload path/to/project`.

The command will kick off a build for your project. If you have "auto deploy" configured for the project it will deploy the build if successful. Projects that are not configured for "auto deploy" can be deployed via the command line with `hs project deploy`. More info is available with `hs project --help`.

Project information is available in the HubSpot app at [app.hubspot.com/l/developer-projects](https://app.hubspot.com/l/developer-projects). Clicking into a project will give you history of project activity with previous builds and deploys. Clicking "View all activity" will given a list of all previous builds and deploys. You can deploy an old build of a project by clicking "View details" of a build from the project activity view. From the project build view you can click "deploy this build" to deploy that specific build into production.

The examples in this repo have both a "CMS Assets" project component and a "HubL Theme" within them. This illustrates one way a developer might organize code, but a "HubL Theme" and a "CMS Asset Project Component" are currently two decoupled concepts in HubSpot. The top-level configuration in each example is added for convenience to get started, especially the scripts in the `package.json`.
