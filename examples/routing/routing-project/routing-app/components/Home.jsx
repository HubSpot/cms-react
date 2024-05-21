import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main>
      <h1>Home</h1>
      <p>
        <Link to={'/about'}>About</Link>
      </p>
    </main>
  );
}
