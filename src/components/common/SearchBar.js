import React from "react";
import { useTheme } from "../../context/ThemeContext";

function SearchBar({ value, onChange, placeholder = "Search..." }) {
  const { isDarkMode } = useTheme();

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-2 pl-10 rounded-lg border
          ${
            isDarkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-white border-gray-300 text-gray-900"
          }
          focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      <span className="absolute left-3 top-2.5">🔍</span>
    </div>
  );
}

export default SearchBar;
