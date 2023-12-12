import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export function Item({ todo, onUpdate, onRemove }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(todo.name);

  const handleEdit = () => setEditing(true);
  const handleCompleted = () =>
    onUpdate({ id: todo.id, completed: !todo.completed });
  const handleRemove = () => onRemove(todo.id);
  const handleChange = (event) => setName(event.target.value);
  const handleBlur = () => {
    onUpdate({ id: todo.id, name });
    setEditing(false);
  };

  const { completed } = todo;

  return (
    <li className={classNames({ completed, editing })} data-testid="todo-item">
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={handleCompleted}
        />
        <label onDoubleClick={handleEdit} data-testid="todo-name">
          {todo.name}
        </label>
        <button
          className="destroy"
          onClick={handleRemove}
          data-testid="todo-remove"
        />
      </div>
      {editing && (
        <input
          className="edit"
          value={name}
          onInput={handleChange}
          onBlur={handleBlur}
          onChange={() => {}}
        />
      )}
    </li>
  );
}

Item.propTypes = {
  todo: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};
