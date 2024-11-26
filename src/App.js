import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/common/PrivateRoute";
import LoginPage from "./components/auth/LoginPage";
import UnauthorizedPage from "./components/common/UnauthorizedPage";
import Layout from "./components/common/Layout";
import UserList from "./components/users/UserList";
import RoleList from "./components/roles/RoleList";
import {
  initialUsers,
  initialRoles,
  initialPermissions,
} from "./data/mockData";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  const [users, setUsers] = useState(initialUsers);
  const [roles, setRoles] = useState(initialRoles);
  const [permissions] = useState(initialPermissions);

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Layout />
                </PrivateRoute>
              }
            >
              <Route
                index
                element={
                  <PrivateRoute requiredPermissions={["users", "read"]}>
                    <UserList users={users} setUsers={setUsers} roles={roles} />
                  </PrivateRoute>
                }
              />
              <Route
                path="users"
                element={
                  <PrivateRoute requiredPermissions={["users", "read"]}>
                    <UserList users={users} setUsers={setUsers} roles={roles} />
                  </PrivateRoute>
                }
              />
              <Route
                path="roles"
                element={
                  <PrivateRoute requiredPermissions={["roles", "read"]}>
                    <RoleList
                      roles={roles}
                      setRoles={setRoles}
                      permissions={permissions}
                    />
                  </PrivateRoute>
                }
              />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
