"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import type { Lecture } from "@/lib/supabase/types";

interface LectureViewProps {
  lecture: Lecture;
}

export function LectureView({ lecture }: LectureViewProps) {
  const [completed, setCompleted] = useState(false);

  const handleComplete = async () => {
    // Implementation for marking lecture as complete
    setCompleted(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{lecture.title}</span>
          {completed && <CheckCircle className="text-primary h-5 w-5" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {lecture.video_url && (
          <div className="aspect-video overflow-hidden rounded-lg bg-black">
            <video src={lecture.video_url} controls className="h-full w-full" />
          </div>
        )}
        {lecture.content && (
          <div className="prose dark:prose-invert max-w-none">
            {lecture.content}
          </div>
        )}
        <Button onClick={handleComplete} disabled={completed}>
          {completed ? "Completed" : "Mark as Complete"}
        </Button>
      </CardContent>
    </Card>
  );
}
