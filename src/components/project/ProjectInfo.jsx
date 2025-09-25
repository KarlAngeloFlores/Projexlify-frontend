import { ListTodo, Edit, Clock } from "lucide-react";
import StatusProject from "../StatusProject";
import util from "../../utils/util";
import { useNavigate } from "react-router-dom";

const ProjectInfo = ({ project, openUpdateModal }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 mb-8 shadow-lg transition-all">
      {/* Header */}
      <div className="w-full flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center truncate">
          <ListTodo className="w-7 h-7 mr-2 text-blue-600 dark:text-blue-400" />
          {project?.name || "Untitled Project"}
        </h2>

        <div className="flex items-center gap-1">
          <button
            onClick={openUpdateModal}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate(`/history/${project.id}`)}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Clock className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        {project?.description || "No description available."}
      </p>

      {/* Metadata */}
      <div className="flex items-center gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
        <span>
          <StatusProject status={project.status} />
        </span>
        <span>
          Created:{" "}
          {project?.created_at
            ? util.formatDateComplete(project.created_at)
            : "N/A"}
        </span>
        <span>
          Updated:{" "}
          {project?.updated_at
            ? util.formatDateComplete(project.updated_at)
            : "N/A"}
        </span>
      </div>
    </div>
  );
};

export default ProjectInfo;
