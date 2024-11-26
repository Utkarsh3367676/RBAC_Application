import { useAuth } from "../context/AuthContext";

export const usePermissions = () => {
  const { currentUser, userPermissions } = useAuth();

  const checkPermission = (resource, action) => {
    if (!currentUser || !userPermissions) return false;
    return userPermissions[resource]?.includes(action) || false;
  };

  return {
    canCreateUser: () => checkPermission("users", "create"),
    canReadUser: () => checkPermission("users", "read"),
    canUpdateUser: () => checkPermission("users", "update"),
    canDeleteUser: () => checkPermission("users", "delete"),

    canCreateRole: () => checkPermission("roles", "create"),
    canReadRole: () => checkPermission("roles", "read"),
    canUpdateRole: () => checkPermission("roles", "update"),
    canDeleteRole: () => checkPermission("roles", "delete"),
  };
};
