import { ArrowRight, FileText, User, Clock } from "lucide-react";

const StatusBadge = ({ status }) => {
  if (!status)
    return (
      <span className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded-full border border-gray-600">
        New
      </span>
    );

  const statusStyles = {
    todo: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
    in_progress: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
    completed: "bg-green-500/20 text-green-300 border border-green-500/30",
    cancelled: "bg-red-500/20 text-red-300 border border-red-500/30",
  };

  return (
    <span
      className={`px-2 py-1 text-xs rounded-full ${
        statusStyles[status] || "bg-gray-700 text-gray-300 border border-gray-600"
      }`}
    >
      {status?.replace("_", " ").toUpperCase() || "UNKNOWN"}
    </span>
  );
};

const TaskRow = ({ item, formatDate }) => {
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
              <StatusBadge status={item.old_status} />
              <ArrowRight className="w-4 h-4 text-gray-500" />
              <StatusBadge status={item.new_status} />
            </>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Created as</span>
              <StatusBadge status={item.new_status} />
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
            {formatDate(item.created_at)}
          </span>
        </div>
      </td>
    </tr>
  );
};

export default TaskRow;
