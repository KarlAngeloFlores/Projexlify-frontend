import { useEffect, useState } from "react";
import { ArrowLeft, History } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import TaskTable from "../components/history/TaskTable";
import ProjectHistoryTable from "../components/history/ProjectTable"; // 👈 import this
import logService from "../services/logs";
import Filtering from "../components/history/Filtering";
import LoadingScreen from "../components/LoadingScreen";
import ErrorPage from "../pages/ErrorPage";
import Logout from "../components/Logout";
import userService from "../services/user";

const HistoryPage = () => {
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [projectHistory, setProjectHistory] = useState([]);
  const [taskHistory, setTaskHistory] = useState([]);
  const [user, setUser] = useState(null);

  const [projectPage, setProjectPage] = useState(1);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const member = await userService.getUser();
      const taskLogs = await logService.getTaskHistory(projectId);
      const historyLogs = await logService.getProjectHistory(projectId);

      setProjectHistory(historyLogs.data);
      setTaskHistory(taskLogs.data);
      setUser(member.data);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchData();
    }
  }, [projectId]);

  //10 per page
  const itemsPerPage = 10;
  const filteredData = taskHistory.filter((item) => {
    const matchesSearch =
      item.task_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.updated_by.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.task_id.toString().includes(searchTerm);
    const matchesStatus =
      statusFilter === "all" || item.new_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  //5 per page
  const projectItemsPerPage = 5;
  const totalProjectPages = Math.ceil(projectHistory.length / projectItemsPerPage);
  const projectStartIndex = (projectPage - 1) * projectItemsPerPage;
  const paginatedProjectHistory = projectHistory.slice(
    projectStartIndex,
    projectStartIndex + projectItemsPerPage
  );

  if (error) {
    return <ErrorPage />;
  }
  if (loading) {
    return <LoadingScreen message="Loading project history..." />;
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
                className="mr-4 p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="sm:text-3xl text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent flex items-center">
                  <History className="w-8 h-8 mr-3 text-blue-600 dark:text-blue-400" />
                  History
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1 sm:text-base text-sm max-w-[80%]">
                  Track all project and task status changes
                </p>
              </div>
            </div>
            <Logout user={user} />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

       {/* Project History Table */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
            Project History
          </h2>
          <ProjectHistoryTable data={paginatedProjectHistory} projectLength={projectHistory.length} />
          
          {/* Project Pagination */}
          {totalProjectPages > 1 && (
            <div className="flex items-center justify-between mt-6 bg-white/80 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 shadow-sm">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <span>
                  Page {projectPage} of {totalProjectPages}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setProjectPage(Math.max(1, projectPage - 1))}
                  disabled={projectPage === 1}
                  className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => setProjectPage(Math.min(totalProjectPages, projectPage + 1))}
                  disabled={projectPage === totalProjectPages}
                  className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
        

        {/* Task History Table */}
        <div>
          <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
            Task History
          </h2>

          {/* Task Filters */}
          <Filtering
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />

          <TaskTable
            data={paginatedData}
            filteredLength={filteredData.length}
            currentLength={paginatedData.length}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 bg-white/80 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 shadow-sm">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <span>
                  Page {currentPage} of {totalPages}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default HistoryPage;