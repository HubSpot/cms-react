import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { useInlineHeadAsset } from '@hubspot/cms-components';

export default function StyledComponentsRegistry({ children }) {
  // On the client, styled-components creates its own stylesheet. We only want
  // to create this sheet on the server
  const styledComponentsStyleSheet = import.meta.env.SSR
    ? new ServerStyleSheet()
    : null;

  useInlineHeadAsset(() => {
    if (styledComponentsStyleSheet === null) {
      return;
    }

    // Collect styles generated on the server pass and return them to go in the
    // <head>
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.seal();
    return <>{styles}</>;
  });

  if (styledComponentsStyleSheet === null) {
    return <>{children}</>;
  }

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}
