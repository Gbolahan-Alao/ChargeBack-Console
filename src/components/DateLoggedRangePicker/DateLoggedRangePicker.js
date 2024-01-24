import { useEffect, useRef, useState } from 'react'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { FaCalendarAlt } from 'react-icons/fa'
import styles from './DateLoggedRangePicker.module.css'

import { format } from 'date-fns'
import { DateRangePicker } from 'react-date-range'

const DateLoggedRangePicker = () => {
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  })
  const [openDate, setOpenDate] = useState(false)
  const calendarRef = useRef(null)

  const handleChange = (ranges) => {
    setDate((prevState) => ({
      ...prevState,
      ...ranges.selection,
    }))
  }

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setOpenDate(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const handleClick = () => {
    setOpenDate(!openDate)
  }

  return (
  <div className={styles.dateContainer} ref={calendarRef}>
    <div className={styles.calendar} onClick={handleClick}>
      <div className={styles.dateText}>
        {`${format(date.startDate, 'MM-dd-yyyy')} to ${format(date.endDate, 'MM-dd-yyyy')}`}
      </div>
      <div className={styles.calendarIcon}>
        <FaCalendarAlt />
      </div>
    </div>
    {openDate && (
      <DateRangePicker
        className={styles.dateRange}
        ranges={[date]}
        onChange={handleChange}
        maxDate={new Date()}
      />
    )}
  </div>
);

}

export default DateLoggedRangePicker
