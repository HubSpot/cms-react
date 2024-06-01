import React from 'react';
import pageStyles from '../styles/page.module.css';

export default function About() {
  return (
    <main className={pageStyles.page}>
      <div className={pageStyles.hero} style={{ background: '#ff7a59' }}>
        <h1>About</h1>
      </div>
    </main>
  );
}
