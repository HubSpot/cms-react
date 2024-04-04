import { logInfo } from '@hubspot/cms-components';
import { useState } from 'react';

export default function Button({ ...props }) {
  const [count, setCount] = useState(2);

  logInfo(props);

  return (
    <section {...props}>
      <button onClick={() => setCount((prev) => prev + 1)}>Add one</button>{' '}
      <span>{count}</span>
    </section>
  );
}
