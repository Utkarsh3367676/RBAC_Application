import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Get the role name from the user's roleId (1 = Admin, 2 = User)
  const userRole = currentUser?.roleId === 1 ? "Admin" : "User";

  return (
    <header className="bg-white shadow h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <span className="text-gray-600 mr-2">
            {userRole}: {currentUser?.name}
          </span>
          <button className="bg-gray-200 p-2 rounded-full">👤</button>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
