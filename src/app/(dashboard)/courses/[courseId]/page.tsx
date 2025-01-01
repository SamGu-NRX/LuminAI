"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { ModuleList } from "@/components/courses/module-list";
import { CourseHeader } from "@/components/courses/course-header";
import { Loading } from "@/components/dashboard/loading";
import type { Course, Module } from "@/lib/supabase/types";

export default function CoursePage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourseData() {
      try {
        const [courseResponse, modulesResponse] = await Promise.all([
          supabase.from("courses").select("*").eq("id", courseId).single(),
          supabase
            .from("modules")
            .select("*")
            .eq("course_id", courseId)
            .order("order"),
        ]);

        if (courseResponse.error) throw courseResponse.error;
        if (modulesResponse.error) throw modulesResponse.error;

        setCourse(courseResponse.data);
        setModules(modulesResponse.data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourseData();
  }, [courseId]);

  if (loading) return <Loading />;
  if (!course) return <div>Course not found</div>;

  return (
    <div className="space-y-8">
      <CourseHeader course={course} />
      <ModuleList modules={modules} courseId={course.id} />
    </div>
  );
}
