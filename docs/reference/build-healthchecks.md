# Build health checks

To validiate and prevent unexpected production behavior, CMS React will automatically run a series of "health checks" at the end of your build. For now, those health checks are enabled but will not fail your build by default.

Here are the specifc things the health checks look for:

  - For every React partial:
    - Make sure the built partial code can be imported
    - Make sure there is a default export _and_ that it is a React component (a function)

  - For every React module:
    - Make sure the built module code can be imported
    - Make sure there is a `Component` named export _and_ that it is a React component (a function)
    - Make sure there is a `fields` named export _and_ it is a React element (`<ModuleFields>...</ModuleFields>`) or an array
    - Make sure there is a `meta` named export _and_ it is a JavaScript object

  - For any island import (`?island`), client import (`?client`), or dynamic import (`import(...)`) linked from a React module or partial's code:
    - Make sure that code can be imported

<br>

::: info
Currently only failed health checks are logged in the build output _only_ when strict health checks are enabled. In the future we will always output all successful and failed health checks to make it easier to now about failures _before_ enabling strict mode.
:::

### ESM and Common JS "fun"

In addition to verifing React modules and partial definitions, health checks also will uncover problematic ESM ↔ Common JS issues _before_ any code is deployed (what the heck? Learn more about [CJS vs ESM](https://yuzu.health/blog/cjs-vs-esm)). We built CMS React on top of [Vite](https://vitejs.dev/) with the intention of living in a modern JavaScript world, however that can lead to problems when depending on other packages that have misconfigured ESM exports.

And particuarly bad are packages that advertise CJS exports (i.e. `package.json` `export`/`type` stuff) that actually have ESM `import` and `export` syntax in them (for example [`@mui/material@5.15.10`](https://publint.dev/@mui/material@5.15.10)). Because that can lead to situations where Vite's compiler outputs an import to that package's file in a `node_modules/...`, but when that code is run there will be a runtime syntax error. However, with build health checks we make sure to discover that problem at _build-time_ rather than by your visitors at runtime.

Note, we are working toward making solving more of these kind of problems automatically. However, in the mean time build health checks with strict mode enabled are very helpful to prevent this problem from "sneaking" out to production.

### Build health check configuration

If you would like to explicitly configure your project's build health checks, you can do that inside of `cms-assets.json`:

```json
// cms-assets.json
{
  "label": "My CMS project",
  "buildConfig": {
    "healthchecks": {
      "enabled": true,  // default is true
      "strict": true    // default is false (for now)
    }
  }
};
```

