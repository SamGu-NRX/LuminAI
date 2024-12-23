// components/Dashboard.jsx
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";


function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold">
              LuminAI Innovate Scholars (Summer 2024)
            </h2>
            <p>LIS Summer 24</p>
          </div>
          <EllipsisVerticalIcon className="h-6 w-6" />
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: "93%" }}
          ></div>
        </div>
        <p className="text-right mt-2">93%</p>
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
      <h2 className="text-xl font-semibold mb-4">Due</h2>
      {dueItems.map((item, index) => (
        <div key={index} className="flex justify-between items-center mb-2">
          <span>{item.name}</span>
          <span className="text-gray-400">in {item.dueIn}</span>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
