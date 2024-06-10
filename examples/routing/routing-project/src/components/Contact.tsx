import React from 'react';
import pageStyles from '../styles/page.module.css';
import Hero from './Hero.tsx';

export default function Contact() {
  return (
    <main className={pageStyles.page}>
      <Hero size="small">
        <h1>Contact</h1>
      </Hero>
    </main>
  );
}
