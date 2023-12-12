import { Island } from '@hubspot/cms-components';
import StyledComponentsRegistry from './StyledComponentsRegistry?client';
// Important! Wrapper expects a lazy component, which you can do easily with `?client` similar to `?island`

export default function StyledComponentsIsland(props) {
  // Using the `Wrapper` prop for `Island` to wrap the contents in a
  // `StyledComponentsRegistry` to capture generated styles on the server
  return <Island {...props} Wrapper={StyledComponentsRegistry} />
}
