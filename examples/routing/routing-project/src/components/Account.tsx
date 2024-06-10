import React from 'react';
import pageStyles from '../styles/page.module.css';
import Hero from './Hero.tsx';

export default function Account() {
  return (
    <main className={pageStyles.page}>
      <Hero size="small">
        <h1>Account</h1>
      </Hero>
    </main>
  );
}
