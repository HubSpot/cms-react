# HubSpot Serverless Functions with CMS React Modules

## Introduction

HubSpot provides two different types of serverless functions: [CMS Serverless Functions](https://developers.hubspot.com/docs/cms/data/serverless-functions/reference) and [Developer Platform Serverless Functions](https://developers.hubspot.com/docs/platform/serverless-functions). While they are similar in many ways, there are some key differences between them. This documentation will help you understand these differences and guide you on how to use them effectively with CMS React Modules.

## CMS Serverless Functions

CMS Serverless Functions were specifically designed to work with the HubSpot CMS. They are tightly integrated with the CMS. You deploy them via the CLI to the Design Manager and can edit them locally or in the Design Manager

### Limitations to CMS Serverless Functions

- CMS Serverless functions do not allow you to add your own dependencies i.e. 3rd party packages.

- Because Developer Platform Serverless functions are defined within a "Private App" they inherit the scopes assigned to that Private App. That level of granular control is not available with CMS Serverless Functions. They rely on storing a personal access token in hs secrets which is then referenced in the serverless function.

## Developer Platform Serverless Functions

Developer Platform Serverless Functions, on the other hand, are part of the broader HubSpot Developer Platform. They are built on projects, the same system that CMS React is built on. Thus a developer may have a single project with a CMS React component as well as a Private App with a serverless function.

Please see an example of a CMS React component along side a Developer Platform Serverless functions here [https://github.com/HubSpot/cms-react/examples/serverless](https://github.com/HubSpot/cms-react/tree/main/examples/serverless)

Looking forward the Developer Platform will offer one system to learn across CRM, CMS, and other parts of Hubspot. Serverless function capabilities can be more easily upgraded overtime by HubSpot due to being tied into the Projects versioning system. Unlocking a better developer experience, security, etc. A unified system for managing secrets. Private apps could also be shared between website and UI Extensions.

### Limitations with Developer Platform Functions

- Currently there is no access to logs for Developer Platform Endpoint functions.

## How to Decide Which To Use

Ultimately we are going to provide a migration path for CMS Serverless Functions to the Developer Platform Serverless functions. At this current moment the limitation on logging may give a CMS Developer pause for using these functions. It is for that reason that we suggest CMS Developers continue to use the CMS Serverless Functions until such time that logging is fully supported in the Developer Platform Serverless Functions.

However, if a developer finds the convenience of a single build system, and access to the 3rd party deps outweighs that limitation the upside will be that they will be ahead of the game in terms of any migrations that might be required.
