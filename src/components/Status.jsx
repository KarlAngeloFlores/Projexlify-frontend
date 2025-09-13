import { CheckCircle2, PlayCircle, Clock, Trash } from "lucide-react";

const Status = ({ status }) => {
  const statusStyle = (status) => {
    const baseStyle =
      "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border text-nowrap";

    switch (status) {
      case "todo":
        return `${baseStyle} bg-blue-500/20 text-blue-300 border-blue-500/30`;
      case "in_progress":
        return `${baseStyle} bg-yellow-500/20 text-yellow-300 border-yellow-500/30`;
      case "done":
        return `${baseStyle} bg-green-500/20 text-green-300 border-green-500/30`;
      case "deleted":
        return `${baseStyle} bg-red-500/20 text-red-300 border-red-500/30`
      default:
        return baseStyle;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "todo":
        return <Clock className="w-4 h-4" />;
      case "in_progress":
        return <PlayCircle className="w-4 h-4" />;
      case "done":
        return <CheckCircle2 className="w-4 h-4" />;
      case "deleted": 
        return <Trash className="w-4 h-4"/>
      default:
        return null
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "todo":
        return "To Do";
      case "in_progress":
        return "In Progress";
      case "done":
        return "Done";
      case "deleted":
        return "Deleted"
      default:
        return "Unknown";
    }
  };

  return (
    <span className={statusStyle(status)}>
      {getStatusIcon(status)}
      {getStatusText(status)}
    </span>
  );
};

export default Status;
