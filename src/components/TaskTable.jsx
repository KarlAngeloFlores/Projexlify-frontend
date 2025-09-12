import React, { useState, useMemo } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Draggable row
function Row({ id, name, index, isDraggable }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (!isDraggable) {
    // Non-draggable row (static)
    return (
      <tr
        className="bg-white hover:bg-gray-50 border-b"
      >
        <td className="px-4 py-2 text-gray-700 font-medium">{id}</td>
        <td className="px-4 py-2">{name}</td>
        <td className="px-4 py-2 text-gray-500">{index}</td>
      </tr>
    );
  }

  return (
    <tr
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${
        isDragging ? "bg-blue-100 shadow-md" : "bg-white hover:bg-gray-50"
      } transition-colors border-b`}
    >
      <td className="px-4 py-2 text-gray-700 font-medium">{id}</td>
      <td className="px-4 py-2">{name}</td>
      <td className="px-4 py-2 text-gray-500">{index}</td>
    </tr>
  );
}

const TaskTable = () => {
  const [tasks, setTasks] = useState([
    { id: "1", name: "Design UI", index: 0 },
    { id: "2", name: "Fix bugs", index: 1 },
    { id: "3", name: "Write docs", index: 2 },
    { id: "4", name: "Deploy app", index: 3 },
    { id: "5", name: "Review code", index: 4 },
  ]);

  const [search, setSearch] = useState("");
  const sensors = useSensors(useSensor(PointerSensor));

  // reassign indexes
  const reindex = (items) => items.map((item, i) => ({ ...item, index: i }));

  // filter tasks
  const filteredTasks = useMemo(() => {
    const filtered = tasks.filter((t) =>
      t.name.toLowerCase().includes(search.toLowerCase())
    );
    return reindex(filtered);
  }, [tasks, search]);

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex((t) => t.id === active.id);
    const newIndex = tasks.findIndex((t) => t.id === over.id);

    const reordered = arrayMove(tasks, oldIndex, newIndex);
    setTasks(reindex(reordered));
  };

  const isFiltering = search.trim() !== "";

  return (
    <div className="p-6 space-y-4">
      {/* Search Filter */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
      />

      <div className="overflow-hidden rounded-xl shadow-lg border border-gray-200">
        {isFiltering ? (
          // Static table (not draggable)
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Task Name</th>
                <th className="px-4 py-3">Index</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <Row key={task.id} {...task} isDraggable={false} />
              ))}
            </tbody>
          </table>
        ) : (
          // Draggable table
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Task Name</th>
                  <th className="px-4 py-3">Index</th>
                </tr>
              </thead>
              <SortableContext
                items={filteredTasks.map((t) => t.id)}
                strategy={verticalListSortingStrategy}
              >
                <tbody>
                  {filteredTasks.map((task) => (
                    <Row key={task.id} {...task} isDraggable={true} />
                  ))}
                </tbody>
              </SortableContext>
            </table>
          </DndContext>
        )}
      </div>
    </div>
  );
};

export default TaskTable;
