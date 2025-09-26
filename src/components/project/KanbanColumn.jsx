import { useDroppable } from "@dnd-kit/core";
import { ClipboardCheck } from "lucide-react";
import KanbanTask from "./KanbanTask";

const KanbanColumn = ({ id, title, tasks }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

const getColumnStyle = () => {
  const baseStyles =
    "flex flex-col rounded-2xl p-4 shadow-xl border w-full backdrop-blur-sm";

  switch (title) {
    case "To Do":
      return `${baseStyles} bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-slate-800/90 dark:to-slate-900/90 border-gray-400 dark:border-slate-600/50 hover:border-gray-500 dark:hover:border-slate-500/70`;
    case "In Progress":
      return `${baseStyles} bg-gradient-to-br from-amber-200/80 to-orange-200 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-400 dark:border-amber-600/30 hover:border-amber-500 dark:hover:border-amber-500/50`;
    case "Done":
      return `${baseStyles} bg-gradient-to-br from-green-200 to-green-400/50 dark:from-emerald-900/20 dark:to-green-900/20 border-emerald-400 dark:border-emerald-600/30 hover:border-emerald-500 dark:hover:border-emerald-500/50`;
    default:
      return baseStyles;
  }
};

const getHeaderColor = () => {
  switch (title) {
    case "To Do":
      return "text-gray-800 dark:text-slate-200";
    case "In Progress":
      return "text-amber-800 dark:text-amber-200";
    case "Done":
      return "text-emerald-800 dark:text-emerald-200";
    default:
      return "";
  }
};

const getDropZoneStyle = () => {
  const baseStyle =
    "flex-1 space-y-3 rounded-xl p-3 transition-all duration-100 flex flex-col gap-2";

  if (!isOver) return baseStyle;

  switch (title) {
    case "To Do":
      return `${baseStyle} bg-gray-400/60 dark:bg-slate-500/30 border-2 border-gray-600 dark:border-slate-400/50 border-dashed`;
    case "In Progress":
      return `${baseStyle} bg-amber-400/60 dark:bg-amber-500/30 border-2 border-amber-600 dark:border-amber-400/50 border-dashed`;
    case "Done":
      return `${baseStyle} bg-emerald-400/60 dark:bg-emerald-500/30 border-2 border-emerald-600 dark:border-emerald-400/50 border-dashed`;
    default:
      return baseStyle;
  }
};

  return (
    <div
      ref={setNodeRef}
      className={getColumnStyle()}
    >

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h2 className={`text-xl font-bold tracking-wide ${getHeaderColor()}`}>
            {title}
          </h2>
          <span className="bg-gray-400/90 dark:bg-white/10 text-gray-900 dark:text-white/70 text-xs px-2 py-1 rounded-full font-medium">
            {tasks.length}
          </span>
        </div>
      </div>

      {/* Enhanced Task Container */}
      <div className={getDropZoneStyle()}>
        {tasks.length > 0 ? (
          tasks.map((task) => <KanbanTask key={task.id} task={task} />)
        ) : (
          <div className="flex items-center justify-center flex-col p-4">
            <div className="text-4xl mb-2 opacity-50 text-gray-400 dark:text-gray-200"><ClipboardCheck /></div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              No tasks yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;