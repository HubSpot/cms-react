import { Link } from 'react-router-dom';

export default function About() {
  return (
    <main>
      <h1>About</h1>
      <p>
        <Link to={'/home'}>Home</Link>
      </p>
    </main>
  );
}
