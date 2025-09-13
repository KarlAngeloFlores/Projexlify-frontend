import { ListTodo } from "lucide-react";
import StatusProject from "../StatusProject";
import util from "../../utils/util";

const ProjectInfo = ({ project }) => {
  return (
    <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-6 mb-8 shadow-lg">
      <h2 className="text-2xl font-bold text-white flex items-center truncate">
        <ListTodo className="w-7 h-7 mr-2 text-blue-400" />
        {project?.name || "Untitled Project"}
      </h2>

      <p className="text-gray-400 mt-2">
        {project?.description || "No description available."}
      </p>

      <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
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
