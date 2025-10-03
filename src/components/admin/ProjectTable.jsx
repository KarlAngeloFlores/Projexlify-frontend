import ProjectRow from "./ProjectRow";

const ProjectTable = ({ projects, handleOpenUpdate, handleOpenDelete, handleRestore, handleHardDelete }) => {
  return (
    <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-md dark:shadow-none">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50/80 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="py-4 px-6 text-gray-700 dark:text-gray-300 font-semibold text-left">Name</th>
              <th className="py-4 px-6 text-gray-700 dark:text-gray-300 font-semibold text-left">Status</th>
              <th className="py-4 px-6 text-gray-700 dark:text-gray-300 font-semibold text-left">Description</th>
              <th className="py-4 px-6 text-gray-700 dark:text-gray-300 font-semibold text-left">Created</th>
              <th className="py-4 px-6 text-gray-700 dark:text-gray-300 font-semibold text-left">Owner</th>
              <th className="py-4 px-6 text-gray-700 dark:text-gray-300 font-semibold text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project) => (
              <ProjectRow
                key={project.id}
                project={project}
                handleOpenUpdate={handleOpenUpdate}
                handleOpenDelete={handleOpenDelete}
                handleRestore={handleRestore}
                handleHardDelete={handleHardDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectTable;