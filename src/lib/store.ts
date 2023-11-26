import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  tasks: Task[];
  draggedTask: string | null;
};

type Actions = {
  addTask: (task: Task) => void;
  dragTask: (id: string | null) => void;
  removeTask: (id: string) => void;
  updateTask: (id: string, status: Status) => void;
};

export const useTaskStore = create<State & Actions>()(
  persist(
    (set) => ({
      tasks: [],
      draggedTask: null,

      addTask: (task: Task) =>
        set((state) => ({
          tasks: [...state.tasks, task],
        })),

      dragTask: (id: string | null) =>
        set((state) => ({
          draggedTask: id,
        })),

      removeTask: (id: string) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

      updateTask: (id: string, status: Status) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, status } : task
          ),
        })),
    }),

    { name: "task-store", skipHydration: true }
  )
);
