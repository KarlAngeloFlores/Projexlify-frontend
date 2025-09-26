import { X, History, Calendar, User, ArrowRight } from "lucide-react";
import util from "../../utils/util";
import Status from "../Status"
import Button from "../Button";

const ViewHistoryModal = ({ isOpen, onClose, history }) => {
  if (!isOpen || !history) return null;

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
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
              <History className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Task History
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                View history details
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
        <div className="p-6 space-y-4">
          {/* Task Name */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">
              Task
            </h3>
            <p className="text-sm font-medium text-gray-900 dark:text-white whitespace-normal break-words">
              {history.task_name}
            </p>
          </div>

          {/* Status Change */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">
              Status Change
            </h3>
            <div className="flex items-center gap-2">
              {history.old_status ? (
                <>
                  <Status status={history.old_status}/>{" "}
                  <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  <Status status={history.new_status} />
                </>
              ) : (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Created as</span>
              <Status status={history.new_status} />
            </div>
              )}
            </div>
          </div>

          {/* Remark */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">
              Remark
            </h3>
            <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-normal break-words">
              {history.remark || "No remarks provided."}
            </p>
          </div>

          {/* Updated By & Date */}
          <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{history.updated_by}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">
                {util.formatDateComplete(history.created_at)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 mt-6 p-6 border-t border-gray-200 dark:border-gray-700">
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

export default ViewHistoryModal;
