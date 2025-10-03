import { FolderOpen, MoreHorizontal, Calendar, User, Trash2, Pencil } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import util from "../../utils/util";
import { useNavigate } from "react-router-dom";
import StatusProject from "../StatusProject";

const ProjectCard = ({ project, handleOpenUpdate, handleOpenDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const navigateProject = () => {
    if (project.status !== "deleted") {
      navigate(`/project/${project.id}`);
    }
  };

  const navigateHistory = () => {
    if (project.status !== "deleted") {
      navigate(`/history/${project.id}`);
    }
  };

  //close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isDeleted = project.status === "deleted";

  return (
    <div
      key={project.id}
      className={`group bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-200 dark:border-gray-700 relative shadow-md dark:shadow-none transition-all overflow-hidden
        ${isDeleted 
          ? "cursor-not-allowed opacity-60 pointer-events-none" 
          : "cursor-pointer hover:border-gray-300 dark:hover:border-gray-600 hover:scale-[1.02]"}
      `}
    >
      {/* Project Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center" onClick={navigateProject}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
              <FolderOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors truncate max-w-[240px]">
                {project.name}
              </h3>
              <StatusProject status={project.status} />
            </div>
          </div>

          {/* More Button + Dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="transition-opacity p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
              disabled={isDeleted}
            >
              <MoreHorizontal className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>

            {menuOpen && !isDeleted && (
              <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                <button
                  onClick={() => {
                    handleOpenUpdate(project);
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-t-lg cursor-pointer"
                >
                  <Pencil className="w-4 h-4" /> Edit
                </button>
                <button
                  onClick={() => {
                    handleOpenDelete(project);
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-600/30 rounded-b-lg cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Project Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Project Meta */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>Created {util.formatDateComplete(project.created_at)}</span>
          </div>
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            <span>ID: {project.user_id}</span>
          </div>
        </div>
      </div>

      {/* Project Actions */}
      <div className="px-6 py-4 bg-gray-50/50 dark:bg-gray-900/30 border-t border-gray-200 dark:border-gray-700 transition-all">
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500 dark:text-gray-500">
            Updated {util.formatDateComplete(project.updated_at)}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={navigateHistory}
              disabled={isDeleted}
              className={`text-sm font-medium transition-colors ${
                isDeleted
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer"
              }`}
            >
              View History
            </button>
            <button
              onClick={navigateProject}
              disabled={isDeleted}
              className={`text-sm font-medium transition-colors ${
                isDeleted
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer"
              }`}
            >
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
