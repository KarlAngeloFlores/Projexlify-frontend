import React, { useEffect, useState } from 'react';
import { ArrowLeft, ChevronDown, History } from 'lucide-react';
// import TaskTable from './TaskTable';
import { useNavigate, useParams } from 'react-router-dom';
import TaskTable from '../components/history/TaskTable';
import logService from '../services/logs';
import Filtering from '../components/history/Filtering';
import authService from '../services/auth';
import LoadingScreen from '../components/LoadingScreen';
import ErrorPage from '../pages/ErrorPage';
import Logout from '../components/Logout';

const HistoryPage = () => {

    const [loading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { projectId } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);


  const itemsPerPage = 10;

  const [taskHistory, setTaskHistory] = useState([]);
  const [user, setUser] = useState(null);
  const [project, setProject] = useState([]);

  const fetchData = async () => {
    
    try {
      setIsLoading(true);
        // const project = await projectsService.getProject(projectId);
        const member = await authService.getMember();
        const taskLogs = await logService.getTaskHistory(projectId);

        setTaskHistory(taskLogs.data)
        setUser(member.data);

    } catch (error) {
        console.log(error);
        setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  //fetch on mount
  useEffect(() => {
    if(projectId) {
        fetchData();
    }
  }, [projectId]);

  if(error) {
    return <ErrorPage />
  }

  if(loading) {
    return (<LoadingScreen message='Loading project history...'/>)
  }

  // Filter
  const filteredData = taskHistory.filter(item => {
    const matchesSearch =
      item.task_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.updated_by.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.task_id.toString().includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || item.new_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);


return (
  <>
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate("/home")}
                className="mr-4 p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent flex items-center">
                  <History className="w-8 h-8 mr-3 text-blue-400" />
                  History
                </h1>
                <p className="text-gray-400 mt-1">
                  Track all task status changes and updates
                </p>
              </div>
            </div>

            <Logout user={user}/>

          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Filtering
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {/* Table */}
        <TaskTable
          data={paginatedData}
          filteredLength={filteredData.length}
          currentLength={paginatedData.length}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3">
            <div className="flex items-center text-sm text-gray-400">
              <span>
                Page {currentPage} of {totalPages}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border border-gray-700 rounded-md text-gray-300 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border border-gray-700 rounded-md text-gray-300 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  </>
);

};

export default HistoryPage;
