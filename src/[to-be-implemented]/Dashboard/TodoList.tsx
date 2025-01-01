// components/TodoList.jsx
import { PlusIcon } from "@heroicons/react/24/solid";

function TodoList() {
  const todoItems = [
    {
      name: "Unit 3 Test",
      course: "LIS Summer 24",
      dueDate: "Jun 27 at 18:00 (5 days ago)",
    },
    {
      name: "Discussion: Physical and Tactical Controls",
      course: "LIS Summer 24",
      dueDate: "July 2 at 18:00 (5 days ago)",
    },
    // Add more items...
  ];

  return (
    <aside className="w-80 overflow-y-auto bg-gray-800 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">To Do</h2>
        <button className="rounded-full bg-blue-500 p-1">
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

interface TodoItemProps {
  name: string;
  course: string;
  dueDate: string;
}

function TodoItem({ name, course, dueDate }: TodoItemProps) {
  return (
    <div className="mb-4 rounded-lg bg-gray-700 p-3">
      <h3 className="font-semibold">{name}</h3>
      <p className="text-sm text-gray-400">{course}</p>
      <p className="text-sm text-red-400">{dueDate}</p>
    </div>
  );
}

function Announcements() {
  return (
    <div className="mt-6">
      <h2 className="mb-4 text-xl font-semibold">Announcements</h2>
      <div className="rounded-lg bg-gray-700 p-3">
        <h3 className="font-semibold">WEEK 6 (7/1 - 7/3) ANNOUNCEMENT</h3>
        <p className="text-sm text-gray-400">LIS Summer 24</p>
        <p className="text-sm text-gray-400">Jul 1 at 9:07 (3 days ago)</p>
      </div>
    </div>
  );
}

function RecentFeedback() {
  return (
    <div className="mt-6">
      <h2 className="mb-4 text-xl font-semibold">Recent Feedback</h2>
      <p className="text-blue-400">Activity: Something</p>
    </div>
  );
}

export default TodoList;
