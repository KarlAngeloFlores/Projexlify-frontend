import { ListTodo } from "lucide-react"

const ProjectInfo = ({project}) => {

    const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
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
    <span className="px-3 py-1 rounded-full border border-gray-700 bg-gray-800">
      Status: <span className="font-medium capitalize">{project?.status}</span>
    </span>
    <span>
      Created: {project?.created_at ? formatDate(project.created_at) : "N/A"}
    </span>
    <span>
      Updated: {project?.updated_at ? formatDate(project.updated_at) : "N/A"}
    </span>
  </div>
</div>
  )
}

export default ProjectInfo