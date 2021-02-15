import styles from './Cover.module.css';

const Cover = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => {
  return (
    <div className={styles.parent}>
      <div className={styles.child}>{children}</div>
    </div>
  );
};

export default Cover;
