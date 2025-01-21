"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CreateTaskPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#FF3B30"); // default color

  // Example color array
  const colorOptions = [
    { label: "Red", value: "#FF3B30", image: "/red.png" },
    { label: "Orange", value: "#FF9500", image: "/orange.png" },
    { label: "Yellow", value: "#FFCC00", image: "/yellow.png" },
    { label: "Green", value: "#34C759", image: "/green.png" },
    { label: "Blue", value: "#007AFF", image: "/blue.png" },
    { label: "Purple", value: "#AF52DE", image: "/purple.png" },
    { label: "Pink", value: "#FF2D55", image: "/pink.png" },
    { label: "Brown", value: "#A2845E", image: "/brown.png" },
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    try {
      await fetch("http://localhost:4000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, color }),
      });
      router.push("/");
    } catch (error) {
      console.error("Error creating task:", error);
    }
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

      {/* Title Field */}
      <label className="text-blue-light font-semibold">Title</label>
      <input
        className="bg-gray-700 text-gray-100 rounded p-3 placeholder-gray-500"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Ex. Brush you teeth"
      />

      {/* Color Selection */}
      <label className="text-blue-light font-semibold">Color</label>
      <div className="flex items-center gap-3 max-w-2xl">
        {colorOptions.map((c) => (
          <button
            key={c.value}
            type="button"
            onClick={() => setColor(c.value)}
            className={`relative p-0 rounded-full ${color === c.value ? "ring-2 ring-blue-light" : "ring-2 ring-transparent"
              }`}
          >
            <Image
              src={c.image}
              alt={c.label}
              width={40}
              height={40}
              className="rounded-full"
            />
          </button>
        ))}
      </div>

      {/* Add Task Button */}
      <button
        type="submit"
        onClick={handleSubmit}
        className="mt-4 flex items-center justify-center bg-blue-dark hover:bg-blue-light text-white font-bold py-3 px-6 rounded"
      >
        Add Task
        <Image
          src="/plus.png"
          alt="Plus icon"
          width={16}
          height={16}
          className="ml-2"
        />
      </button>
    </div>
  );
}
