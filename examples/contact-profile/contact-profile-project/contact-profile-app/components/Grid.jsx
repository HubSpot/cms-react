import styles from '../styles/theme.module.css';

const Grid = ({ className, children, style = {} }) => {
  return (
    <div
      className={`${styles.rowFluidWrapper}${
        (className && ` ${className}`) || ''
      }`}
      style={{ ...style }}
    >
      {children}
    </div>
  );
};

export default Grid;
