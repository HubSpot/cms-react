# Third-party dependencies

JS modules and JS partials can depend on public third-party NPM dependencies inside and outside of Islands. Dependency code will only be bundled and sent to the client if it is referenced from an Island. You can specify a package and version in the `dependencies` field of your `package.json` within your asset package that will be used in the project build. Note that the build process runs a `production` installation of dependencies, so `devDependencies` will not be included.

If you use parts of our API from `@hubspot/cms-components` such as `Island`, you can specify a `dependencies` version to use in your build. If no [semver range](https://github.com/npm/node-semver#versions) is included in the version, a `^` range will be added to ensure future builds pick up patch releases to `@hubspot/cms-components` without breaking changes.
