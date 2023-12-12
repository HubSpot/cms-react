import styles from '../styles/theme.module.css';

const Row = ({ children, className, style = {} }) => {
  return (
    <div
      className={`${styles.rowFluid}${(className && ` ${className}`) || ''}`}
      style={{ ...style }}
    >
      {children}
    </div>
  );
};

export default Row;
