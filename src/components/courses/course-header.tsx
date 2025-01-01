import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Course } from "@/lib/supabase/types";

interface CourseHeaderProps {
  course: Course;
}

export function CourseHeader({ course }: CourseHeaderProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{course.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {course.description && (
            <p className="text-muted-foreground">{course.description}</p>
          )}
          <div>
            <Progress value={33} className="mb-2" />
            <p className="text-muted-foreground text-sm">33% Complete</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
