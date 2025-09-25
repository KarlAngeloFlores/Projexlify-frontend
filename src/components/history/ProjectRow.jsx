import { ArrowRight, FileText, User, Clock } from "lucide-react";
import util from "../../utils/util";
import StatusProject from "../StatusProject";

const ProjectRow = ({ item }) => {
  return (
    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
      {/* Project Info */}
      <td className="px-6 py-4 max-w-3xs">
        <div>
          <div className="font-medium text-gray-900 dark:text-gray-200 mt-1 truncate">
            Project
          </div>
        </div>
      </td>

      {/* Status Change */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {item.old_status ? (
            <>
              <StatusProject status={item.old_status} />
              <ArrowRight className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <StatusProject status={item.new_status} />
            </>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Created as
              </span>
              <StatusProject status={item.new_status} />
            </div>
          )}
        </div>
      </td>

      {/* Remark */}
      <td className="px-6 py-4">
        {item.remark ? (
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <FileText className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-xs truncate">{item.remark}</span>
          </div>
        ) : (
          <span className="text-sm text-gray-500 dark:text-gray-400 italic">
            No remark
          </span>
        )}
      </td>

      {/* Updated By */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
            {item.updated_by}
          </span>
        </div>
      </td>

      {/* Date & Time */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {util.formatDateComplete(item.created_at)}
          </span>
        </div>
      </td>
    </tr>
  );
};

export default ProjectRow;
