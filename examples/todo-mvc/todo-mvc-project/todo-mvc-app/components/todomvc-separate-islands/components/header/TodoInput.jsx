import { useState } from 'react';
import { onCreate } from '../../store/actions/todo.js';
import { useSharedIslandReducer } from '@hubspot/cms-components';

const ENTER_KEY = 'Enter';

export default function TodoInput({ className, placeholder }) {
  const [name, setName] = useState('');
  const [, dispatch] = useSharedIslandReducer();

  const handleChange = (event) => setName(event.target.value);

  const handleSubmit = (event) => {
    if (event.key !== ENTER_KEY) {
      return;
    }

    dispatch(onCreate(name));
    onCreate(name);
    setName('');
  };

  return (
    <input
      className={className}
      placeholder={placeholder}
      value={name}
      onInput={handleChange}
      onKeyUp={handleSubmit}
      onChange={() => {}}
    />
  );
}
