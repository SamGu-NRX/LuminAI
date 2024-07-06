import { createFileRoute } from '@tanstack/react-router'
import Sidebar from '@/components/Dashboard/Sidebar';
import Dash from '@/components/Dashboard/Dashboard';
import TodoList from '@/components/Dashboard/TodoList';

function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <Dash />
      </main>
      <TodoList />
    </div>
  );
}


export const Route = createFileRoute('/Dashboard')({
  component: Dashboard
})