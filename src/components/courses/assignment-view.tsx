"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase/client";
import type { Assignment } from "@/lib/supabase/types";

interface AssignmentViewProps {
  assignment: Assignment;
}

export function AssignmentView({ assignment }: AssignmentViewProps) {
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const { error } = await supabase.from("submissions").insert({
        assignment_id: assignment.id,
        content,
      });

      if (error) throw error;
      // Handle successful submission
    } catch (error) {
      console.error("Error submitting assignment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assignment: {assignment.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {assignment.description && (
          <div className="prose dark:prose-invert max-w-none">
            {assignment.description}
          </div>
        )}
        <div className="space-y-2">
          <Textarea
            placeholder="Enter your answer..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[200px]"
          />
          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Assignment"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
