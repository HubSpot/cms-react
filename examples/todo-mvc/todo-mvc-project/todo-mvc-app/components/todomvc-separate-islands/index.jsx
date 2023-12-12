import { SharedIslandReducer } from '@hubspot/cms-components';
import 'todomvc-app-css/index.css';
import { App } from './components/app/app.jsx';
import todoReducer from './store/reducers/todo.js?client';

export default function TodoMVCReactHooks({
  initialTodos = [],
  todoPlaceholder,
}) {
  return (
    <SharedIslandReducer id="todos" value={initialTodos} reducer={todoReducer}>
      <App todoPlaceholder={todoPlaceholder} />
    </SharedIslandReducer>
  );
}
