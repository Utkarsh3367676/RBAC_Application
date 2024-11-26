import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { isDarkMode, setIsDarkMode } = useTheme();

  const menuItems = [
    { path: "/users", label: "Users", icon: "👥" },
    { path: "/roles", label: "Roles", icon: "🔑" },
  ];

  return (
    <div
      className={`${
        isCollapsed ? "w-16" : "w-64"
      } transition-all duration-300 ease-in-out
      ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}
      min-h-screen relative`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-4 bg-blue-500 text-white p-1 rounded-full"
      >
        {isCollapsed ? "→" : "←"}
      </button>

      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          {!isCollapsed && <h1 className="text-xl font-bold">RBAC Admin</h1>}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center p-2 rounded-lg
                ${
                  location.pathname === item.path
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }
                ${isCollapsed ? "justify-center" : "space-x-3"}`}
            >
              <span>{item.icon}</span>
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
