# Secrets

JS building blocks integrate with the same secrets store used by [HubSpot serverless functions](https://developers.hubspot.com/docs/cms/data/serverless-functions#secrets) to receive sensitive data.

To start using secrets, store secret values using `hs secrets add` in the HubSpot CLI, then add the names of secrets used by your components to a `secretNames` array in your `cms-assets.json` config. For example:

```json
// cms-assets.json
{
  "label": "My CMS project",
  "secretNames": ["TEST_SECRET"]
}
```

To access the secret, `@hubspot/cms-components` exports a `getSecret()` function to return a given secret's value. To prevent accidentally leaking  secrets, `getSecret()` can only be called from components executed on the server and not from the browser (i.e. within an island). If a secret value isn't sensitive and you need to access it in island components, you may call `getSecret()` outside the island and pass the value down via a prop.
```javascript
import { getSecret } from '@hubspot/cms-components';

// ...

// in a React component outside of an island
const mySecretValue = getSecret('TEST_SECRET');
```

## Secrets in local development

To make secrets available with local development via `@hubspot/cms-dev-server`, create a `.env` file to define secret values for local use only. Keys in this file need to be prefixed with `HS_` to be recognized by the dev server as secrets, for example:

```
// .env
HS_TEST_SECRET=localsecretvalue
```

This secret will be accessible locally by `getSecret('TEST_SECRET')`.
