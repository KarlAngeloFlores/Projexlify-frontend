import { Search, Filter } from "lucide-react";

const Filtering = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by task name, ID, or user..."
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Status Filter */}
      <div className="flex items-center gap-2">
        <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400 shrink-0" />
        <select
          className="flex-1 sm:w-auto bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>
  );
};

export default Filtering;
