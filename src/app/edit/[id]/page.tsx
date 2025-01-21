"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";

type Task = {
  id: number;
  title: string;
  color?: string;
  completed: boolean;
};

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams(); // Next.js 13 way to get dynamic segments
  const { id } = params;      // 'id' from the route segment
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Local form states
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#FF3B30");

  // Fetch the task
  useEffect(() => {
    if (!id) return;
    fetchTask(Number(id));
  }, [id]);

  async function fetchTask(taskId: number) {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:4000/tasks/${taskId}`);
      if (!res.ok) {
        throw new Error("Failed to fetch task");
      }
      const data = await res.json();
      setTask(data);
      setTitle(data.title);
      setColor(data.color || "#FF3B30");
      setLoading(false);
    } catch (error) {
      console.error("Error fetching task:", error);
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    if (!task) return;

    try {
      await fetch(`http://localhost:4000/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          color,
          completed: task.completed,
        }),
      });
      router.push("/");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  function handleCancel() {
    router.push("/");
  }

  if (loading) {
    return <div>Loading Task...</div>;
  }

  if (!task) {
    return <div>Task not found.</div>;
  }

  function handleBack() {
    router.push("/");
  }

  return (
    <div className="mt-8 flex flex-col gap-6 max-w-3xl w-full mx-auto">
      {/* Back Arrow */}
      <button onClick={handleBack} className="flex items-center gap-2 text-blue-light">
        <Image src="/arrow-left.png" alt="Back" width={20} height={20} />
      </button>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 bg-gray-800 p-6 rounded-md shadow-md max-w-3xl w-full"
      >
        {/* Title Field */}
        <label className="flex flex-col">
          <label className="text-blue-light font-semibold">Title</label>
          <input
            type="text"
            className="bg-gray-700 text-gray-100 rounded p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        {/* Color Picker */}
        <label className="flex flex-col">
          <span className="text-blue-light font-semibold">Color</span>
          <div className="flex gap-2">
            {[
              '#FF3B30',
              '#FF9500',
              '#FFCC00',
              '#34C759',
              '#007AFF',
              '#5856D6',
              '#AF52DE',
              '#FF2D55',
              '#A2845E',
            ].map((colorOption) => (
              <button
                key={colorOption}
                type="button"
                onClick={() => setColor(colorOption)}
                className={`w-8 h-8 rounded-full border-2 ${color === colorOption
                  ? 'border-white'
                  : 'border-transparent'
                  }`}
                style={{ backgroundColor: colorOption }}
              ></button>
            ))}
          </div>
        </label>

        {/* Buttons */}
        {/* <div className="flex justify-between items-center">
        </div> */}
        <button
          type="submit"
          className="mt-4 flex items-center justify-center bg-blue-dark hover:bg-blue-light text-white font-bold py-3 px-6 rounded"
        >
          Save
          <Image
            src="/mdi_check-bold.png"
            alt="Check"
            width={16}
            height={16}
            className="ml-2"
          />
        </button>
      </form>
    </div>
  );
}
