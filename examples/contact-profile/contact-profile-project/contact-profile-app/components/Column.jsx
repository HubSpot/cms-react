import styles from '../styles/theme.module.css';

const Column = ({ className, children, style = {}, width = 12 }) => {
  return (
    <div
      className={`${styles.col}${(className && ` ${className}`) || ''}`}
      style={{ ...style }}
    >
      {children}
    </div>
  );
};

export default Column;
