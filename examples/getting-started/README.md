# Getting Started Example

The getting started example within this directory covers a variety of key features/components of working with CMS React within a HubSpot website. This guide outlines the specifics of using CMS React primitives such as Modules, Fields, and Islands, as well as integrating third-party dependencies, styling, assets, and setting up local development tooling for your project.

## Setup
### Environment

To set up your development environment to work with CMS React, you’ll need the following:

- A HubSpot account with CMS Free, Starter, Pro, or Enterprise access
- Node.js v18.0 or higher and the associated version of NPM

## Creating and deploying a CMS React project
Before we dive into running your first CMS React project, its important to understand 3 significant directories that you will come across within this example:

- `*-project`: The HubSpot project directory that gets uploaded via the Projects system to build and deploy your CMS React code found in the `/src` directory.
- `*-theme`: This is where your HubL templates and theme configuration lives.
- `*-project/*-app`: A package inside your project directory containing all your assets, styles, components, modules, islands, and any local development tooling you need, such as ESLint, Prettier, TypeScript, etc.

> **Note** The directory naming convention mentioned above is not a requirement for your CMS React project to work, but rather an example of how you could organize your CMS React files.

### Clone the `getting-started` directory
From your local directory for the following commands:

```bash
git clone --filter=blob:none --no-checkout https://github.com/HubSpot/cms-react.git;
cd cms-react;
git sparse-checkout set --cone;
git checkout main;
git sparse-checkout set examples/getting-started;
```

This will clone only the `getting-started` directory from within cms-react repository down to your local file system.

### Setting up your `hubspot.config.yaml` file
In order to develop locally and deploy your code to your HubSpot portal. You will need to configure a `hubspot.config.yaml` file. Run `hs init` from the root of the repository and follow the prompts to setup your `hubspot.config.yaml` file. Keep in mind that when setting up JS assets for the first time, you will need to deactivate and regenerate your personal access key, ensuring it includes `CMS Pages`, `Design Manager` and `Developer Projects` permissions. See the [HubSpot CLI documentation](https://developers.hubspot.com/docs/cms/guides/getting-started-with-local-development) for more information.

> **Warning:** If you are using an existing access key from a previous call to `hs init` or `hs auth`, you will need to deactivate and regenerate the access key to include new scopes necessary for local CMS React development.


### Local development

Now that our `hubspot.config.yaml` file is configured we can get to running and developing our project locally! Let's first install our dependencies. From the root of the `getting-started` directory, run `npm install` in your terminal. This will install all your local dev tooling and any other dependencies found in your project's root package.json file. Next we will also need to run `npm install` from within the `/getting-started-app` directory which will install all dependencies required for our CMS react code. With all of our deps installed, you can now run `npm run start` from the `getting-started-project/getting-started-app` directory.

Once running, open up your browser to [http://hslocal.net:3000](http://hslocal.net:3000) to see the index page that links to all the modules associated to this project. Click on the "local version" of the "Weather" module to see a locally running instance of the module. The locally running instance will pick up any changes you make to your files instantly to streamline the feedback loop when iterating on your CMS components 🚀

Let's give this a test drive by opening up our `Weather` module found at `components/modules/Weather/index.tsx`. From within this file find the `<TextField>` module field. That component has a `default` prop which signifies the starting value of the text field that a marketer will see in the page editor. Change the `default` prop's value to something else and save your changes. Take a look at your locally running instance of the [Weather` module](http://hslocal.net:3000/module/Weather) and it should now reflect your recent changes.

### 4. Uploading and deploying to your portal

With some changes in place, let's deploy our code to your HubSpot portal. Navigate back to the `/getting-started/` directory and run `npm run deploy`. This will upload the `getting-started-project` to your HubSpot account. Once uploaded, built, and deployed, you can use your react modules in your website pages just as you would with any other modules.

From the repository root, run `npm run upload:hubl`. This uploads the corresponding example HubL files to your account. You should now be able to create a page from one of the `getting-started-theme` templates and see the output of the React components in the page preview.


### Making more changes
Let's say we want to show some default data on the initial load instead of forcing users to input a search before seeing weather data rendered. To do this, we can add a new module field for a `defaultCity` that a marketer can use within the context of the page editor to assign the module instance a default city to use at load time.

To start, open the `/components/modules/Weather/index.tsx` in your code editor. Within this file you will see a `fields` variable that contains all of our module fields. These are the fields that a marketer can use to modify data for the Weather module from the WYSIWYG page editor. Since we already have a `TextField` component imported from `@hubspot/cms-components/fields` for our Weather Headline field, all we need to do is add a new `<TextField />` for our defaultCity

```js
<TextField label="Default City" name="defaultCity" default="Boston" />
```

Once this is added, the `Component` export within this same file will now have access to the value of this new field via the `fieldValues` prop. since the `name` property on our `<TextField>` component is `defaultCity` we can pull off this value from the `fieldValues` similarly to how we have for `headline` and add it to our island props like so:

```js
const { defaultCity, headline } = fieldValues;
<Island
  module={WeatherForecast}
  headline={headline}
  defaultCity={defaultCity}
/>
```

The final step is modify our `WeatherForecast` island component to enable the fetching weather data using the `defaultCity` value. To do this we have to make a couple updates:
1. Include `defaultCity` in our props list
2. Update our `WeatherForecastProps` interface to include `defaultCity`
3. Add a `useEffect` that fetches the weather forecast with the `defaultCity` value
4. Add a loading state during a fetch

The final component should resemble the following:

```js
import { useEffect, useState } from 'react';
import weatherStyles from '../../styles/weather.module.css';
import { getWeatherForecast } from '../../utils.ts';
import { WeatherForecast as WeatherForecastType } from '../../constants.ts';
import { CurrentWeatherCard, UpcomingWeatherCard } from '../WeatherCards.tsx';

interface WeatherForecastProps {
  headline: string;
  defaultCity: string; // added defaultCity to the interface
}

export default function WeatherForecast({
  headline,
  defaultCity, // included defaultCity in props list
}: WeatherForecastProps) {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherForecastType>();

  // adding useEffect to fetch weather forecast on component mount
  useEffect(() => {
    getWeatherForecast(defaultCity).then((data) => {
      setWeatherData(data);
    });
  }, []);

  const handleFetchWeather = () => {
    getWeatherForecast(city).then((data) => {
      setWeatherData(data);
    });
  };

  const isFetching: boolean = !weatherData;
  const hasError: boolean = !isFetching && !!weatherData.error;
  const hasWeatherData: boolean =
    !isFetching && !hasError && !!weatherData.forecast;
  const missingData = !isFetching && !hasWeatherData && !hasError;

  function WeatherForecast({ weatherData }) {
    return (
      <>
        <div>
          <CurrentWeatherCard weatherData={weatherData} />
        </div>
        <div className={weatherStyles.cardContainer}>
          <UpcomingWeatherCard weatherData={weatherData} />
        </div>
      </>
    );
  }

  return (
    <div className={weatherStyles.wrapper}>
      <h1>{headline}</h1>
      <div className={weatherStyles.form}>
        <input
          type="text"
          placeholder="Enter city"
          onChange={(event) => setCity(event.target.value)}
        />
        <button onClick={handleFetchWeather}>Update Forecast</button>
      </div>
      <div className={weatherStyles.currentWeather}>
        {isFetching && <h2>Loading...</h2>} {/* add loading state during fetch */}
        {hasError && <h2>Error occurred when fetching weather forecast</h2>}
        {hasWeatherData && <WeatherForecast weatherData={weatherData} />}
        {missingData && (
          <h2>No results found for "{city}", please search another location</h2>
        )}
      </div>
    </div>
  );
}
```

Once you are satisfied with your changes, you only need to re-run `npm run deploy` in order to get the latest react module built and deployed to your portal. Since no HubL files were modified, you **do not** need to re-run `npm run upload:hubl`.

### 5. Previewing Local Changes on Proxied Pages

In addition to locally viewing your modules, you can also preview your local CMS React components inside live HubL-rendered pages. To do this, create a page:

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
