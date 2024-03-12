import React from "react";

export default function ContextMenu({
  menuPosition,
  SetMenuPosition,
  setExpense,
  expenses,
  SetEditingRowId,
  setExpenses,
  RowId,
}) {
  if (!menuPosition.left) return;

  return (
    <div className="context-menu" style={{ ...menuPosition }}>
      <div
        onClick={() => {
        
          const { title, category, amount } = expenses.find(
            (expense) => expense.id === RowId
          );
          SetEditingRowId(RowId)
          setExpense({ title, category, amount });
          SetMenuPosition({});
        }}
      >
        Edit
      </div>
      <div
        onClick={() => {
          setExpenses((prevState) =>
            prevState.filter((expense) => expense.id !== RowId)
          ),
            SetMenuPosition({});
        }}
      >
        Delete
      </div>
    </div>
  );
}
