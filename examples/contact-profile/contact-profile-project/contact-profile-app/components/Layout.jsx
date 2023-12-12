import layoutStyles from '../styles/layout.module.css';

function Layout({ children }) {
  return <div className={layoutStyles.layout}>{children}</div>;
}

export default Layout;
