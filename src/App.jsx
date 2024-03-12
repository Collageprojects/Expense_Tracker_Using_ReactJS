import "./App.css";
import ExpenseForm from "./Components/ExpenseForm";
import ExpenseTable from "./Components/ExpenseTable";

import ExpenseData from "./ExpenseData";
import { useLocalStorage } from "./Hooks/useLocalStorage";

function App() {
  const [expense, setExpense] = useLocalStorage("expense", {
    title: "",
    category: "",
    amount: "",
  });
  const [expenses, setExpenses] = useLocalStorage("expenses", ExpenseData);
  const [editingRowId, SetEditingRowId] = useLocalStorage("editingRowId", "");

  return (
    <>
      <main>
        <h1>Track Your Expense</h1>
        <div className="expense-tracker">
          <ExpenseForm
            setExpenses={setExpenses}
            expense={expense}
            editingRowId={editingRowId}
            setExpense={setExpense}
            SetEditingRowId={SetEditingRowId}
          />
          <ExpenseTable
            expenses={expenses}
            SetEditingRowId={SetEditingRowId}
            setExpense={setExpense}
            setExpenses={setExpenses}
          />
        </div>
      </main>
    </>
  );
}

export default App;
