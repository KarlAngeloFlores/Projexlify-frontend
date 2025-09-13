import { Calendar, Clock, Edit, Trash2 } from "lucide-react";
import util from "../../utils/util";
import Status from "../Status";

const TaskRow = ({ task, index, handleOpenUpdate, handleOpenDelete }) => {

  return (
    <tr
      key={task.id}
      className={`border-b border-gray-700 hover:bg-gray-800/30 transition-colors ${
        index % 2 === 0 ? "bg-gray-900/20" : ""
      }`}
    >
      <td className="py-4 px-6 text-gray-400 font-mono text-sm">#{task.id}</td>

      <td className="py-4 px-6">
        <div className="font-medium text-white">{task.name}</div>
      </td>

      <td className="py-4 px-6">
        {<Status status={task.status}/>}
      </td>

      <td className="py-4 px-6 max-w-1/2">
        <div
          className="text-gray-300 text-sm max-w-xs truncate"
          title={task.contents}
        >
          {task.contents}
        </div>
      </td>

      <td className="py-4 px-6 text-gray-400 text-sm">
        <div className="flex items-center">
          <Calendar className="w-3 h-3 mr-1" />
          {util.formatDateComplete(task.created_at)}
        </div>
      </td>

      <td className="py-4 px-6 text-gray-400 text-sm">
        <div className="flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          {util.formatDateComplete(task.updated_at)}
        </div>
      </td>

      <td className="py-4 px-6 text-right">
        <div className="flex items-center justify-end gap-2">
          <button onClick={() => handleOpenUpdate(task)} className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-700 rounded-lg transition-colors">
            <Edit className="w-4 h-4" />
          </button>
          <button onClick={() => handleOpenDelete(task)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TaskRow;
