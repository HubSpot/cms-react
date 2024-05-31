import React from 'react';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';

import {
  useIsServerRender,
  usePageUrl,
  useBasePath,
  logInfo,
} from '@hubspot/cms-components';

function Home() {
  return (
    <main>
      <h1>Home</h1>
      <p>
        <Link to={'/about'}>About</Link>
      </p>
    </main>
  );
}

function About() {
  return (
    <main>
      <h1>About</h1>
      <p>
        <Link to={'/home'}>Home</Link>
      </p>
    </main>
  );
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

const App = () => {
  const isServerRender = useIsServerRender();
  const pageUrl = usePageUrl();
  const basePath = useBasePath();

  logInfo(basePath);
  logInfo(pageUrl.pathname);

  let app;

  if (isServerRender) {
    app = (
      <StaticRouter basename={basePath} location={pageUrl.pathname}>
        <AppRoutes />
      </StaticRouter>
    );
  } else {
    app = (
      <BrowserRouter basename={basePath}>
        <AppRoutes />
      </BrowserRouter>
    );
  }

  return app;
};

export default App;
