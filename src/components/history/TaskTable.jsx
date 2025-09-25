import { Calendar } from "lucide-react";
import TaskRow from "./TaskRow";

const TaskTable = ({ data, filteredLength, currentLength }) => {
  // Define columns here
  const tableColumns = [
    { key: "task", label: "Task" },
    { key: "status_change", label: "Status Change" },
    { key: "remark", label: "Remark" },
    { key: "updated_by", label: "Updated By" },
    { key: "date_time", label: "Date & Time" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-300 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 dark:bg-gray-900/60 border-b border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300">
            <tr>
              {tableColumns.map((col) => (
                <th key={col.key} className="px-6 py-4 font-medium">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-gray-800 dark:text-gray-200">
            {data.map((item) => (
              <TaskRow key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            No history found
          </h3>
          <p className="text-gray-500 dark:text-gray-500">
            No task history matches your current filters.
          </p>
        </div>
      )}

      {/* Results Summary */}
      <div className="px-6 py-3 bg-gray-100 dark:bg-gray-900/60 border-t border-gray-300 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
        Showing {currentLength} of {filteredLength} entries
      </div>
    </div>
  );
};

export default TaskTable;
