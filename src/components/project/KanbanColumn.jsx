import React from "react";
import { useDroppable } from "@dnd-kit/core";
import KanbanTask from "./KanbanTask";
import { PlusSquare, ClipboardCheck } from "lucide-react";

// ✅ Enhanced Droppable Kanban Column with improved colors
const KanbanColumn = ({ id, title, tasks }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  const getColumnStyle = () => {
    const baseStyles = "flex flex-col rounded-2xl p-4 shadow-xl border transition-all duration-300 w-full backdrop-blur-sm";
    
    if (title ===  'To Do') {
      return `${baseStyles} bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-slate-600/50 hover:border-slate-500/70`;
    } else if (title === 'In Progress') {
      return `${baseStyles} bg-gradient-to-br from-amber-900/20 to-orange-900/20 border-amber-600/30 hover:border-amber-500/50`;
    } else if (title === 'Done') {
      return `${baseStyles} bg-gradient-to-br from-emerald-900/20 to-green-900/20 border-emerald-600/30 hover:border-emerald-500/50`;
    }
  };

  const getHeaderColor = () => {
    if (title ===  'To Do') {
      return 'text-slate-200';
    } else if (title === 'In Progress') {
      return 'text-amber-200';
    } else if (title === 'Done') {
      return 'text-emerald-200';
    }
  };

  const getDropZoneStyle = () => {
    const baseStyle = "flex-1 space-y-3 rounded-xl p-3 transition-all duration-200 flex flex-col gap-2";
    
    if (isOver) {
      if (title === 'To Do') {
        return `${baseStyle} bg-slate-500/30 border-2 border-slate-400/50 border-dashed`;
      } else if (title === 'In Progress') {
        return `${baseStyle} bg-amber-500/30 border-2 border-amber-400/50 border-dashed`;
      } else if (title === 'Done') {
        return `${baseStyle} bg-emerald-500/30 border-2 border-emerald-400/50 border-dashed`;
      }
    }
  };

  const getPlusButtonStyle = () => {
    if (title === 'To Do') {
      return 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50';
    } else if (title === 'In Progress') {
      return 'text-amber-400 hover:text-amber-200 hover:bg-amber-700/50';
    } else if (title === 'Done') {
      return 'text-emerald-400 hover:text-emerald-200 hover:bg-emerald-700/50';
    }
  };

  return (
    <div
      ref={setNodeRef}
      className={getColumnStyle()}
    >
      {/* Enhanced Column Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h2 className={`text-xl font-bold tracking-wide ${getHeaderColor()}`}>
            {title}
          </h2>
          <span className="bg-white/10 text-white/70 text-xs px-2 py-1 rounded-full font-medium">
            {tasks.length}
          </span>
        </div>
        <button 
          className={`${getPlusButtonStyle()} transition-all duration-200 p-2 rounded-lg hover:scale-105 active:scale-95`}
          title="Add new task"
        >
          <PlusSquare size={20} />
        </button>
      </div>

      {/* Enhanced Task Container */}
      <div className={getDropZoneStyle()}>
        {tasks.length > 0 ? (
          tasks.map((task) => <KanbanTask key={task.id} task={task} />)
        ) : (
          <div className=" flex items-center justify-center flex-col p-4">
            <div className="text-4xl mb-2 opacity-20"><ClipboardCheck  /></div>
            <p className="text-sm text-gray-400 font-medium">
              No tasks yet
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Click the + button to add a task
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;