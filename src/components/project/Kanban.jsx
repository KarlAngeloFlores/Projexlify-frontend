import React, { useState } from "react"
import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core"
import {
  SortableContext,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

const statuses = ["todo", "in_progress", "done"]

// Individual Task Card
const TaskCard = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-3 bg-gray-800 text-white rounded-lg shadow mb-2 cursor-grab"
    >
      <p className="font-semibold">{task.name}</p>
      <p className="text-sm text-gray-400">{task.contents}</p>
    </div>
  )
}

// Kanban Board
const KanbanBoard = ({ projectId, initialTasks, onUpdateStatus }) => {
  const [tasks, setTasks] = useState(initialTasks)

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over) return

    const taskId = active.id
    const newStatus = over.id // column id

    // If already in the same column, do nothing
    const task = tasks.find((t) => t.id === taskId)
    if (!task || task.status === newStatus) return

    // Update locally
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status: newStatus } : t
      )
    )

    // API call
    onUpdateStatus(projectId, taskId, newStatus)
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-3 gap-6 p-6 h-screen bg-gray-950">
        {statuses.map((status) => (
          <div
            key={status}
            id={status}
            className="bg-gray-900 rounded-xl p-4 border border-gray-700 flex flex-col"
          >
            <h2 className="text-lg font-bold text-white capitalize mb-3">
              {status.replace("_", " ")}
            </h2>
            <SortableContext
              items={tasks
                .filter((t) => t.status === status)
                .map((t) => t.id)}
            >
              {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
            </SortableContext>
          </div>
        ))}
      </div>
    </DndContext>
  )
}

// Demo Page
const Kanban = () => {
  return (
    <KanbanBoard
      projectId="8"
      initialTasks={[
        { id: "1", name: "Task 1", contents: "Do something", status: "todo" },
        { id: "2", name: "Task 2", contents: "Another task", status: "in_progress" },
        { id: "3", name: "Task 3", contents: "Finish project", status: "done" },
      ]}
      onUpdateStatus={async (projectId, taskId, newStatus) => {
        console.log("Update task", taskId, "to", newStatus, "for project", projectId)
        // Here you would call your API, e.g.:
        // await fetch(`/api/tasks/${taskId}`, { method: "PATCH", body: JSON.stringify({ projectId, newStatus }) })
      }}
    />
  )
}

export default Kanban
