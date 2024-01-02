import Select from 'react-select'

import DateRangePickerContainer from 'src/components/DateRangePicker/DateRangePicker'
import styles from './TransactionsTableFilter.module.css'

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused ? 'none' : '2px solid #ccc',
    boxShadow: state.isFocused ? '0 0 5px rgba(0, 0, 0, 0.3)' : null,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#ddd' : null,
  }),
}

const TableFilter = () => {
  const mainOptions = [
    { value: 'Search', label: 'Search' },
    { value: 'Filter', label: 'Filter' },
  ]

  const filterOptions = [{ value: 'bulk-record', label: 'bulk record contains all transactions' }]

  return (
    <div className={styles.filterBox}>
      <Select className={styles.select} options={mainOptions} styles={customStyles} />
      <div className={styles.filterCriteria}>
        <div className={styles.filterCriteriaGroup}>
          <p className={styles.filterLabel}>Transactions Processing Outcome:</p>
          <div className={styles.selectContainer}>
            <Select options={filterOptions} className={styles.select} />
          </div>
        </div>
        <div className={styles.filterCriteriaGroup}>
          <p>Date Created:</p>
          <div className={styles.selectContainer}>
            <DateRangePickerContainer />
          </div>
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <p className={styles.searchButton}>Search</p>
        <p className={styles.clearButton}>Clear</p>
      </div>
    </div>
  )
}

export default TableFilter
