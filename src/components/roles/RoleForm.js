import React, { useState, useEffect } from "react";
import PermissionSelector from "./PermissionSelector";

function RoleForm({ onSubmit, onCancel, permissions, initialData }) {
  const [formData, setFormData] = useState({
    name: "",
    permissions: Object.keys(permissions).reduce(
      (acc, resource) => ({
        ...acc,
        [resource]: [],
      }),
      {}
    ),
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const handlePermissionChange = (resource, selectedPermissions) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [resource]: selectedPermissions,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-[600px]"
      >
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit Role" : "Add New Role"}
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Role Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <h3 className="text-gray-700 text-sm font-bold mb-2">Permissions</h3>
          {Object.entries(permissions).map(([resource, actions]) => (
            <PermissionSelector
              key={resource}
              resource={resource}
              availablePermissions={actions}
              selectedPermissions={formData.permissions[resource]}
              onChange={(selected) =>
                handlePermissionChange(resource, selected)
              }
            />
          ))}
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {initialData ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default RoleForm;
