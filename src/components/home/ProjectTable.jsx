import React from "react";
import ProjectRow from "./ProjectRow";


const ProjectTable = ({ projects, handleOpenUpdate, handleOpenDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm border border-gray-700 rounded-lg overflow-hidden">
        <thead className="bg-gray-900/60 text-gray-300">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Description</th>
            <th className="px-4 py-3">Created</th>
            <th className="px-4 py-3">Updated</th>
            <th className="px-4 py-3">Owner</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="">
          {projects.map((project) => (
            <ProjectRow
              key={project.id}
              project={project}
              handleOpenUpdate={handleOpenUpdate}
              handleOpenDelete={handleOpenDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
