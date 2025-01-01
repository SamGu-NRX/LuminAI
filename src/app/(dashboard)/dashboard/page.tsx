"use client";

import { useEffect, useState } from "react";
import { useUserRole } from "@/lib/hooks/use-user-role";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/lib/supabase/client";
import type { Course } from "@/lib/supabase/types";

export default function DashboardPage() {
  const { role, loading: roleLoading } = useUserRole();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      const { data: coursesData, error } = await supabase
        .from("courses")
        .select("*");

      if (error) {
        console.error("Error fetching courses:", error);
        return;
      }

      setCourses(coursesData);
      setLoading(false);
    }

    if (!roleLoading) {
      fetchCourses();
    }
  }, [roleLoading]);

  if (loading || roleLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-4 text-3xl font-bold">Welcome Back</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={33} className="mb-2" />
                <p className="text-muted-foreground text-sm">33% Complete</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
