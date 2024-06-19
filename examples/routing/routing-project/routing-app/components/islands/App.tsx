import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import {
  useIsServerRender,
  usePageUrl,
  useBasePath,
} from '@hubspot/cms-components';
import Header from '../Header.tsx';
import Pokedex from '../Pokedex.tsx';
import Pokemon from '../Pokemon.tsx';
import Home from '../Home.tsx';
import { pokemonList } from '../../constants.ts';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokemon" element={<Pokedex pokemonList={pokemonList} />} />
      <Route
        path="/pokemon/:name"
        element={<Pokemon pokemonList={pokemonList} />}
      />
    </Routes>
  );
};

const App = () => {
  const isServerRender = useIsServerRender();
  const pageUrl = usePageUrl();
  const basePath = useBasePath();

  let app: JSX.Element;

  if (isServerRender) {
    app = (
      <StaticRouter basename={basePath} location={pageUrl.pathname}>
        <Header />
        <AppRoutes />
      </StaticRouter>
    );
  } else {
    app = (
      <BrowserRouter basename={basePath}>
        <Header />
        <AppRoutes />
      </BrowserRouter>
    );
  }

  return app;
};

export default App;
