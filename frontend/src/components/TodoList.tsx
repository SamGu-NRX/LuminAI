// components/TodoList.jsx
import { PlusIcon } from "@heroicons/react/24/solid";

function TodoList() {
  const todoItems = [
    {
      name: "Unit 3 Test",
      course: "RING Summer 24 (Mr. Jones)",
      dueDate: "Jun 27 at 18:00 (5 days ago)",
    },
    {
      name: "Discussion: Physical and Tactical Controls",
      course: "RING Summer 24 (Mr. Jones)",
      dueDate: "July 2 at 18:00 (5 days ago)",
    },
    // Add more items...
  ];

  return (
    <aside className="w-80 bg-gray-800 p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">To Do</h2>
        <button className="bg-blue-500 p-1 rounded-full">
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>
      {todoItems.map((item, index) => (
        <TodoItem key={index} {...item} />
      ))}
      <Announcements />
      <RecentFeedback />
    </aside>
  );
}

function TodoItem({ name, course, dueDate }) {
  return (
    <div className="mb-4 bg-gray-700 p-3 rounded-lg">
      <h3 className="font-semibold">{name}</h3>
      <p className="text-sm text-gray-400">{course}</p>
      <p className="text-sm text-red-400">{dueDate}</p>
    </div>
  );
}

function Announcements() {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Announcements</h2>
      <div className="bg-gray-700 p-3 rounded-lg">
        <h3 className="font-semibold">WEEK 6 (7/1 - 7/3) ANNOUNCEMENT</h3>
        <p className="text-sm text-gray-400">RING Summer 24 (Mr. Jones)</p>
        <p className="text-sm text-gray-400">Jul 1 at 9:07 (3 days ago)</p>
      </div>
    </div>
  );
}

function RecentFeedback() {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Recent Feedback</h2>
      <p className="text-blue-400">Activity: Data Hiding in Linux</p>
    </div>
  );
}

export default TodoList;
