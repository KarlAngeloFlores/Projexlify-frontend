import { useDroppable } from "@dnd-kit/core";
import { ClipboardCheck } from "lucide-react";
import KanbanTask from "./KanbanTask";


const KanbanColumn = ({ id, title, tasks }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

const getColumnStyle = () => {
  const baseStyles =
    "flex flex-col rounded-2xl p-4 shadow-xl border transition-all duration-300 w-full backdrop-blur-sm";

  switch (title) {
    case "To Do":
      return `${baseStyles} bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-slate-600/50 hover:border-slate-500/70`;
    case "In Progress":
      return `${baseStyles} bg-gradient-to-br from-amber-900/20 to-orange-900/20 border-amber-600/30 hover:border-amber-500/50`;
    case "Done":
      return `${baseStyles} bg-gradient-to-br from-emerald-900/20 to-green-900/20 border-emerald-600/30 hover:border-emerald-500/50`;
    default:
      return baseStyles;
  }
};


const getHeaderColor = () => {
  switch (title) {
    case "To Do":
      return "text-slate-200";
    case "In Progress":
      return "text-amber-200";
    case "Done":
      return "text-emerald-200";
    default:
      return "";
  }
};

const getDropZoneStyle = () => {
  const baseStyle =
    "flex-1 space-y-3 rounded-xl p-3 transition-all duration-200 flex flex-col gap-2";

  if (!isOver) return baseStyle;

  switch (title) {
    case "To Do":
      return `${baseStyle} bg-slate-500/30 border-2 border-slate-400/50 border-dashed`;
    case "In Progress":
      return `${baseStyle} bg-amber-500/30 border-2 border-amber-400/50 border-dashed`;
    case "Done":
      return `${baseStyle} bg-emerald-500/30 border-2 border-emerald-400/50 border-dashed`;
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
          <span className="bg-white/10 text-white/70 text-xs px-2 py-1 rounded-full font-medium">
            {tasks.length}
          </span>
        </div>
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

          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;