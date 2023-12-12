import { Header } from '../header/header.jsx';
import List from '../list/list.jsx?island';
import Footer from '../footer/footer.jsx?island';
import { CopyRight } from '../copy-right/copy-right.jsx';
import { Island } from '@hubspot/cms-components';

export function App({ todoPlaceholder }) {
  return (
    <div id="app">
      <section className="todoapp">
        <Header todoPlaceholder={todoPlaceholder} />
        <Island module={List} hydrateOn="visible" />
        <Island module={Footer} hydrateOn="visible" />
      </section>
      <CopyRight />
    </div>
  );
}
