// components/Sidebar.jsx
import {
  HomeIcon,
  BookOpenIcon,
  CalendarIcon,
  InboxIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";

function Sidebar() {
  const menuItems = [
    { icon: HomeIcon, label: "Dashboard" },
    { icon: BookOpenIcon, label: "Courses" },
    { icon: CalendarIcon, label: "Calendar" },
    { icon: InboxIcon, label: "Inbox" },
    { icon: ClockIcon, label: "History" },
    { icon: QuestionMarkCircleIcon, label: "Help" },
  ];

  return (
    <aside className="w-20 bg-gray-800 p-4">
      <div className="mb-8">
        <Image
          src="/path-to-avatar.png"
          alt="Account"
          width={48}
          height={48}
          className="rounded-full"
        />
      </div>
      {menuItems.map((item, index) => (
        <div key={index} className="mb-6 text-center">
          <item.icon className="mx-auto mb-1 h-6 w-6" />
          <span className="text-xs">{item.label}</span>
        </div>
      ))}
    </aside>
  );
}

export default Sidebar;
