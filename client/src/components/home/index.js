import React, { useContext, useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import { UserContext } from "../../App";
import Grid from "./Grid";
import Header from "../common/header";
import RecordExpense from "../recordExpense";
import { Button } from "../common/button";
import PieChart from "../charts/pieChart";
import BarChart from "../charts/barChart";
import {
  Container,
  Flex,
  SalutationText,
  CustomUserIcon,
  DisbaledText,
} from "./style";

const Home = () => {
  const location = useLocation();
  const user = useContext(UserContext);
  const [expenses, setExpenses] = useState(null);
  const [actionExpenseAttribute, setActionExpenseAttribute] = useState(null);
  const [isModalOpen, setModalState] = useState(false);
  const [filteredExpenses, setFilteredExpenses] = useState(null);

  useEffect(() => {
    fetchUserExpense();
  }, []);

  const fetchUserExpense = async () => {
    try {
      const { data } = await axios.get("/api/expenses");
      const formattedexpenses = formatUserExpenses(data);
      setExpenses(formattedexpenses);
      setFilteredExpenses(formattedexpenses);
    } catch (error) {
      console.error(error);
    }
  };

  const formatUserExpenses = (expenses) => {
    let formattedexpenses = [];
    let dates = [];
    if (expenses?.Items?.length) {
      formattedexpenses = expenses.Items.map((expense) => {
        const item = {};
        Object.keys(expense).forEach((key) => {
          Object.keys(expense[key]).forEach((childKey) => {
            item[key] = expense[key][childKey];
            if (key === "date") dates.push(new Date(expense[key][childKey]));
          });
        });
        return item;
      });
    }
    const minDate = Math.min(...dates);
    const maxDate = Math.max(...dates);
    return {
      data: formattedexpenses,
      minDate: new Date(minDate),
      maxDate: new Date(maxDate),
    };
  };

  const applyDateRangeFilter = (range) => {
    if (!range) {
      setFilteredExpenses(expenses);
      return;
    }
    const { startDate, endDate } = range;
    const filteredData = expenses?.data?.filter(
      (expense) =>
        new Date(expense.date) >= startDate && new Date(expense.date) <= endDate
    );
    setFilteredExpenses({ ...filteredExpenses, data: filteredData });
  };

  const handleExpenseSubmit = async (expense) => {
    const expenseData = {
      id: expense.id,
      date: expense.date,
      amount: Number(expense.amount),
      type: expense.type,
    };
    try {
      const response = await axios({
        method: "PUT",
        url: "/api/expenses",
        data: expenseData,
      });
      if (response) {
        fetchUserExpense();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRowAction = async (row, action) => {
    // eslint-disable-next-line default-case
    switch (action?.value) {
      case "delete":
        try {
          const response = await axios.delete("/api/expenses", {
            data: {
              expenseId: row?.expenseId,
            },
          });
          if (response) {
            fetchUserExpense();
          }
        } catch (err) {
          console.error(err);
        }
        break;

      case "edit":
        setActionExpenseAttribute({
          id: row?.expenseId,
          type: row?.expenseType,
          amount: row?.expense,
          date: row?.date,
        });
        setModalState(true);
    }
  };

  return (
    <>
      <Header user={user} />
      <Container>
        <Flex flexDirection='column'>
          <Flex>
            <CustomUserIcon size={80} color='#808080' />
            <Flex flexDirection='column'>
              <SalutationText>
                {location?.state?.isNweUser ? "Welcome" : "Welcome back"},{" "}
                {user.username}
              </SalutationText>
              <DisbaledText>
                These are your expenses. Keep them low.
              </DisbaledText>
            </Flex>
            <Button alignRight onClick={() => setModalState(true)}>
              Add Expense
            </Button>
            <RecordExpense
              title='Record Expense'
              recordExpense={handleExpenseSubmit}
              actionExpenseAttribute={actionExpenseAttribute}
              isModalOpen={isModalOpen}
              toggleRecordExpense={setModalState}
            />
          </Flex>
          <Grid
            userExpenses={filteredExpenses}
            applyDateRangeFilter={applyDateRangeFilter}
            handleRowAction={handleRowAction}
          />
        </Flex>
        <Flex flexDirection='column'>
          <PieChart expenses={filteredExpenses} />
          <BarChart expenses={filteredExpenses} />
        </Flex>
      </Container>
    </>
  );
};

export default Home;
