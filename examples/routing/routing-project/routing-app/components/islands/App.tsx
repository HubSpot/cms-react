import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';

import {
  useIsServerRender,
  usePageUrl,
  useBasePath,
  logInfo,
} from '@hubspot/cms-components';

import Home from '../Home.tsx';
import About from '../About.tsx';
import Services from '../Services.tsx';
import Contact from '../Contact.tsx';
import Header from '../Header.tsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

const App = () => {
  const isServerRender = useIsServerRender();
  const pageUrl = usePageUrl();
  const basePath = useBasePath();

  logInfo(basePath);
  logInfo(pageUrl.pathname);

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
