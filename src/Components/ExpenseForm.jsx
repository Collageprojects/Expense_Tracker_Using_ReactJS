import React, { useState } from "react";
import Input from "./Input";
import Select from "./Select";

export default function ExpenseForm({
  expense,
  setExpense,
  setExpenses,
  editingRowId,
  SetEditingRowId,
}) {
  const [errors, SetErrors] = useState({});

  const ValidationConfig = {
    title: [
      { required: true, message: "please Enter Title" },
      { minLength: 5, message: "Title should be at least 5 characters long" },
    ],
    category: [{ required: true, message: "Please Select a Category" }],
    amount: [
      { required: true, message: "please Enter the amount" },
      { pattern: /^-?(0|[1-9]\d*)$/, message: "Please Enter a number" },
    ],
  };

  const Validate = (formData) => {
    const errorData = {};

    Object.entries(formData).forEach(([key, value]) => {
      ValidationConfig[key].forEach((rule) => {
        if (rule.required && !value) {
          errorData[key] = rule.message;
          return true;
        }
        if (rule.required && value.length < 1) {
          errorData[key] = rule.message;
          return true;
        }
        if (rule.pattern && !rule.pattern.test(value)) {
          errorData[key] = rule.message;
          return true;
        }
      });
    });

    SetErrors(errorData);
    return errorData;
  };

  const HandleSubmit = (e) => {
    e.preventDefault();

    const validateResult = Validate(expense);
    if (Object.keys(validateResult).length) {
      return;
    }

    if (editingRowId) {
      setExpenses((prevState) =>
        prevState.map((prevExpense) => {
          if (prevExpense.id === editingRowId) {
            return { ...expense, id: editingRowId };
          }
          return prevExpense;
        })
      );
      SetEditingRowId("");
      setExpense({
        title: "",
        category: "",
        amount: "",
      });
      return;
    }

    setExpenses((prevState) => [
      ...prevState,
      { ...expense, id: crypto.randomUUID() },
    ]);

    setExpense({
      title: "",
      category: "",
      amount: "",
    });
  };

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    SetErrors({});
  };

  return (
    <form className="expense-form" onSubmit={HandleSubmit}>
      <Input
        label="Title"
        id="title"
        name="title"
        value={expense.title}
        onChange={HandleChange}
        error={errors.title}
      />
      <Select
        label="Category"
        id="category"
        name="category"
        value={expense.category}
        onChange={HandleChange}
        options={["Grocery", "Clothes", "Bills", "Education", "Medicine"]}
        SelectOption={"Select Category"}
        error={errors.category}
      />
      <Input
        label="Amount"
        id="amount"
        name="amount"
        value={expense.amount}
        onChange={HandleChange}
        error={errors.amount}
      />

      <button className="add-btn">{editingRowId ? "Save" : "Add"}</button>
    </form>
  );
}
