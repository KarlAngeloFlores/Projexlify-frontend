import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import KanbanColumn from "../../components/project/KanbanColumn";
import tasksService from "../../services/tasks";

const Kanban = ({ tasks, setTasks, projectId }) => {
  const syncPositionStatus = async (tasks, taskId, newStatus) => {
    try {
      
      const result = await tasksService.syncPositionStatus(tasks, taskId, newStatus, projectId);

    } catch (error) {
      console.log(error);
    }
  }

const handleDragEnd = async (event) => {
  const { active, over } = event;
  if (!over) return; //ends

  const taskId = parseInt(active.id);
  const newStatus = over.id;

  console.log(over)

  //Prepare updated tasks outside setTasks
  let updatedTasks;
  let withPositions;
  let changedTask;

  //update task array if new status changed
  setTasks((prevTasks) => {
    updatedTasks = prevTasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );

    withPositions = updatedTasks.map((task, _, arr) => {
      const sameColumn = arr.filter((t) => t.status === task.status);
      // console.log(sameColumn);
      const newIndex = sameColumn.findIndex((t) => t.id === task.id);
      return { ...task, position: newIndex };
    });

    changedTask = withPositions.find((t) => t.id === taskId);

    return withPositions;
  });

  //API call OUTSIDE setTasks -> avoids double call of api
  if (changedTask) {
    // console.log("PROJECTID:", projectId);
    // console.log("Changed task:", changedTask);
    // console.log(withPositions);

    await syncPositionStatus(withPositions, changedTask.id, changedTask.status);
  }
};

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
        <KanbanColumn
          id="todo"
          title="To Do"
          tasks={tasks.filter((t) => t.status === "todo")}
          color="#f97316"
        />
        <KanbanColumn
          id="in_progress"
          title="In Progress"
          tasks={tasks.filter((t) => t.status === "in_progress")}
          color="#3b82f6"
        />
        <KanbanColumn
          id="done"
          title="Done"
          tasks={tasks.filter((t) => t.status === "done")}
          color="#22c55e"
        />
      </div>
    </DndContext>
  );
}

export default Kanban;