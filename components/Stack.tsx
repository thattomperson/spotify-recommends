import styles from './Stack.module.css'

export default ({ children }) => {
  return <div className={styles.stack}>
    {children}
  </div>
}