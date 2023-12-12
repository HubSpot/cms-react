import { useState, useId } from 'react';

export default function InteractiveStyledJSXComponent() {
  const id = useId();
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(prevCount => prevCount + 1)}>
      Current count is: {count} {id}
      <style jsx>
        {`
          button {
            padding: ${10 + count * 10}px;
          }
        `}
      </style>
    </button>
  );
}
