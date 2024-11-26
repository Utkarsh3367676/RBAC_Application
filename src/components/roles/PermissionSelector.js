import React from "react";

function PermissionSelector({
  resource,
  availablePermissions,
  selectedPermissions,
  onChange,
}) {
  const handleToggle = (permission) => {
    const newPermissions = selectedPermissions.includes(permission)
      ? selectedPermissions.filter((p) => p !== permission)
      : [...selectedPermissions, permission];
    onChange(newPermissions);
  };

  return (
    <div className="mb-4">
      <h4 className="text-sm font-medium text-gray-700 capitalize mb-2">
        {resource}
      </h4>
      <div className="flex flex-wrap gap-2">
        {availablePermissions.map((permission) => (
          <label key={permission} className="inline-flex items-center">
            <input
              type="checkbox"
              checked={selectedPermissions.includes(permission)}
              onChange={() => handleToggle(permission)}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span className="ml-2 text-sm text-gray-700 capitalize">
              {permission}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default PermissionSelector;
