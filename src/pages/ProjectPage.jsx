import { useEffect, useState } from 'react'
import { 
  Plus, 
  Search, 
  CheckCircle2, 
  Clock, 
  Play, 
  ArrowLeft,
  ListTodo,
} from 'lucide-react'
import LoadingScreen from '../components/LoadingScreen'
import { useNavigate, useParams } from 'react-router-dom'
import tasksService from '../services/tasks'
import Filtering from '../components/project/Filtering'
import TaskTable from '../components/project/TaskTable'
import CreateTaskModal from '../components/project/CreateTaskModal'
import UpdateTaskModal from '../components/project/UpdateTaskModal'
import DeleteTaskModal from '../components/project/DeleteTaskModal'
import Kanban from '../components/project/Kanban'
import projectsService from '../services/projects'
import ProjectInfo from '../components/project/ProjectInfo'
import Logout from '../components/Logout'
import UpdateProjectModal from '../components/home/UpdateProjectModal'
import userService from '../services/user'
import ViewTaskModal from '../components/project/ViewTaskModal'

const ProjectPage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showProjectEditModal, setShowProjectEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [selectedTask, setSeletectedTask] = useState(null);
  const [user, setUser] = useState([]);
  const [project, setProject] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [sortBy, setSortBy] = useState('created_at')
  const [sortOrder, setSortOrder] = useState('desc')
  const [viewMode, setViewMode] = useState('table');

  const taskStatuses = [
    { id: 'todo', label: 'To Do', icon: Clock, color: 'blue' },
    { id: 'in_progress', label: 'In Progress', icon: Play, color: 'yellow' },
    { id: 'done', label: 'Done', icon: CheckCircle2, color: 'green' },
  ];

  const handleOpenUpdateProject = () => setShowProjectEditModal(true);

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
      setProject(data.project);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleGetAllTasks = async () => {
    try {
      setLoading(true);
      const data = await tasksService.getAllTasks(projectId);
      console.log(data);
      const project = await projectsService.getProject(projectId);
      const memberData = await userService.getUser();
      
      setTimeout(() => {
        setTasks(data.tasks || []);
        setProject(project.data);
        setUser(memberData.data);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleCreateTask = async (name, status, contents) => {
    try {
      const data = await tasksService.createTask(projectId, name, status, contents);
      setTasks(prev => [...prev, data.task]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  const handleOpenUpdate = (task) => {
    setSeletectedTask(task);
    setShowUpdateModal(true);
  };

  const handleUpdateTask = async (taskId, name, contents, newStatus, remark) => {
    try {
      const data = await tasksService.updateTask(projectId, taskId, name, contents, newStatus, remark);
      setTasks((prev) => prev.map((task) => task.id === taskId ? { ...task, ...data.updated_task } : task));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleOpenView = (task) => {
    setSeletectedTask(task)
    setShowViewModal(true);
  }

  const handleOpenDelete = (task) => {
    setSeletectedTask(task);
    setShowDeleteModal(true);
  };

  const handleDeleteTask = async (taskId, remark) => {
    try {
      await tasksService.deleteTask(taskId, projectId, remark);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    if (projectId) handleGetAllTasks();
  }, [projectId]);

  // Filter + sort tasks
  const filteredAndSortedTasks = tasks
    .filter(task => {
      const matchesSearch =
        task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.contents.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      if (sortBy === 'created_at' || sortBy === 'updated_at') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      return sortOrder === 'asc'
        ? aValue > bValue ? 1 : -1
        : aValue < bValue ? 1 : -1;
    });

  const getStatusConfig = (status) => {
    const config = taskStatuses.find(s => s.id === status) || taskStatuses[0];
    const colorMap = {
      blue: { bg: 'bg-blue-500/20', border: 'border-blue-500/30', text: 'text-blue-600 dark:text-blue-300' },
      yellow: { bg: 'bg-yellow-500/20', border: 'border-yellow-500/30', text: 'text-yellow-600 dark:text-yellow-300' },
      green: { bg: 'bg-green-500/20', border: 'border-green-500/30', text: 'text-green-600 dark:text-green-300' },
    };
    return { ...config, colors: colorMap[config.color] };
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  if (loading) {
    return <LoadingScreen message='Loading your tasks...' />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => navigate(-1)} 
                className="mr-4 p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="sm:text-3xl text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent flex items-center">
                  <ListTodo className="w-8 h-8 mr-3 text-blue-600 dark:text-blue-400" />
                  Tasks
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1 sm:text-base text-sm max-w-[80%]">
                  {tasks.length} tasks
                </p>
              </div>
            </div>
            <Logout user={user}/>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Project Info */}
        <ProjectInfo 
          project={project}
          openUpdateModal={handleOpenUpdateProject}
        />

        {/* Filters */}
        <Filtering 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          selectedStatus={selectedStatus} 
          setSelectedStatus={setSelectedStatus} 
          taskStatuses={taskStatuses}
          viewMode={viewMode}
          setViewMode={setViewMode}
          setShowCreateModal={() => setShowCreateModal(true)}
        />

        {/* Task Views */}
        {filteredAndSortedTasks.length === 0 ? (
          <div className="text-center py-16 bg-white/60 dark:bg-gray-900/40 rounded-lg border border-gray-200 dark:border-gray-700">
            {tasks.length === 0 ? (
              <>
                <ListTodo className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  No tasks yet
                </h3>
                <p className="text-gray-500 dark:text-gray-500 mb-6">
                  Create your first task to get started
                </p>
                <button 
                  onClick={() => setShowCreateModal(true)} 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-600 dark:to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-700 dark:hover:to-purple-700 transition-all transform hover:scale-105 flex items-center mx-auto"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create Task
                </button>
              </>
            ) : (
              <>
                <Search className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  No matching tasks
                </h3>
                <p className="text-gray-500 dark:text-gray-500">
                  Try adjusting your search or filters
                </p>
              </>
            )}
          </div>
        ) : (
          <>
            {viewMode === "table" && (
              <TaskTable 
                tasks={filteredAndSortedTasks}
                sortBy={sortBy}
                sortOrder={sortOrder}
                handleSort={handleSort}
                getStatusConfig={getStatusConfig}
                handleOpenUpdate={handleOpenUpdate}
                handleOpenDelete={handleOpenDelete}
                handleOpenView={handleOpenView}
              />
            )}
            {viewMode === "kanban" && (
              <Kanban 
                tasks={filteredAndSortedTasks} 
                setTasks={setTasks}
                projectId={projectId}
              />
            )}
          </>
        )}
      </div>

      {/* Modals */}
      <CreateTaskModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateTask={handleCreateTask}
      />
      <UpdateTaskModal 
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onUpdateTask={handleUpdateTask}
        task={selectedTask}
      />
      <DeleteTaskModal 
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDeleteTask={handleDeleteTask}
        task={selectedTask}
      />
      <UpdateProjectModal 
        isOpen={showProjectEditModal}
        onClose={() => setShowProjectEditModal(false)}
        onUpdateProject={handleUpdateProject}
        project={project}
      />

      <ViewTaskModal 
      isOpen={showViewModal}
      onClose={() => setShowViewModal(false)}
      task={selectedTask}
      />
    </div>
  )
}

export default ProjectPage
