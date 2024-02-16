import { Island } from '@hubspot/cms-components';
import StyledJSXRegistry from './StyledJSXRegistry?client';
// Important! Wrapper expects a lazy component, which you can do easily with `?client` similar to `?island`

export default function StyledJSXIsland(props) {
  // Using the `Wrapper` prop for `Island` to wrap the contents in a
  // `StyledJSXRegistry` to capture generated styles on the server
  return <Island {...props} Wrapper={StyledJSXRegistry} />;
}
