import { Clock, PlayCircle, CheckCircle2 } from "lucide-react";

const StatusProject = ({ status }) => {
  const baseStyle =
    "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border text-nowrap";

  const statusStyle = (status) => {
    switch (status) {
      case "planned":
        return `${baseStyle} bg-blue-500/20 border-blue-500/30 text-blue-700 dark:text-blue-300`;
      case "active":
        return `${baseStyle} bg-yellow-500/20 border-yellow-500/30 text-yellow-700 dark:text-yellow-300`;
      case "completed":
        return `${baseStyle} bg-green-500/20 border-green-500/30 text-green-700 dark:text-green-300`;
      default:
        return `${baseStyle} bg-gray-500/20 border-gray-500/30 text-gray-700 dark:text-gray-300`;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "planned":
        return <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case "active":
        return <PlayCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />;
      case "completed":
        return <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-emerald-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600 dark:text-gray-400" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "planned":
        return "Planned";
      case "active":
        return "Active";
      case "completed":
        return "Completed";
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

export default StatusProject;
