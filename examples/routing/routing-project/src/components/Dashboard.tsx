import pageStyles from '../styles/page.module.css';
import Hero from './Hero.tsx';

export default function Dashboard() {
  return (
    <main className={pageStyles.page}>
      <Hero>
        <h1>Dashboard</h1>
      </Hero>
    </main>
  );
}
