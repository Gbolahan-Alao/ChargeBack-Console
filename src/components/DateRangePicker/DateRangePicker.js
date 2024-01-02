import { useEffect, useRef, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import styles from "./DateRangePicker.module.css";
 
import { format } from "date-fns";
import { DateRangePicker } from "react-date-range";

const DateRangePickerContainer = () => {
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [openDate, setOpenDate] = useState(false);
  const calendarRef = useRef(null);

  const handleChange = (ranges) => {
    setDate((prevState) => ({
      ...prevState,
      ...ranges.selection,
    }));
  };

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setOpenDate(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    setOpenDate(!openDate);
  };

  return (
    <div className={styles.dateContainer} ref={calendarRef}>
      <span onClick={handleClick} className={styles.calendar} style={{width:"250px", height:"40px", textAlign:'center'}}>
        {`${format(date.startDate, "MM-dd-yyyy")} to ${format(
          date.endDate,
          "MM-dd-yyyy"
        )}`}
      </span>  
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
};

export default DateRangePickerContainer;
