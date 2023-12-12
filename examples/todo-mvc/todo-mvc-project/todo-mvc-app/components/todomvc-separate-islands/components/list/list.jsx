import { Item } from '../item/item.jsx';
import { selectVisible } from '../../store/selectors/todo.js';
import { onUpdate, onRemove, onCompleteAll } from '../../store/actions/todo.js';
import useFilterFromURL from '../hooks/useFilterFromURL.js';
import { useSharedIslandReducer } from '@hubspot/cms-components';

export default function List() {
  const [todos, dispatch] = useSharedIslandReducer();
  const filter = useFilterFromURL();

  const visibleTodos = selectVisible(todos, filter);
  const areAllCompleted = todos.length && todos.every((todo) => todo.completed);
  const completeAll = () => dispatch(onCompleteAll());
  const update = (values) => dispatch(onUpdate(values));
  const remove = (id) => dispatch(onRemove(id));

  if (todos.length === 0) {
    return null;
  }

  return (
    <section className="main">
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        checked={areAllCompleted}
        readOnly
      />
      <label htmlFor="toggle-all" onClick={completeAll} />

      <ul className="todo-list">
        {visibleTodos.map((todo) => (
          <Item key={todo.id} todo={todo} onUpdate={update} onRemove={remove} />
        ))}
      </ul>
    </section>
  );
}
