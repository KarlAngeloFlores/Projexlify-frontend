import React, { useEffect, useState } from "react";
import { Plus, FolderOpen, ChevronDown } from "lucide-react";
import projectsService from "../services/projects";
import ProjectCard from "../components/home/ProjectCard";
import LoadingScreen from "../components/LoadingScreen";
import CreateProjectModal from "../components/home/CreateProjectModal";
import UpdateProjectModal from "../components/home/UpdateProjectModal";
import DeleteProjectModal from "../components/home/DeleteProjectModal";
import ProjectTable from "../components/home/ProjectTable";
import Filtering from "../components/home/Filtering";
import ErrorPage from "./ErrorPage";
import Logout from "../components/Logout";
import userService from "../services/user";

const Home = () => {

  const [error, setError] = useState('');
  const [projects, setProjects] = useState([]);
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState("cards");

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);

  const handleFetchHome = async () => {
    try {
      setLoading(true);
      const memberData = await userService.getUser();
      const projectsData = await projectsService.getAllProjectsByUser();
      console.log(memberData);

      setMember(memberData.data);
      setProjects(projectsData.data || []);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (name, description) => {
    try {
      const data = await projectsService.createProject(name, description);
      console.log(data.project);

      setProjects([...projects, data.project]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleOpenUpdate = (project) => {
    setSelectedProject(project);
    setShowUpdateModal(true);
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
      console.log(data.project);

      setProjects((prev) =>
        prev.map((project) =>
          project.id === projectId ? { ...project, ...newProject } : project
        )
      );
    } catch (error) {
      console.log(error);

      throw error;
    }
  };

  const handleOpenDelete = (project) => {
    setSelectedProject(project);
    setShowDeleteModal(true);
  };

  const handleSoftDelete = async (projectId, remark) => {
    try {
      const data = await projectsService.deleteProject(projectId, remark);
      console.log(data);

      setProjects((prev) => prev.filter((project) => project.id !== projectId));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

    //filter projects based on search and status
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

  useEffect(() => {
    handleFetchHome();
  }, []);

  if(error) {
    return <ErrorPage />
  }

  if (loading) {
    return <LoadingScreen message="Loading your projects..." />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="sm:text-3xl text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                My Projects
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1 sm:text-base text-sm">
                Welcome back! You have{" "}
                {filteredProjects.length} projects.
              </p>
            </div>

        <Logout user={member}/>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <Filtering
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          viewMode={viewMode}
          setViewMode={setViewMode}
          setShowCreateModal={setShowCreateModal}
        />

        {/* Projects Grid */}
        {/* Projects Grid / Table */}
        {/* Projects Grid / Views */}
        {filteredProjects.length === 0 ? (
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
                : "Create your first project to get started"}
            </p>
            {!searchTerm && statusFilter === "all" && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-600 dark:to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-700 dark:hover:to-purple-700 transition-all transform hover:scale-105 flex items-center mx-auto shadow-lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Project
              </button>
            )}
          </div>
        ) : (
          <>

            {/**CARD VIEW */}
            {viewMode === "cards" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={`project-${project.id}`}
                    project={project}
                    handleOpenUpdate={handleOpenUpdate}
                    handleOpenDelete={handleOpenDelete}
                    handleDelete={handleSoftDelete}
                  />
                ))}
              </div>
            )}
            
            {/**TABLE VIEW */}
            {viewMode === "table" && (
              <ProjectTable
                projects={filteredProjects}
                handleOpenUpdate={handleOpenUpdate}
                handleOpenDelete={handleOpenDelete}
              />
            )}
            
          </>
        )}
      </div>

      <CreateProjectModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateProject={handleCreateProject}
      />

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

export default Home;