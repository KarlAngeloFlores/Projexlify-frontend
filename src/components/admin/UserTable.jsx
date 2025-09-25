import React from "react";
import UserRow from "./UserRow";

const UserTable = ({ users, handleOpenUpdate, handleOpenDelete }) => {
  const tableColumns = [
    { key: "id", label: "ID" },
    { key: "username", label: "Username" },
    { key: "email", label: "Email" },
    { key: "created_at", label: "Created At" },
    { key: "updated_at", label: "Updated At" },
    { key: "actions", label: "Actions" },
  ];

  return (
    <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-md dark:shadow-none">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50/80 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
            <tr>
              {tableColumns.map(({ key, label }) => (
                <th
                  key={key}
                  className="py-4 px-6 text-gray-700 dark:text-gray-300 font-semibold text-left"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  handleOpenUpdate={handleOpenUpdate}
                  handleOpenDelete={handleOpenDelete}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={tableColumns.length}
                  className="px-6 py-6 text-center text-gray-500 dark:text-gray-400"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
