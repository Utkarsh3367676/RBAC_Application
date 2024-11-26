import React, { useState } from "react";
import UserForm from "./UserForm";
import UserCard from "./UserCard";
import { usePermissions } from "../../hooks/usePermissions";
import { useTheme } from "../../context/ThemeContext";
import SearchBar from "../common/SearchBar";

function UserList({ users = [], setUsers, roles = [] }) {
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const permissions = usePermissions();
  const { isDarkMode } = useTheme();

  const handleDelete = (userId) => {
    if (!permissions.canDeleteUser()) return;
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleEdit = (user) => {
    if (!permissions.canUpdateUser()) return;
    setEditingUser(user);
    setShowForm(true);
  };

  const handleSubmit = (userData) => {
    if (editingUser && !permissions.canUpdateUser()) return;
    if (!editingUser && !permissions.canCreateUser()) return;

    if (!userData.name || !userData.email || !userData.roleId) {
      alert("Please fill in all required fields");
      return;
    }

    if (editingUser) {
      setUsers(
        users.map((user) =>
          user.id === editingUser.id ? { ...userData, id: user.id } : user
        )
      );
    } else {
      const newUser = {
        ...userData,
        id: Math.max(...users.map((u) => u.id), 0) + 1,
        status: userData.status || "active",
      };
      setUsers([...users, newUser]);
    }

    setShowForm(false);
    setEditingUser(null);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`container mx-auto ${isDarkMode ? "text-white" : ""}`}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Users</h1>
          {permissions.canCreateUser() && (
            <button
              onClick={() => {
                setEditingUser(null);
                setShowForm(true);
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add User
            </button>
          )}
        </div>

        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search users..."
        />

        {showForm && (
          <UserForm
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingUser(null);
            }}
            roles={roles}
            initialData={editingUser}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              role={roles.find((role) => role.id === user.roleId)}
              onEdit={
                permissions.canUpdateUser() ? () => handleEdit(user) : null
              }
              onDelete={
                permissions.canDeleteUser() ? () => handleDelete(user.id) : null
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserList;
