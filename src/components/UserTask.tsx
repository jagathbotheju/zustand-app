import { useTaskStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import React from "react";
import { MdDelete } from "react-icons/md";

const UserTask = ({ id, title, description, status }: Task) => {
  const { dragTask, removeTask } = useTaskStore();

  return (
    <div
      draggable
      onDrag={() => dragTask(id)}
      className={cn(
        "flex cursor-move items-start justify-between rounded-lg bg-white px-3 py-2 text-gray-900",
        {
          "border-[5px] border-sky-500": status === "TODO",
          "border-[5px] border-amber-500": status === "IN_PROGRESS",
          "border-[5px] border-emerald-500": status === "DONE",
        }
      )}
    >
      <div className="flex flex-col w-full">
        <h3 className="font-medium font-gray-700">{title}</h3>
        <p className="text-sm font-light text-gray-500">{description}</p>
        <MdDelete
          size={20}
          className="hover:text-red-400 self-end cursor-pointer"
          onClick={() => removeTask(id)}
        />
      </div>
    </div>
  );
};

export default UserTask;
