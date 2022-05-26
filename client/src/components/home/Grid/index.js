import React from "react";
import Card from "../../common/card";
import DatePicker from "../../common/DateRangePicker";
import { TableHeader, TableData, TableRow } from "./style";
import {getFormattedDate} from "../../../utils";
import { Flex } from "../style";
import MenuAction from "./menuAction";

const Grid = (props) => {
  const { userExpenses, applyDateRangeFilter, handleRowAction } = props;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  });

  const columns = {
    expenseType: {
      label: "Name",
      width: "300px",
      cell: (row) => {
        return (
          <TableData column='expenseType'>
            <strong>{row?.expenseType}</strong>
          </TableData>
        );
      },
    },
    date: {
      label: "Date",
      width: "150px",
      cell: (row) => {
        return <TableData column='date'>{getFormattedDate(row?.date)}</TableData>;
      },
    },
    expense: {
      label: "Amount",
      width: "100px",
      cell: (row) => {
        return (
          <TableData column='expense'>
            {formatter.format(row?.expense)}
          </TableData>
        );
      },
    },
    actions: {
      label: "",
      width: "5px",
      cell: (row) => {
        return (
          <TableData column='action'>
            <MenuAction row={row} handleRowAction={handleRowAction} />
          </TableData>
        );
      },
    },
  };

  return (
    <Flex flexDirection='column'>
      <Card header='Expense records'>
        <DatePicker
          minDate={userExpenses?.minDate}
          maxDate={userExpenses?.maxDate}
          applyDateRangeFilter={applyDateRangeFilter}
        />
        <table style={{ width: "100%" }}>
          <TableRow>
            {Object.keys(columns).map((key, id) => {
              return (
                <TableHeader key={id} width={columns[key].width}>
                  {columns[key].label}
                </TableHeader>
              );
            })}
          </TableRow>

          {userExpenses?.data?.map((expenseObject, rowId) => {
            return (
              <TableRow key={rowId}>
                {Object.keys(columns).map((key) => {
                  return columns[key].cell(expenseObject);
                })}
              </TableRow>
            );
          })}
        </table>
      </Card>
    </Flex>
  );
};

export default Grid;
