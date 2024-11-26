import { initialUsers, initialRoles } from "../data/mockData";

export const initializeMockData = () => {
  // Only initialize if data doesn't exist
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(initialUsers));
  }

  if (!localStorage.getItem("roles")) {
    localStorage.setItem("roles", JSON.stringify(initialRoles));
  }

  // Set a default test user for login
  if (!localStorage.getItem("currentUser")) {
    const testUser = {
      id: 1,
      name: "Admin User",
      email: "admin@example.com",
      roleId: 1,
      status: "active",
    };
    localStorage.setItem("testUser", JSON.stringify(testUser));
  }
};
