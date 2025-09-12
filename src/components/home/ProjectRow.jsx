import { Pencil, Trash2, Clock, PlayCircle, CheckCircle2 } from "lucide-react";
import util from "../../utils/util";
import { useNavigate } from "react-router-dom";

const ProjectRow = ({ project, handleOpenUpdate, handleOpenDelete }) => {

const navigate = useNavigate();
const navigateProject = () => {
    navigate(`/project/${project.id}`);
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "planned":
        return <Clock className="w-4 h-4 text-blue-400" />;
      case "active":
        return <PlayCircle className="w-4 h-4 text-green-400" />;
      case "completed":
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <tr className="border-b border-gray-700 hover:bg-gray-800/30">
      {/* Project Name */}
      <td className="px-4 py-3 font-medium text-white hover:underline cursor-pointer hover:text-blue-300" onClick={navigateProject}>{project.name}</td>

      {/* Status */}
      <td className="px-4 py-3 flex items-center gap-2 text-sm">
        {getStatusIcon(project.status)}
        <span className="capitalize">{project.status}</span>
      </td>

      {/* Description */}
      <td className="px-4 py-3 text-gray-300 truncate max-w-xs">
        {project.description || "—"}
      </td>

      {/* Created At */}
      <td className="px-4 py-3 text-gray-400 text-sm">
        {util.formatDateMDY(project.created_at)}
      </td>

      {/* Updated At */}
      <td className="px-4 py-3 text-gray-400 text-sm">
        {util.formatDateMDY(project.updated_at)}
      </td>

      {/* Owner/User ID */}
      <td className="px-4 py-3 text-gray-400 text-sm">{project.user_id}</td>

      {/* Actions */}
      <td className="px-4 py-3">
        <div className="flex gap-2">
          <button
            onClick={() => handleOpenUpdate(project)}
            className="flex items-center gap-1 px-3 py-1 text-sm text-gray-300 hover:bg-gray-700 rounded"
          >
            <Pencil className="w-4 h-4" /> Edit
          </button>
          <button
            onClick={() => handleOpenDelete(project)}
            className="flex items-center gap-1 px-3 py-1 text-sm text-red-400 hover:bg-red-600/30 rounded"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProjectRow;
