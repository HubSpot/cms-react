import { useState } from 'react';

export function addNumbers(...args: number[]): number {
  return args.reduce((sum, num) => sum + num, 0);
}

export default function MyButton({ defaultCount }) {
  let [count, setCount] = useState(defaultCount);

  /*
   *Note, this click handler will only work if
   *InteractiveComponent was called from inside an <Island>.
   *Otherwise the static server HTML returned will be a button
   *that does nothing when you try to click it.
   */

  return <button onClick={() => setCount(count + 1)}>Click me! {count}</button>;
}
