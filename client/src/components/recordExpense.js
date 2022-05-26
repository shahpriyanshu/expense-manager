import React, { useEffect, useState } from "react";
import Modal from "./common/modal";
import { Input } from "./common/Input/style";
import { Button } from "./common/button";
import { Flex, Label, PrimaryText, Select } from "./common/style";

const expenseTypes = [
  "Home expenses",
  "Food expenses",
  "Child related expenses",
  "Debt obligations",
  "Health care expenses",
  "Transportation expenses",
  "Personal care expenses",
  "Pet care expenses",
  "Entertainment expenses",
  "Miscellaneous expenses",
];

const RecordExpense = ({ title, recordExpense, actionExpenseAttribute, isModalOpen, toggleRecordExpense }) => {
  const newExpenseInitialAttribute = {
    id: Math.floor(100000 + Math.random() * 900000),
    type: expenseTypes[0],
    amount: "",
    date: new Date(),
  };
  const [expenseAttributes, setExpenseAttributes] = useState(newExpenseInitialAttribute);

  useEffect(() => {
    if (!isModalOpen) {
      setExpenseAttributes(newExpenseInitialAttribute)
    }
  }, [isModalOpen])

  useEffect(() => {
    if (actionExpenseAttribute)
    setExpenseAttributes(actionExpenseAttribute);
  }, [actionExpenseAttribute])

  const handlInputChange = (event) => {
    setExpenseAttributes({
      ...expenseAttributes,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    recordExpense(expenseAttributes);
    toggleRecordExpense(false);
  };

  return (
    <>
      <Modal
        header='Record Expense'
        isModalOpen={isModalOpen}
        setModalState={toggleRecordExpense}
      >
        <PrimaryText>{title}</PrimaryText>
        <form onSubmit={(e) => handleSubmit(e)} id='expense-operation'>
          <Flex>
            <Label> Select expense type</Label>
            <Select
              name='type'
              id='expense-type'
              type='select'
              value={expenseAttributes.type}
              form='expense-operation'
              placeholder='Expense Type'
              onChange={(e) => handlInputChange(e)}
            >
              {expenseTypes.map((type) => (
                <option value={type}>{type}</option>
              ))}
            </Select>
          </Flex>
          <Flex>
            {expenseAttributes?.amount && <Label>Amount</Label>}
            <Input
              required
              name='amount'
              type='number'
              min="1"
              id='expense-amount'
              value={expenseAttributes?.amount}
              placeholder='Amount'
              onChange={(e) => handlInputChange(e)}
            />
          </Flex>
          <Flex>
            <Label> Date</Label>
            <Input
              required
              name='date'
              type='date'
              value={expenseAttributes.date}
              id='expense-date'
              placeholder='Date'
              onChange={(e) => handlInputChange(e)}
            />
          </Flex>
          <Button type='submit' alignRight disabled={!expenseAttributes.amount}>
            Record Expense
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default RecordExpense;
