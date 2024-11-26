import React from "react";

function UserCard({ user, role, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
        <span
          className={`px-2 py-1 rounded text-sm ${
            user.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {user.status}
        </span>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-600">
          Role: <span className="font-semibold">{role?.name}</span>
        </p>
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        {onEdit && (
          <button
            onClick={onEdit}
            className="text-blue-600 hover:text-blue-800"
          >
            Edit
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default UserCard;
