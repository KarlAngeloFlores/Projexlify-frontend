import { ChevronDown } from "lucide-react";
import TaskRow from "./TaskRow";

const TaskTable = ({ tasks, sortBy, sortOrder, handleSort, handleOpenUpdate, handleOpenDelete }) => {

  const tableColumns = [
                { key: "id", label: "ID" },
                { key: "name", label: "Task Name" },
                { key: "status", label: "Status", sortable: false },
                { key: "contents", label: "Content", sortable: false },
                { key: "created_at", label: "Created" },
                { key: "updated_at", label: "Updated" },
                { key: "actions", label: "Actions", sortable: false, align: "right" },
              ]

  return (
    <div className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-900/50 border-b border-gray-700">
            <tr>
              {tableColumns.map(({ key, label, sortable = true, align = "left" }) => (
                <th
                  key={key}
                  className={`text-${align} py-4 px-6 text-gray-300 font-semibold`}
                >
                  {sortable ? (
                    <button
                      onClick={() => handleSort(key)}
                      className="flex items-center hover:text-white transition-colors"
                    >
                      {label}
                      <ChevronDown
                        className={`w-4 h-4 ml-1 transition-transform ${
                          sortBy === key
                            ? sortOrder === "desc"
                              ? "rotate-180"
                              : ""
                            : "opacity-0"
                        }`}
                      />
                    </button>
                  ) : (
                    label
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {tasks.map((task, index) => (
              <TaskRow
                key={task.id}
                task={task}
                index={index}
                handleOpenUpdate={handleOpenUpdate}
                handleOpenDelete={handleOpenDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;
