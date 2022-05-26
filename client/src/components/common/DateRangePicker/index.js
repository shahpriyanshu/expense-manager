import React, { useCallback, useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { BsCalendarDate } from "react-icons/bs";
import { Button, ClearButton } from "../button";
import { Flex } from "../../home/style";
import { DateRangeWrapper } from "./styles";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const DatePicker = ({ minDate, maxDate, applyDateRangeFilter }) => {
  const [isCalendarVisible, toggleCalendar] = useState(false);
  const initialRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  }
  const [selectionRange, setSelectedDateRange] = useState(initialRange);

  const handleSelect = (range) => {
    setSelectedDateRange(range?.selection);
  };

  const applyDateRangeSelection = (event) => {
    event.preventDefault();
    applyDateRangeFilter(selectionRange);
    toggleCalendar(false);
  };

  const resetRangeSelection = event => {
      event.preventDefault();
      setSelectedDateRange(initialRange)
      applyDateRangeFilter(null);
      toggleCalendar(false);
  }
  return (
    <Flex flexDirection='Column' alignItems='flex-end'>
      <BsCalendarDate
        size={25}
        onClick={() => toggleCalendar(!isCalendarVisible)}
      />
      {isCalendarVisible ? (
        <DateRangeWrapper>
          <DateRange
            editableDateInputs={true}
            ranges={[selectionRange]}
            onChange={(range) => handleSelect(range)}
            moveRangeOnFirstSelection={true}
            minDate={minDate}
            maxDate={maxDate}
          />
          <Flex justifyContent="end" alignSelf="center" alignItems="flex-end">
          <ClearButton clear onClick={(event) => resetRangeSelection(event)}>
                Reset
            </ClearButton>
            <Button onClick={(event) => applyDateRangeSelection(event)}>
                Apply
            </Button>
          </Flex>
        </DateRangeWrapper>
      ) : null}
    </Flex>
  );
};

export default DatePicker;
