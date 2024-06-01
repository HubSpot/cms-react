import React from 'react';
import pageStyles from '../styles/page.module.css';

export default function Home() {
  return (
    <main className={pageStyles.page}>
      <div className={pageStyles.hero} style={{ background: '#ff7a59' }}>
        <h1>Home</h1>
      </div>
    </main>
  );
}
