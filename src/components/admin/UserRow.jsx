import { Pencil, Trash2 } from "lucide-react";

const UserRow = ({ user, handleOpenUpdate, handleOpenDelete }) => {
  return (
    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
      {/* ID */}
      <td className="px-6 py-4 text-gray-900 dark:text-gray-200">{user.id}</td>

      {/* Username */}
      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
        {user.username}
      </td>

      {/* Email */}
      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
        {user.email}
      </td>

      {/* Created At */}
      <td className="px-6 py-4">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(user.created_at).toLocaleString()}
        </span>
      </td>

      {/* Updated At */}
      <td className="px-6 py-4">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(user.updated_at).toLocaleString()}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex gap-2">
          <button
            onClick={() => handleOpenUpdate(user)}
            className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors cursor-pointer"
          >
            <Pencil className="w-4 h-4" /> Edit
          </button>
          <button
            onClick={() => handleOpenDelete(user)}
            className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-600/30 rounded transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
