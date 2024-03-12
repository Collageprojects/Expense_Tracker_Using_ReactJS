import React from "react";

export default function Select({
  label,
  id,
  name,
  value,
  onChange,
  options,
  SelectOption,
  error,
}) {
  return (
    <div className="input-container">
      <label htmlFor="category">{label}</label>
      <select id={id} name={name} value={value} onChange={onChange}>
        {SelectOption && (
          <option value="" hidden>
            {SelectOption}
          </option>
        )}
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
      <p className="error">{error}</p>
    </div>
  );
}
