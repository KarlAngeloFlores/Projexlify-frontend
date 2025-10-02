import React, { useEffect, useState, useMemo } from "react";
import ProjectTable from "../../components/home/ProjectTable";
import projectsService from "../../services/projects";
import { Search, Table, Filter, ClipboardList, Play, CheckCircle, Trash2, FolderOpen } from "lucide-react";
import UpdateProjectModal from "../../components/home/UpdateProjectModal";
import DeleteProjectModal from "../../components/home/DeleteProjectModal";
import AdminProjectCard from "../../components/admin/AdminProjectCard";

const Projects = ({ projects, setProjects }) => {
  const [viewMode, setViewMode] = useState("cards");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenUpdate = (project) => {
    setSelectedProject(project);
    setShowUpdateModal(true);
  };

  const handleOpenDelete = (project) => {
    setSelectedProject(project);
    setShowDeleteModal(true);
  };

  const handleUpdateProject = async (
    projectId,
    name,
    description,
    newStatus,
    remark
  ) => {
    try {
      const data = await projectsService.updateProject(
        projectId,
        name,
        description,
        newStatus,
        remark
      );

      const newProject = data.project;

      setProjects((prev) =>
        prev.map((project) =>
          project.id === projectId ? { ...project, ...newProject } : project
        )
      );
    } catch (error) {
      throw error;
    }
  };

  const handleSoftDelete = async (projectId, remark) => {
    try {
      const data = await projectsService.deleteProject(projectId, remark);
      const deletedProject = data.project;

      setProjects((prev) =>
        prev.map((project) =>
          project.id === projectId ? { ...project, ...deletedProject } : project
        )
      );
    } catch (error) {
      throw error;
    }
  };

  const handleHardDelete = async (projectId) => {
    try {
      await projectsService.hardDeleteProject(projectId);

      setProjects((prev) =>
        prev.filter((project) => project.id !== projectId)
      );
    } catch (error) {
      throw error;
    }
  };

  const handleRestore = async (projectId) => {
    try {
      const data = await projectsService.restoreProject(projectId);
      const restoredProject = data.project;

      setProjects((prev) =>
        prev.map((project) =>
          project.id === projectId ? { ...project, ...restoredProject } : project
        )
      );
    } catch (error) {
      throw error;
    }
  };

  //Count stats
  const stats = useMemo(() => {
    return {
      planned: projects.filter((p) => p.status === "planned").length,
      active: projects.filter((p) => p.status === "active").length,
      completed: projects.filter((p) => p.status === "completed").length,
      deleted: projects.filter((p) => p.status === "deleted").length,
    };
  }, [projects]);

  //Filtering
  const filteredProjects = projects.filter((project) => {
    const name = project.name || "";
    const description = project.description || "";
    const status = project.status || "";

    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">

      {/* Dashboard stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
          <ClipboardList className="w-6 h-6 text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Planned</p>
            <p className="text-xl font-semibold">{stats.planned}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
          <Play className="w-6 h-6 text-green-500" />
          <div>
            <p className="text-sm text-gray-500">Active</p>
            <p className="text-xl font-semibold">{stats.active}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
          <CheckCircle className="w-6 h-6 text-purple-500" />
          <div>
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-xl font-semibold">{stats.completed}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
          <Trash2 className="w-6 h-6 text-red-500" />
          <div>
            <p className="text-sm text-gray-500">Deleted</p>
            <p className="text-xl font-semibold">{stats.deleted}</p>
          </div>
        </div>
      </div>

      {/* Filters and search */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
          />
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 w-full sm:w-auto">
          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400 shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1 sm:w-auto bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
            >
              <option value="all">All Status</option>
              <option value="planned">Planned</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="deleted">Deleted</option>
            </select>
          </div>

          {/* View Mode */}
          <div className="flex items-center gap-2">
            <Table className="w-5 h-5 text-gray-500 dark:text-gray-400 shrink-0" />
            <select
              onChange={(e) => setViewMode(e.target.value)}
              value={viewMode}
              className="flex-1 sm:w-auto bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
            >
              <option value="cards">Card</option>
              <option value="table">Table</option>
            </select>
          </div>
        </div>
      </div>

      {
        filteredProjects.length === 0 ? 
        (<>
          <div className="text-center py-16 bg-white/60 dark:bg-gray-900/40 rounded-lg border border-gray-200 dark:border-gray-700">
            <FolderOpen className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              {searchTerm || statusFilter !== "all"
                ? "No matching projects"
                : "No projects yet"}
            </h3>
            <p className="text-gray-500 dark:text-gray-500 mb-6">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filters"
                : "No users created any projects"}
            </p>
          </div>
        </>) 
        : 
        (<>
        {/* Projects content */}
      <div>
        {viewMode === "cards" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <AdminProjectCard
                key={`project-${project.id}`}
                project={project}
                handleOpenUpdate={handleOpenUpdate}
                handleOpenDelete={handleOpenDelete}
                handleHardDelete={handleHardDelete}
                handleRestore={handleRestore}
              />
            ))}
          </div>
        )}

        {viewMode === "table" && (
          <ProjectTable
            projects={filteredProjects}
            handleOpenUpdate={handleOpenUpdate}
            handleOpenDelete={handleOpenDelete}
          />
        )}
      </div>
        </>)
      }

      <UpdateProjectModal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        project={selectedProject}
        onUpdateProject={handleUpdateProject}
      />

      <DeleteProjectModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        project={selectedProject}
        onDeleteProject={handleSoftDelete}
      />
    </div>
  );
};

export default Projects;
