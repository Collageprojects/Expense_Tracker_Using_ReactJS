import React, { useState } from "react";
import { useFilter } from "../Hooks/useFilter";
import ContextMenu from "./ContextMenu";

export default function ExpenseTable({
  expenses,
  setExpense,
  setExpenses,

  SetEditingRowId,
}) {
  const [filteredData, SetQuery] = useFilter(expenses, (data) => data.category);
  const [menuPosition, SetMenuPosition] = useState({});
  const [RowId, SetRowId] = useState("");
  const [sortCallBack, SetSortCallBack] = useState(() => () => {});

  const total = filteredData.reduce(
    (accumulator, current) => accumulator + Number(current.amount),
    0
  );

  return (
    <>
      <ContextMenu
        menuPosition={menuPosition}
        setExpense={setExpense}
        SetMenuPosition={SetMenuPosition}
        expenses={expenses}
        setExpenses={setExpenses}
        RowId={RowId}
        SetEditingRowId={SetEditingRowId}
      />
      <table
        className="expense-table"
        onClick={() => {
          if (menuPosition.left) {
            SetMenuPosition({});
          }
        }}
      >
        <thead>
          <tr>
            <th >
              <div>
                <span>Title</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow up-arrow"
                  onClick={() => {
                    SetSortCallBack(
                      () => (a, b) => a.title.localeCompare(b.title)
                    );
                  }}
                >
                  <title>Ascending</title>
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow down-arrow"
                  onClick={() => {
                    SetSortCallBack(
                      () => (a, b) => b.title.localeCompare(a.title)
                    );
                  }}
                >
                  <title>Descending</title>
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
              </div>
            </th>
            <th>
              <select
                onChange={(e) => SetQuery(e.target.value.toLocaleLowerCase())}
              >
                <option value="">All</option>
                <option value="grocery">Grocery</option>
                <option value="clothes">Clothes</option>
                <option value="bills">Bills</option>
                <option value="education">Education</option>
                <option value="medicine">Medicine</option>
              </select>
            </th>
            <th className="amount-column">
              <div>
                <span>Amount</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow up-arrow"
                  onClick={() => {
                    SetSortCallBack(() => (a, b) => a.amount - b.amount);
                  }}
                >
                  <title>Ascending</title>
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow down-arrow"
                  onClick={() => {
                    SetSortCallBack(() => (a, b) => b.amount - a.amount);
                  }}
                >
                  <title>Descending</title>
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData
            .sort(sortCallBack)
            .map(({ id, title, category, amount }) => (
              <tr
                key={id}
                onContextMenu={(e) => {
                  e.preventDefault();
                  SetMenuPosition({ left: e.clientX + 4, top: e.clientY + 4 });
                  SetRowId(id);
                }}
              >
                <td>{title}</td>
                <td>{category}</td>
                <td>₹ {amount}</td>
              </tr>
            ))}
          <tr>
            <th>Total</th>
            <th
              className="clear-sort"
              onClick={() => {
                SetSortCallBack(() => () => {});
              }}
            >
              Clear-Sort
            </th>
            <th>₹{total}</th>
          </tr>
        </tbody>
      </table>
    </>
  );
}
