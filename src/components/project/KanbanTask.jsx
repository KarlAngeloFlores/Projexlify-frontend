import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Calendar, FileText, GripVertical } from "lucide-react";

const KanbanTask = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: String(task.id), // dnd-kit requires string ids
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  // Get status-based styling
  const getTaskStyling = () => {
    const baseClasses = "relative p-4 rounded-xl shadow-lg border cursor-grab hover:shadow-xl group mb-4";
    
    switch (task.status) {
      case 'todo':
        return `${baseClasses} bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200 hover:border-slate-300 text-slate-800`;
      case 'in_progress':
        return `${baseClasses} bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 hover:border-amber-300 text-amber-900`;
      case 'done':
        return `${baseClasses} bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 hover:border-emerald-300 text-emerald-900`;
    }
  };

  // Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  // Get drag handle styling based on status
  const getDragHandleColor = () => {
    switch (task.status) {
      case 'todo':
        return 'text-slate-400 group-hover:text-slate-600';
      case 'in_progress':
        return 'text-amber-400 group-hover:text-amber-600';
      case 'done':
        return 'text-emerald-400 group-hover:text-emerald-600';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`${getTaskStyling()} ${isDragging ? '' : ''}`}
    > 
      
      {/* Drag Handle */}
      <div onClick={() => console.log('working')} className={`absolute top-3 right-3 ${getDragHandleColor()} opacity-0 group-hover:opacity-100 transition-opacity`}>
        <GripVertical size={16} />
      </div>

      {/* Task Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-base leading-tight pr-6">
          {task.name}
        </h3>
      </div>

      {/* Task Content */}
      {task.contents && (
        <div className="mb-3">
          <div className="flex items-center mb-2">
            <FileText size={14} className="mr-2 opacity-60" />
            <span className="text-xs font-medium opacity-70">Content</span>
          </div>
          <p className="text-sm opacity-80 leading-relaxed line-clamp-3">
            {task.contents}
          </p>
        </div>
      )}

      {/* Task Footer */}
      <div className="flex items-center justify-between text-xs mt-4 pt-3 border-t border-black/10">
        {/* Created Date */}
        <div className="flex items-center opacity-60">
          <Calendar size={12} className="mr-1" />
          <span>Created {formatDate(task.created_at)}</span>
        </div>

      </div>

      {/* Updated indicator (if recently updated) */}
      {task.updated_at !== task.created_at && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full border-2 border-white shadow-sm"></div>
      )}
    </div>
  );
};

export default KanbanTask;