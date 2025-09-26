import { X, ListTodo, Calendar, Clock } from "lucide-react";
import Status from "../Status";
import util from "../../utils/util";
import Button from "../Button";

const ViewTaskModal = ({ isOpen, onClose, task }) => {
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="modal-animation relative w-full max-w-lg bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
              <ListTodo className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Task Details
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                View task information
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-3">
          {/* Task Name */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">
              Task Name
            </h3>
            <p className="text-sm font-medium text-gray-900 dark:text-white whitespace-normal break-words">
              {task.name}
            </p>
          </div>

          {/* Status */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">
              Status
            </h3>
            <Status status={task.status} />
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">
              Contents
            </h3>
            <p className="text-gray-800 dark:text-gray-200 text-sm whitespace-normal break-words">
              {task.contents || "No description provided."}
            </p>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div className="flex flex-col">
                <p className="text-sm font-medium">Created:</p>
                <p className="text-sm">{util.formatDateComplete(task.created_at)}</p>
              </div>
            </div>

            <div className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div className="flex flex-col">
                <p className="text-sm font-medium">Updated:</p>
                <p className="text-sm">{util.formatDateComplete(task.updated_at)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <Button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewTaskModal;
