"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Task } from "../../../shared/types";

export default function HomePage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/tasks");
      const data = await res.json();
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
    }
  }

  // Toggle completion
  async function toggleTaskCompletion(task: Task) {
    const updatedTask = { ...task, completed: !task.completed };
    try {
      await fetch(`http://localhost:4000/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
      // Refresh the list
      fetchTasks();
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  }

  // Delete a task
  async function deleteTask(id: number) {
    // Optionally add a confirmation prompt
    const confirmed = window.confirm("Are you sure?");
    if (!confirmed) return;

    try {
      await fetch(`http://localhost:4000/tasks/${id}`, {
        method: "DELETE",
      });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;

  return (
    <div className="flex flex-col gap-4">
      {/* Create task button */}
      <button
        onClick={() => router.push("/create")}
        className="mt-4 flex items-center justify-center bg-blue-dark hover:bg-blue-light text-white font-bold py-3 px-6 rounded"
      >
        Create Task
        <Image
          src="/plus.png"
          alt="Plus icon"
          width={16}
          height={16}
          className="ml-2"
        />
      </button>


      {/* Summary counters */}
      <div className="flex justify-between text-sm font-bold mt-10">
        <div className="flex items-center gap-2 text-blue-light">
          <span>Tasks</span>
          <span className="bg-gray-600 text-gray-200 px-2 rounded-full">
            {totalTasks}
          </span>
        </div>
        <div className="flex items-center gap-2 text-purple-light">
          <span>Completed</span>
          <span className="bg-gray-600 text-gray-200 px-2 rounded-full">
            {completedTasks} of {totalTasks}
          </span>
        </div>
      </div>

      {/* Task List */}
      <div className="flex flex-col gap-2 mt-4">
        {tasks.length === 0 ? (
          <div className="mt-6 p-4 border-t border-gray-600 text-gray-300 text-center flex flex-col items-center gap-4">
            <img
              src="/clipboard.png"
              alt="Clipboard icon"
              className="w-14 h-14"
            />
            <div>
              <p className="font-bold">You don’t have any tasks registered yet.</p>
              <></>
              <></>
              <p>Create tasks and organize your to-do items.</p>
            </div>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start p-4 gap-3 bg-gray-700 border border-gray-600 rounded-md"
            >
              {/* Circle or Checked Circle Images */}
              <button
                className="focus:outline-none"
                onClick={() => toggleTaskCompletion(task)}
              >
                <img
                  src={task.completed ? "/checked-circle.png" : "/circle.png"}
                  alt={task.completed ? "Completed" : "Not Completed"}
                  className="w-5 h-5"
                />
              </button>{/* Checkbox or toggle */}


              {/* Task title - clickable to edit */}
              <div
                onClick={() => router.push(`/edit/${task.id}`)}
                className={`flex-1 cursor-pointer ${task.completed ? "line-through text-gray-300" : ""
                  }`}
              >
                {task.title}
              </div>

              {/* Delete button */}
              <button
                onClick={() => deleteTask(task.id)}
                className="w-6 h-6 hover:text-red-task"
              >
                <Image
                  src="/trash.png"
                  alt="Delete task"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
