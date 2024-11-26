import React, { useState } from "react";
import RoleForm from "./RoleForm";
import { usePermissions } from "../../hooks/usePermissions";

function RoleList({ roles, setRoles, permissions }) {
  const [showForm, setShowForm] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const userPermissions = usePermissions();

  const handleDelete = (roleId) => {
    if (!userPermissions.canDeleteRole()) return;
    setRoles(roles.filter((role) => role.id !== roleId));
  };

  const handleEdit = (role) => {
    if (!userPermissions.canUpdateRole()) return;
    setEditingRole(role);
    setShowForm(true);
  };

  const handleSubmit = (roleData) => {
    if (editingRole && !userPermissions.canUpdateRole()) return;
    if (!editingRole && !userPermissions.canCreateRole()) return;

    if (editingRole) {
      setRoles(
        roles.map((role) =>
          role.id === editingRole.id ? { ...roleData, id: role.id } : role
        )
      );
    } else {
      setRoles([...roles, { ...roleData, id: roles.length + 1 }]);
    }
    setShowForm(false);
    setEditingRole(null);
  };

  const handleCloneRole = (role) => {
    const clonedRole = {
      ...role,
      id: roles.length + 1,
      name: `${role.name} (Copy)`,
    };
    setRoles([...roles, clonedRole]);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Roles</h1>
        {userPermissions.canCreateRole() && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Role
          </button>
        )}
      </div>

      {showForm && (
        <RoleForm
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingRole(null);
          }}
          permissions={permissions}
          initialData={editingRole}
        />
      )}

      <div className="grid gap-4">
        {roles.map((role) => (
          <div key={role.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{role.name}</h3>
              <div className="space-x-2">
                {userPermissions.canUpdateRole() && (
                  <button
                    onClick={() => handleEdit(role)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                )}
                {userPermissions.canDeleteRole() && (
                  <button
                    onClick={() => handleDelete(role.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              {Object.entries(role.permissions).map(([resource, actions]) => (
                <div key={resource} className="text-sm">
                  <span className="font-semibold capitalize">{resource}:</span>
                  <span className="ml-2 text-gray-600">
                    {actions.join(", ")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoleList;
