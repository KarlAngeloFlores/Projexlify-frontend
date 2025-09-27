import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import KanbanColumn from "../../components/project/KanbanColumn";
import tasksService from "../../services/tasks";

const Kanban = ({ tasks, setTasks, projectId }) => {
  //enhanced sensors for better mobile experience
  const sensors = useSensors(
    //mouse/pointer sensor with higher activation distance for better precision
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px tolerance before drag starts
      },
    }),
    //touch sensor optimized for mobile
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100, //100ms delay to remove from scrolling
        tolerance: 8, //8px tolerance for finger movement
      },
    })
  );

  const syncPositionStatus = async (tasks, taskId, newStatus) => {
    try {
      await tasksService.syncPositionStatus(tasks, taskId, newStatus, projectId);
    } catch (error) {
      console.error(error);
    }
  }

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return; //ends

    const taskId = parseInt(active.id);
    const newStatus = over.id;

    // console.log(over)

    //Prepare updated tasks outside setTasks
    let updatedTasks;
    let withPositions;
    let changedTask;

    //update task array if new status changed
    setTasks((prevTasks) => {
      const currentTask = prevTasks.find((t) => t.id === taskId);

      //
      if (currentTask.status === newStatus) {
        return prevTasks;
      }

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
      await syncPositionStatus(withPositions, changedTask.id, changedTask.status);
    }
  };

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter} 
      onDragEnd={handleDragEnd}
    >
      <div 
        className="grid md:grid-cols-3 grid-cols-1 gap-3 md:gap-4 p-3 md:p-0"
        style={{
          //prevent bounce scrolling on iOS
          WebkitOverflowScrolling: 'touch',
          overscrollBehaviorY: 'none',
          touchAction: 'pan-y',
          //smooth scrolling for better mobile experience
          scrollBehavior: 'smooth',
        }}
      >
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
