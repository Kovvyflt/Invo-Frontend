import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search by name or SKU..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="search--bar"
    />
  );
}
