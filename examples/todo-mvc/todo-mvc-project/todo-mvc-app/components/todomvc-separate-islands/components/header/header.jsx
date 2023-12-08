import TodoInputIsland from './TodoInput.jsx?island';
import { Island } from '@hubspot/cms-components';

export function Header({ todoPlaceholder }) {
  return (
    <header className="header">
      <h1>todos</h1>

      <Island
        module={TodoInputIsland}
        className="new-todo"
        placeholder={todoPlaceholder}
      />
    </header>
  );
}
