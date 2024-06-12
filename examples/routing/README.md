# Routing
With CMS React, you can use popular routing libraries like React-Router to enable SPA-style routing within your CMS website. The Pokedex example in this directory showcases how to set up SPA routing in your own project using React-Router. This documentation will walk through key aspects of our example, but for more information on React-Router, please visit their [docs](https://reactrouter.com/en/main).

## Reference Files
### `App.tsx`
This component is where we set up our routes using `react-router-dom` components. The idea is to define which components should render for given paths, resulting in individual pages for each route. The `AppRoutes` component within this file sets up our paths using both static and dynamic routes.

#### Static Routes
```js
const AppRoutes = () => {
  return (
    <Routes>
      {/* Static Route for Home */}
      <Route path="/" element={<Home />} />
      {/* Static Route for Pokedex */}
      <Route path="/pokedex" element={<Pokedex pokemonList={pokemonList} />} />
      {/* Dynamic Route for individual Pokemon */}
      <Route
        path="/pokedex/:name"
        element={<Pokemon pokemonList={pokemonList} />}
      />
    </Routes>
  );
};
```

In the first route `<Route path="/" element={<Home />}` />, we explicitly tell React-Router to render the `<Home />` component at the `/` path. This means that when a user visits `your-website.com/`, they will see a home page rendered by the `<Home />` component. The final `<Route />` component leverages [React-Router's dynamic segments](https://reactrouter.com/en/main/route/route#dynamic-segments). As you can see in the example above, the path `/pokedex/:name` includes `:name` which is our dynamic segment. This allows us to render different content based on the value of `:name` at render time.

Once our routes are setup, we need to update our `<Pokemon />` component to know what pokemon page to render. As you can see in the example below `useParams` extracts the dynamic segment (:name) from the URL, and we use it to find the corresponding Pokemon in our pokemonList.

```js
import { Link, useParams } from 'react-router-dom';

export default function Pokemon({ pokemonList }: { pokemonList: any }) {
  const params = useParams();
  const pokemon = pokemonList.find((pokemon) => pokemon.name === params.name);

  return (
    <main className={pageStyles.page}>
      <h1>Profile</h1>
      <ProfileCard pokemon={pokemon} />
      <div className={pageStyles.back}>
        <Link to="/pokedex">Back to Pokedex</Link>
      </div>
    </main>
  );
}
```

`Router/index.tsx`
To integrate the App.tsx router component into your website, import it with the `?island` suffix and pass it to the module prop of the `<Island />` component. This setup ensures that the necessary JavaScript is sent down to enable routing via React-Router. See example below:

```js
import AppIsland from './App?island';

export const Component = () => {
  return <Island module={AppIsland} />;
};
```

And that's all it takes to implement SPA routing for your CMS React project pages!
