import { Pencil, Trash2, Clock, PlayCircle, CheckCircle2, History } from "lucide-react";
import util from "../../utils/util";
import { useNavigate } from "react-router-dom";
import StatusProject from "../StatusProject";

const ProjectRow = ({ project, handleOpenUpdate, handleOpenDelete }) => {
  const navigate = useNavigate();

  const navigateProject = () => {
    navigate(`/project/${project.id}`);
  };



  return (
    <tr className="border-b border-gray-700 hover:bg-gray-800/30 transition-colors">
      {/* Project Name */}
      <td className="px-6 py-4">
        <div
          onClick={navigateProject}
          className="font-medium text-gray-200 hover:underline hover:text-blue-300 cursor-pointer"
        >
          {project.name}
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
    <StatusProject status={project.status}/>
      </td>

      {/* Description */}
      <td className="px-6 py-4 text-gray-300 text-sm truncate max-w-xs">
        {project.description || (
          <span className="italic text-gray-500">No description</span>
        )}
      </td>

      {/* Created At */}
      <td className="px-6 py-4">
        <span className="text-sm text-gray-400">
          {util.formatDateComplete(project.created_at)}
        </span>
      </td>

      {/* User */}
      <td className="px-6 py-4">
        <span className="text-sm font-medium text-gray-200">{project.user_id}</span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex gap-2">
          <button
            onClick={() => handleOpenUpdate(project)}
            className="flex items-center gap-1 px-3 py-1 text-sm text-gray-300 hover:bg-gray-700 rounded transition-colors"
          >
            <Pencil className="w-4 h-4" /> Edit
          </button>
          <button
            onClick={() => handleOpenDelete(project)}
            className="flex items-center gap-1 px-3 py-1 text-sm text-red-400 hover:bg-red-600/30 rounded transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
          <button
            onClick={() => navigate(`/history/${project.id}`)}
            className="flex items-center gap-1 px-3 py-1 text-sm text-blue-400 hover:bg-blue-600/30 rounded transition-colors"
          >
            <History className="w-4 h-4" /> History
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProjectRow;
