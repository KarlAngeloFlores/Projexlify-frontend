import { useDraggable } from "@dnd-kit/core";
import { Calendar, FileText, GripVertical } from "lucide-react";
import util from "../../utils/util";

const KanbanTask = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: String(task.id),
  });

  // Enhanced mobile-optimized styling
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition: isDragging ? "none" : "transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    willChange: "transform",
    zIndex: isDragging ? 9999 : "auto",
    // Mobile optimizations
    touchAction: "none", // Prevents scrolling while dragging
    userSelect: "none",
    WebkitUserSelect: "none",
    // Enhanced visual feedback for dragging
    opacity: isDragging ? 0.8 : 1,
    scale: isDragging ? 1.05 : 1,
    filter: isDragging ? "drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))" : "none",
  };

  // Get status-based styling with enhanced mobile touch targets
  const getTaskStyling = () => {
    const baseClasses = "relative p-4 rounded-xl shadow-lg border cursor-grab hover:shadow-xl group mb-4 select-none touch-none";
    
    switch (task.status) {
      case 'todo':
        return `${baseClasses} bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-50 dark:to-slate-100 border-gray-300 dark:border-slate-200 hover:border-gray-400 dark:hover:border-slate-300 text-gray-800 dark:text-slate-800 active:scale-[1.02]`;
      case 'in_progress':
        return `${baseClasses} bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-50 dark:to-orange-50 border-amber-300 dark:border-amber-200 hover:border-amber-400 dark:hover:border-amber-300 text-amber-900 dark:text-amber-900 active:scale-[1.02]`;
      case 'done':
        return `${baseClasses} bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-50 dark:to-green-50 border-emerald-300 dark:border-emerald-200 hover:border-emerald-400 dark:hover:border-emerald-300 text-emerald-900 dark:text-emerald-900 active:scale-[1.02]`;
    }
  };

  const getDragHandleColor = () => {
    switch (task.status) {
      case 'todo':
        return 'text-gray-400 dark:text-slate-400 group-hover:text-gray-600 dark:group-hover:text-slate-600';
      case 'in_progress':
        return 'text-amber-400 dark:text-amber-400 group-hover:text-amber-600 dark:group-hover:text-amber-600';
      case 'done':
        return 'text-emerald-400 dark:text-emerald-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-600';
    }
  };

  const getBorderColor = () => {
    switch (task.status) {
      case 'todo':
        return 'border-gray-300 dark:border-black/10';
      case 'in_progress':
        return 'border-amber-300 dark:border-black/10';
      case 'done':
        return 'border-emerald-300 dark:border-black/10';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`${getTaskStyling()} ${isDragging ? 'z-[9999] cursor-grabbing' : ''}`}
    > 
      
      {/* Enhanced Drag Handle - Always visible on mobile */}
      <div 
        className={`absolute top-3 right-3 ${getDragHandleColor()} transition-all duration-200 md:opacity-0 md:group-hover:opacity-100 opacity-60 touch-none p-1`}
        style={{ touchAction: 'none' }}
      >
        <GripVertical size={18} />
      </div>

      {/* Task Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-base leading-tight pr-8 break-words">
          {task.name}
        </h3>
      </div>

      {/* Task Content */}
      {task.contents && (
        <div className="mb-3">
          <div className="flex items-center mb-2">
            <FileText size={14} className="mr-2 opacity-60 flex-shrink-0" />
            <span className="text-xs font-medium opacity-70">Content</span>
          </div>
          <p className="text-sm opacity-80 leading-relaxed line-clamp-3 break-words">
            {task.contents}
          </p>
        </div>
      )}

      {/* Task Footer */}
      <div className={`flex items-center justify-between text-xs mt-4 pt-3 border-t ${getBorderColor()}`}>
        {/* Created Date */}
        <div className="flex items-center opacity-60">
          <Calendar size={12} className="mr-1 flex-shrink-0" />
          <span className="truncate">Created {util.formatDateComplete(task.created_at)}</span>
        </div>
      </div>

    </div>
  );
};

export default KanbanTask;