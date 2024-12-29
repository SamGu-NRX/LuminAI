"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/shadcn/utils";
import {
  BookOpen,
  GraduationCap,
  Home,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";

interface SidebarProps {
  role: "teacher" | "student" | null;
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  const studentLinks = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "My Courses",
      href: "/courses",
      icon: BookOpen,
    },
    {
      title: "Certificates",
      href: "/certificates",
      icon: GraduationCap,
    },
  ];

  const teacherLinks = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Courses",
      href: "/teacher/courses",
      icon: BookOpen,
    },
    {
      title: "Students",
      href: "/teacher/students",
      icon: Users,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  const links = role === "teacher" ? teacherLinks : studentLinks;

  return (
    <aside className="w-64 border-r bg-background">
      <nav className="flex flex-col gap-2 p-4">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {link.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
