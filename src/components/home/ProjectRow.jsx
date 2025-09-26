import { Pencil, Trash2, History } from "lucide-react";
import util from "../../utils/util";
import { useNavigate } from "react-router-dom";
import StatusProject from "../StatusProject";

const ProjectRow = ({ project, handleOpenUpdate, handleOpenDelete }) => {
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
          ? "opacity-60 cursor-not-allowed"
          : "hover:bg-gray-50 dark:hover:bg-gray-800/30"
      }`}
    >
      {/* Project Name */}
      <td className="px-6 py-4">
        <div
          onClick={navigateProject}
          className={`font-medium ${
            isDeleted
              ? "text-gray-400 dark:text-gray-500 cursor-not-allowed"
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
          <button
            onClick={() => !isDeleted && handleOpenUpdate(project)}
            disabled={isDeleted}
            className={`flex items-center gap-1 px-3 py-1 text-sm rounded transition-colors ${
              isDeleted
                ? "text-gray-400 dark:text-gray-500 cursor-not-allowed"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <Pencil className="w-4 h-4" /> Edit
          </button>

          <button
            onClick={() => !isDeleted && handleOpenDelete(project)}
            disabled={isDeleted}
            className={`flex items-center gap-1 px-3 py-1 text-sm rounded transition-colors ${
              isDeleted
                ? "text-gray-400 dark:text-gray-500 cursor-not-allowed"
                : "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-600/30"
            }`}
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>

          <button
            onClick={() => !isDeleted && navigate(`/history/${project.id}`)}
            disabled={isDeleted}
            className={`flex items-center gap-1 px-3 py-1 text-sm rounded transition-colors ${
              isDeleted
                ? "text-gray-400 dark:text-gray-500 cursor-not-allowed"
                : "text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-600/30"
            }`}
          >
            <History className="w-4 h-4" /> History
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProjectRow;
