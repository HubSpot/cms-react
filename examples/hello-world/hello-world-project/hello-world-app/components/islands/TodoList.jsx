import { useReducer, useState } from 'react';

import Button from './Button.jsx';
import styles from '../../styles/todo.module.css';

// This TodoList component highlights a few different things:
//  - A component to be used as an Island for client-side interactivity
//  - Picking up a default or initial value that is server rendered, but in the
//    browser is merely the initial state value that is changed by interaction
//  - Examples of various ways to do conditional styling based on incoming props
//    or module fields (inline comments below)

const todoSortByCompleted = (todoA, todoB) => {
  if (todoA.completed && todoB.completed) {
    // Earlier IDs correspond to higher place in the list
    return todoA.id - todoB.id;
  }
  if (todoA.completed) return 1;
  if (todoB.completed) return -1;
  return todoA.id - todoB.id;
};

const initialize = (initialTodos) => {
  return {
    nextId: 0,
    todos: initialTodos.map((initialTodo, i) => ({
      id: `default-${i}`,
      key: `default-${i}`,
      ...initialTodo,
    })),
  };
};

const reducer = (state, action) => {
  switch (action.action) {
    case 'ADD_TODO': {
      const todoText = action.value;
      return {
        todos: [
          ...state.todos,
          {
            id: state.nextId,
            key: state.nextId,
            text: todoText,
            completed: false,
          },
        ].sort(todoSortByCompleted),
        nextId: state.nextId + 1,
      };
    }
    case 'TOGGLE_TODO': {
      const updatedTodoId = action.value;
      return {
        ...state,
        todos: state.todos
          .map((todo) =>
            todo.id === updatedTodoId
              ? { ...todo, completed: !todo.completed }
              : todo,
          )
          .sort(todoSortByCompleted),
      };
    }
    case 'REMOVE_TODO': {
      const todoToRemoveId = action.value;
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== todoToRemoveId),
      };
    }
    default:
      return state;
  }
};

function TodoItem({ todo, onRemove, onUpdate }) {
  const handleTodoCompleteClick = () => {
    onUpdate(todo.id);
  };

  const handleTodoRemoveClick = () => {
    onRemove(todo.id);
  };

  return (
    <li className={styles.todoContainer}>
      <div
        onClick={handleTodoCompleteClick}
        className={`${styles.todo} ${
          // Example of using a className to dynamically toggle a dynamic style
          // (via state, prop, or module field value)
          todo.completed ? styles.complete : styles.notComplete
        }`}
      >
        <input type="checkbox" checked={todo.completed} readOnly />
        {todo.text}
        {todo.dateAdded ? (
          <span className={styles.todoDateAdded}>{todo.dateAdded}</span>
        ) : (
          ''
        )}
      </div>
      <button className={styles.todoRemove} onClick={handleTodoRemoveClick}>
        ×
      </button>
    </li>
  );
}

function TodoList({ initialTodos = [], buttonColor, completeTodoOpacity }) {
  const [state, dispatch] = useReducer(reducer, initialTodos, initialize);
  const [todoInput, setTodoInput] = useState('');
  const todoList = state.todos;

  const addTodo = (todoText) => {
    dispatch({ action: 'ADD_TODO', value: todoText });
  };

  const handleRemoveTodo = (todoId) => {
    dispatch({ action: 'REMOVE_TODO', value: todoId });
  };

  const handleUpdateTodo = (updatedTodoId) => {
    dispatch({ action: 'TOGGLE_TODO', value: updatedTodoId });
  };

  const handleAddTodoClick = () => {
    addTodo(todoInput);
    setTodoInput('');
  };

  const handleTodoInput = (e) => setTodoInput(e.target.value);
  const handleTodoKeyDown = (e) => {
    if (e.key === 'Enter' && todoInput) {
      handleAddTodoClick();
    }
  };

  // Example of setting a CSS custom property value that is picked up by other CSS
  // This is a great way to keep more styling logic inside your CSS file and "pass"
  // a dynamic property or module field value into that CSS file (see
  // --todo-complete-opacity referenced in todo.module.css)
  const customCssProperties = {
    '--todo-complete-opacity': completeTodoOpacity / 100,
  };

  return (
    <div className={styles.todoListContainer} style={customCssProperties}>
      <div className={styles.toDoForm}>
        <input
          className={styles.todoInput}
          placeholder="Add a todo..."
          value={todoInput}
          onInput={handleTodoInput}
          onKeyDown={handleTodoKeyDown}
        />

        <Button
          // Example of using inline style attribute (with React's style syntax)
          // to directly set a dynamic style on an element
          style={{ backgroundColor: buttonColor.color }}
          onClick={handleAddTodoClick}
          disabled={!todoInput}
        >
          <svg
            aria-hidden
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />{' '}
          </svg>
        </Button>
      </div>

      <ul className={styles.todoList}>
        {todoList.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            onRemove={handleRemoveTodo}
            onUpdate={handleUpdateTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
