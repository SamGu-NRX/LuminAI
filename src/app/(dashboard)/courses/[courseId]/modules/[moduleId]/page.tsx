"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { LectureView } from "@/components/courses/lecture-view";
import { AssignmentView } from "@/components/courses/assignment-view";
import { Loading } from "@/components/dashboard/loading";
import type { Lecture, Assignment } from "@/lib/supabase/types";

export default function ModulePage() {
  const { moduleId } = useParams();
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchModuleContent() {
      try {
        const [lecturesResponse, assignmentsResponse] = await Promise.all([
          supabase
            .from("lectures")
            .select("*")
            .eq("module_id", moduleId)
            .order("order"),
          supabase
            .from("assignments")
            .select("*")
            .eq("module_id", moduleId)
            .order("created_at"),
        ]);

        if (lecturesResponse.error) throw lecturesResponse.error;
        if (assignmentsResponse.error) throw assignmentsResponse.error;

        setLectures(lecturesResponse.data);
        setAssignments(assignmentsResponse.data);
      } catch (error) {
        console.error("Error fetching module content:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchModuleContent();
  }, [moduleId]);

  if (loading) return <Loading />;

  return (
    <div className="space-y-8">
      {lectures.map((lecture) => (
        <div key={lecture.id} className="space-y-4">
          <LectureView lecture={lecture} />
          {assignments
            .filter((assignment) => assignment.lecture_id === lecture.id)
            .map((assignment) => (
              <AssignmentView key={assignment.id} assignment={assignment} />
            ))}
        </div>
      ))}
    </div>
  );
}
