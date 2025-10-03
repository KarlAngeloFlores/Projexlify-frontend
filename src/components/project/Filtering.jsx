import { Table, Filter, Search, Plus } from "lucide-react";

const Filtering = ({
  searchTerm,
  setSearchTerm,
  selectedStatus,
  setSelectedStatus,
  taskStatuses,
  viewMode,
  setViewMode,
  setShowCreateModal,
}) => {
  const handleSearching = (e) => {
    setViewMode("table");
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 transition-all duration-200">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={handleSearching}
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
        />
      </div>

      {/* Filters & Controls */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 w-full sm:w-auto">
        {viewMode === "table" && (
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400 shrink-0" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="flex-1 sm:w-auto bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm cursor-pointer"
            >
              <option value="all">All Status</option>
              {taskStatuses.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* View Mode */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Table className="w-5 h-5 text-gray-500 dark:text-gray-400 shrink-0" />
          <select
            onChange={(e) => setViewMode(e.target.value)}
            value={viewMode}
            className="flex-1 sm:w-auto bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm cursor-pointer"
          >
            <option value="kanban">Column</option>
            <option value="table">Table</option>
          </select>
        </div>

        {/* Create Button */}
        <button
          onClick={() => setShowCreateModal(true)}
          className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-600 dark:to-purple-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-700 dark:hover:to-purple-700 transition-all transform hover:scale-105 flex items-center justify-center sm:justify-start shadow-lg cursor-pointer"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Task
        </button>
      </div>
    </div>
  );
};

export default Filtering;
