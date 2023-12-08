import { StyleRegistry, useStyleRegistry } from 'styled-jsx';
import { useInlineHeadAsset } from '@hubspot/cms-components';

function InsertHTML() {
  const registry = useStyleRegistry();
  useInlineHeadAsset(() => {
    // Collect styles generated on the server pass and return them to go in the
    // <head>

    const styles = registry.styles();
    return <>{styles}</>;
  });
}

export default function StyledJSXRegistry({ children }) {
  // for styled-jsx, the registry component needs to be included on the client
  // and server to make sure that hook usage is preserved. excluding it on the
  // client can result in mismatching results of useId()

  return (
    <StyleRegistry>
      <InsertHTML />
      {children}
    </StyleRegistry>
  );
}
