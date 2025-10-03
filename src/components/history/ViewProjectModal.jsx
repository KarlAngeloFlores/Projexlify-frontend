import { X, History, Calendar, User, ArrowRight } from "lucide-react";
import util from "../../utils/util";
import StatusProject from "../StatusProject"
import Button from "../Button";

const ViewProjectModal = ({ isOpen, onClose, projectHistory }) => {
  if (!isOpen || !projectHistory) return null;

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
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
              <History className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Project History
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                View project status changes
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Status Change */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">
              Status Change
            </h3>
            <div className="flex items-center gap-2">
              {projectHistory.old_status ? (
                <>
                  <StatusProject status={projectHistory.old_status}/>
                  <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  <StatusProject status={projectHistory.new_status}/>
                </>
              ) : (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Created as</span>
              <StatusProject status={projectHistory.new_status} />
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
              {projectHistory.remark || "No remarks provided."}
            </p>
          </div>

          {/* Updated By & Date */}
          <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{projectHistory.updated_by}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">
                {util.formatDateComplete(projectHistory.created_at)}
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

export default ViewProjectModal;
