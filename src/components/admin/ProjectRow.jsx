import { Pencil, Trash2, History, RotateCcw } from "lucide-react";
import util from "../../utils/util";
import { useNavigate } from "react-router-dom";
import StatusProject from "../StatusProject";

const ProjectRow = ({ 
  project, 
  handleOpenUpdate, 
  handleOpenDelete, 
  handleRestore, 
  handleHardDelete 
}) => {
  const navigate = useNavigate();
  const isDeleted = project.status === "deleted";

  const navigateProject = () => {
    if (!isDeleted) {
      navigate(`/project/${project.id}`);
    }
  };

  return (
    <tr
      className={`border-b border-gray-200 dark:border-gray-700 transition-colors ${
        isDeleted
          ? "bg-red-50/40 dark:bg-red-900/20 opacity-80"
          : "hover:bg-gray-50 dark:hover:bg-gray-800/30"
      }`}
    >
      {/* Project Name */}
      <td className="px-6 py-4 max-w-[200px] min-w-[200px] truncate overflow-hidden">
        <div
          onClick={navigateProject}
          className={`font-medium ${
            isDeleted
              ? "text-gray-400 dark:text-gray-500 cursor-not-allowed line-through"
              : "text-gray-900 dark:text-gray-200 hover:underline hover:text-blue-600 dark:hover:text-blue-300 cursor-pointer"
          }`}
        >
          {project.name}
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <StatusProject status={project.status} />
      </td>

      {/* Description */}
      <td className="px-6 py-4 text-gray-600 dark:text-gray-300 text-sm truncate max-w-xs">
        {project.description || (
          <span className="italic text-gray-400 dark:text-gray-500">No description</span>
        )}
      </td>

      {/* Created At */}
      <td className="px-6 py-4">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {util.formatDateComplete(project.created_at)}
        </span>
      </td>

      {/* User */}
      <td className="px-6 py-4">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {project.user_id}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex gap-2">
          {isDeleted ? (
            <>
              <button
                onClick={() => handleRestore(project.id)}
                className="flex items-center gap-1 px-3 py-1 text-sm text-green-600 dark:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Restore
              </button>
              <button
                onClick={() => handleHardDelete(project.id)}
                className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-600/30 rounded transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" /> Delete Permanently
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleOpenUpdate(project)}
                className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors cursor-pointer"
              >
                <Pencil className="w-4 h-4" /> Edit
              </button>
              <button
                onClick={() => handleOpenDelete(project)}
                className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-600/30 rounded transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
              <button
                onClick={() => navigate(`/history/${project.id}`)}
                className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-600/30 rounded transition-colors cursor-pointer"
              >
                <History className="w-4 h-4" /> History
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default ProjectRow;
