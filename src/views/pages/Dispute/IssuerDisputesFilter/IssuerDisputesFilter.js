import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import styles from './IssuerDisputesFilter.module.css'

const IssuerDisputesFilter = () => {
  return (
    <div className={styles.IssuerDisputesFilterContainer}>
      <p className={styles.filterHeading}>Search or Filter</p>
      <div className={styles.filterItemsGroup}>
        <div className={styles.filterItems}>
          <p className={styles.filterTitle}>Date logged:</p>
          <div className={styles.filterInputBox}></div>
        </div>
        <div className={styles.filterItems}>
          <p className={styles.filterTitle}>Log code:</p>
          <div className={styles.filterInputBox}>
          <input className={styles.filterInput}></input>
          </div>
        </div>
        <div className={styles.filterItems}>
          <p className={styles.filterTitle}>Resolved By:</p>
          <div className={styles.filterInputBox}>
          <input placeholder='Placeholder' className={styles.filterInput}></input>
          </div>
        </div>
      </div>
      <div className={styles.filterItemsGroup}>
        <div className={styles.filterItems}>
          <p className={styles.filterTitle}>Logged By:</p>
          <div className={styles.filterInputBox}></div>
        </div>
        <div className={styles.filterItems}>
          <p className={styles.filterTitle}>Status:</p>
          <div className={styles.filterInputBox}></div>
        </div>
        <div className={styles.filterItems}>
          <p className={styles.filterTitle}>Resolved on:</p>
          <div className={styles.filterInputBox}></div>
        </div>
      </div>
      <div className={styles.buttonContainer}>
      <p className={`${styles.searchButton} ${styles.button}`}>Search</p>
      <p className={`${styles.clearButton} ${styles.button}`}>Clear</p>
      </div>
    </div>
  )
}

export default IssuerDisputesFilter
