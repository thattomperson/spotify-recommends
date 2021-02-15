import styles from './Cover.module.css'

const Cover = ({ children }) => {
  return <div className={styles.parent}>
    <div className={styles.child}>
      {children}
    </div>
  </div>
};

export default Cover;