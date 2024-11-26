export const initialPermissions = {
  users: ["create", "read", "update", "delete"],
  roles: ["create", "read", "update", "delete"],
  settings: ["read", "update"],
};

export const initialRoles = [
  {
    id: 1,
    name: "Admin",
    permissions: {
      users: ["create", "read", "update", "delete"],
      roles: ["create", "read", "update", "delete"],
      settings: ["read", "update"],
    },
  },
  {
    id: 2,
    name: "User",
    permissions: {
      users: ["read"],
      roles: ["read"],
      settings: ["read"],
    },
  },
];

export const initialUsers = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    roleId: 1,
    status: "active",
  },
  {
    id: 2,
    name: "Regular User",
    email: "user@example.com",
    roleId: 2,
    status: "active",
  },
];
