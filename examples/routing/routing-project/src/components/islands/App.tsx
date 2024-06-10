import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import {
  useIsServerRender,
  usePageUrl,
  useBasePath,
} from '@hubspot/cms-components';

import Header from '../Header.tsx';
import Dashboard from '../Dashboard.tsx';
import Account from '../Account.tsx';
import Contact from '../Contact.tsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/account" element={<Account />} />
      <Route path="/contact" element={<Contact />} />
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
