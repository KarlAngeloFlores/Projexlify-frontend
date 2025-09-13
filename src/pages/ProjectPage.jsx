import { useEffect, useState } from 'react'
import { 
  Plus, 
  Search, 
  CheckCircle2, 
  Clock, 
  Play, 
  ArrowLeft,
  ListTodo,
  ChevronDown
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
import authService from '../services/auth'
import Logout from '../components/Logout'

const ProjectPage = ({}) => {

  const navigate = useNavigate();
  const { projectId } = useParams();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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

  const handleGetAllTasks = async () => {
    try {
      setLoading(true)

      const data = await tasksService.getAllTasks(projectId);
      const project = await projectsService.getProject(projectId);
      const memberData = await authService.getMember();
      
      setTimeout(() => {
        setTasks(data.tasks || []);
        setProject(project.data);
        setUser(memberData.data);
        setLoading(false)
      }, 1000)
      
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const handleCreateTask = async (name, status, contents) => {
      try {
        
        const data = await tasksService.createTask(projectId, name, status, contents);
        const newTask = data.task;
        
        console.log(data);

        setTasks(prev => [...prev, newTask]);

      } catch (error) {
        console.log(error);
        throw error;
      }
  }
  
  const handleOpenUpdate = (task) => {
    setSeletectedTask(task);
    setShowUpdateModal(true)
  }

  const handleUpdateTask = async (taskId, name, contents, newStatus, remark) => {
    try {

      const data = await tasksService.updateTask(projectId, taskId, name, contents, newStatus, remark);
      console.log(data.updated_task);
      
      const updatedTask = data.updated_task;
      setTasks((prev) => prev.map((task) => task.id === taskId ? { ...task, ...updatedTask } : task));

    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  const handleOpenDelete = (task) => {
    setSeletectedTask(task);
    setShowDeleteModal(true);
  }

  const handleDeleteTask = async (taskId, remark) => {
    try {
      
      const data = await tasksService.deleteTask(taskId, projectId, remark);
      console.log(data.task_id);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));

    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  useEffect(() => {
    if (projectId) {
      handleGetAllTasks()
    }
  }, [projectId]);

  // Filter and sort tasks
  const filteredAndSortedTasks = tasks
    .filter(task => {
      const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.contents.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]
      
      if (sortBy === 'created_at' || sortBy === 'updated_at') {
        aValue = new Date(aValue)
        bValue = new Date(bValue)
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  const getStatusConfig = (status) => {
    const config = taskStatuses.find(s => s.id === status) || taskStatuses[0]
    const colorMap = {
      blue: { bg: 'bg-blue-500/20', border: 'border-blue-500/30', text: 'text-blue-300' },
      yellow: { bg: 'bg-yellow-500/20', border: 'border-yellow-500/30', text: 'text-yellow-300' },
      green: { bg: 'bg-green-500/20', border: 'border-green-500/30', text: 'text-green-300' },
    }
    return { ...config, colors: colorMap[config.color] }
  }

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('desc')
    }
  }

  if (loading) {
    return (
      <LoadingScreen message='Loading your tasks...'/>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

          {/**Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={() => navigate('/home')} className="mr-4 p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent flex items-center">
                  <ListTodo className="w-8 h-8 mr-3 text-blue-400" />
                  Project Tasks
                </h1>
                <p className="text-gray-400 mt-1">
                  Project ID: {projectId} • {tasks.length} tasks
                </p>
              </div>
            </div>


            <Logout user={user}/>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Project Info Section */}
        <ProjectInfo project={project}/>

        {/* Filters and Search */}
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

        {filteredAndSortedTasks.length === 0 ? (
          <div className="text-center py-16 rounded-lg border border-gray-700">
            {tasks.length === 0 ? (
              <>
              <div className='py-6'>
                <ListTodo className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No tasks yet</h3>
                <p className="text-gray-500 mb-6">Create your first task to get started</p>
                <button onClick={() => setShowCreateModal(true)} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center mx-auto">
                  <Plus className="w-5 h-5 mr-2" />
                  Create Task
                </button>
              </div>
              </>
            ) : (
              <>
                <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No matching tasks</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </>
            )}
          </div>
        ) : (
          <>

            { viewMode === "table" && (
              <TaskTable 
                tasks={filteredAndSortedTasks}
                sortBy={sortBy}
                sortOrder={sortOrder}
                handleSort={handleSort}
                getStatusConfig={getStatusConfig}
                handleOpenUpdate={handleOpenUpdate}
                handleOpenDelete={handleOpenDelete}
              />
            )}

            { viewMode === "kanban" && (
              <Kanban 
              tasks={filteredAndSortedTasks} 
              setTasks={setTasks}
              projectId={projectId}
              />
            )}

          </>
        )}
      </div>

        {<CreateTaskModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateTask={handleCreateTask}
        />}

        {<UpdateTaskModal 
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onUpdateTask={handleUpdateTask}
        task={selectedTask}
        />}

        {
        <DeleteTaskModal 
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDeleteTask={handleDeleteTask}
        task={selectedTask}
        /> 
        }

    </div>
  )
}

export default ProjectPage