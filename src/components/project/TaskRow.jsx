import { Calendar, Clock, Edit, Eye, Trash2 } from "lucide-react";
import util from "../../utils/util";
import Status from "../Status";

const TaskRow = ({ task, index, handleOpenUpdate, handleOpenDelete, handleOpenView }) => {
  return (
    <tr
      key={task.id}
      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
    >
      {/* ID */}
      <td className="px-6 py-4">
        <span className="font-mono text-sm text-gray-700 dark:text-gray-300">
          #{task.id}
        </span>
      </td>

      {/* Task Name */}
      <td className="px-6 py-4 max-w-[200px] min-w-[200px]">
        <div className="font-medium text-gray-900 dark:text-gray-200 text-sm truncate">
          {task.name}
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <Status status={task.status} />
      </td>

      {/* Contents */}
      <td className="px-6 py-4 max-w-[180px]">
        {task.contents ? (
          <div
            className="text-gray-600 dark:text-gray-300 text-sm truncate"
            title={task.contents}
          >
            {task.contents}
          </div>
        ) : (
          <span className="italic text-gray-400 dark:text-gray-500">
            No content
          </span>
        )}
      </td>

      {/* Created At */}
      <td className="px-6 py-4">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Calendar className="w-3 h-3 mr-1" />
          {util.formatDateComplete(task.created_at)}
        </div>
      </td>

      {/* Updated At */}
      <td className="px-6 py-4">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Clock className="w-3 h-3 mr-1" />
          {util.formatDateComplete(task.updated_at)}
        </div>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 text-center">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => handleOpenUpdate(task)}
            className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
          >
            <Edit className="w-4 h-4" /> Edit
          </button>
          <button
            onClick={() => handleOpenDelete(task)}
            className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-600/30 rounded transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
                    <button
            onClick={() => handleOpenView(task)}
            className="flex items-center gap-1 px-3 py-1 text-sm text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-red-green/30 rounded transition-colors"
          >
            <Eye className="w-4 h-4" /> View
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TaskRow;
