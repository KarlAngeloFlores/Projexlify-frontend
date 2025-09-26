import { ArrowRight, FileText, User, Clock, Eye } from "lucide-react";
import util from "../../utils/util";
import Status from "../Status";

const TaskRow = ({ item, handleOpenView }) => {
  return (
    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800/30 transition-colors">
      {/* Task Info */}
      <td className="px-6 py-4 min-w-[200px] max-w-[200px]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">#{item.task_id}</span>
          </div>
          <div className="font-medium text-gray-800 dark:text-gray-200 mt-1 overflow-hidden text-ellipsis max-w-[200px]">
            {item.task_name}
          </div>
        </div>
      </td>

      {/* Status Change */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {item.old_status ? (
            <>
              <Status status={item.old_status} />
              <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
              <Status status={item.new_status} />
            </>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Created as</span>
              <Status status={item.new_status} />
            </div>
          )}
        </div>
      </td>

      {/* Remark */}
<td className="px-6 py-4 max-w-[200px]">
  {item.remark ? (
    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
      <FileText className="w-4 h-4 flex-shrink-0 text-gray-400 dark:text-gray-500" />
      <p className="text-xs overflow-hidden whitespace-nowrap text-ellipsis">
        {item.remark}
      </p>
    </div>
  ) : (
    <span className="text-sm text-gray-400 italic">No remark</span>
  )}
</td>

      {/* Updated By */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200 max-w-[100px] min-w-[100px] overflow-hidden text-ellipsis">
            {item.updated_by}
          </span>
        </div>
      </td>

      {/* Date & Time */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {util.formatDateComplete(item.created_at)}
          </span>
        </div>
      </td>

      <td>
          <button
            onClick={() => handleOpenView(item)}
            className="flex items-center gap-1 px-3 py-1 text-sm text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-red-green/30 rounded transition-colors"
          >
            <Eye className="w-4 h-4" /> View
          </button>
      </td>
    </tr>
  );
};

export default TaskRow;
