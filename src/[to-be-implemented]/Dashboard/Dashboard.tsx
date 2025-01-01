// components/Dashboard.jsx
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";

function Dashboard() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>
      <div className="mb-6 rounded-lg bg-gray-800 p-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              LuminAI Innovate Scholars (Summer 2024)
            </h2>
            <p>LIS Summer 24</p>
          </div>
          <EllipsisVerticalIcon className="h-6 w-6" />
        </div>
        <div className="h-2.5 w-full rounded-full bg-gray-700">
          <div
            className="h-2.5 rounded-full bg-blue-600"
            style={{ width: "93%" }}
          ></div>
        </div>
        <p className="mt-2 text-right">93%</p>
      </div>
      <DueSection />
    </div>
  );
}

function DueSection() {
  const dueItems = [
    { name: "Unit 4 Test", dueIn: "2d" },
    { name: "Discussion: Fail-Safe Recovery", dueIn: "2d" },
    { name: "Activity: Hardware Security Guidelines", dueIn: "2d" },
    { name: "Lab: Asymmetric Practice", dueIn: "2d" },
  ];

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Due</h2>
      {dueItems.map((item, index) => (
        <div key={index} className="mb-2 flex items-center justify-between">
          <span>{item.name}</span>
          <span className="text-gray-400">in {item.dueIn}</span>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
