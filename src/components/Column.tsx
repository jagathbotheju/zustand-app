"use client";
import { useEffect, useMemo } from "react";
import UserTask from "./UserTask";
import { useTaskStore } from "@/lib/store";

interface Props {
  title: string;
  status: Status;
}

const Column = ({ title, status = "TODO" }: Props) => {
  const { tasks, updateTask, draggedTask, dragTask } = useTaskStore();

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => task.status === status);
  }, [tasks, status]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (!draggedTask) return;
    updateTask(draggedTask, status);
    dragTask(null);
  };

  useEffect(() => {
    useTaskStore.persist.rehydrate();
  }, []);

  return (
    <section className="h-[600px] flex-1">
      <h2 className="ml-1 text-2xl font-semibold">{title}</h2>

      <div
        className="mt-3.5 h-full w-full rounded-xl bg-gray-700/50 p-4"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-4">
          {filteredTasks.map((task) => (
            <UserTask key={task.id} {...task} />
          ))}

          {filteredTasks.length === 0 && status === "TODO" && (
            <div className="mt-8 text-center text-sm text-gray-500">
              <p>Create a New Task</p>
            </div>
          )}

          {tasks.length && filteredTasks.length === 0 && status !== "TODO" ? (
            <div className="mt-8 text-center text-sm text-gray-500">
              <p>Drag your tasks here</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Column;
