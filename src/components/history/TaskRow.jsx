import { ArrowRight, FileText, User, Clock } from "lucide-react";
import util from "../../utils/util";
import Status from "../Status";

const TaskRow = ({ item }) => {
  return (
    <tr className="border-b border-gray-700 hover:bg-gray-800/30 transition-colors">
      {/* Task Info */}
      <td className="px-6 py-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">#{item.task_id}</span>
          </div>
          <div className="font-medium text-gray-200 mt-1">
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
              <ArrowRight className="w-4 h-4 text-gray-500" />
              <Status status={item.new_status} />
            </>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Created as</span>
              <Status status={item.new_status} />
            </div>
          )}
        </div>
      </td>

      {/* Remark */}
      <td className="px-6 py-4">
        {item.remark ? (
          <div className="flex items-center gap-2 text-gray-300">
            <FileText className="w-4 h-4 text-gray-500" />
            <span className="text-sm">{item.remark}</span>
          </div>
        ) : (
          <span className="text-sm text-gray-500 italic">No remark</span>
        )}
      </td>

      {/* Updated By */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-200">
            {item.updated_by}
          </span>
        </div>
      </td>

      {/* Date & Time */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-400">
            {util.formatDateComplete(item.created_at)}
          </span>
        </div>
      </td>
    </tr>
  );
};

export default TaskRow;
