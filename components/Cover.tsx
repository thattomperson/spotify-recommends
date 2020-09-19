import styles from './Cover.module.css'

export default ({ children }) => {
  return <div className={styles.parent}>
    <div className={styles.child}>
      {children}
    </div>
  </div>
}