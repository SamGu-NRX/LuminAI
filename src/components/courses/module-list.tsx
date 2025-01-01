"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, CheckCircle2, Lock } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import type { Module } from "@/lib/supabase/types";

interface ModuleListProps {
  modules: Module[];
  courseId: string;
}

export function ModuleList({ modules, courseId }: ModuleListProps) {
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  return (
    <Accordion
      type="single"
      collapsible
      value={expandedModule ?? undefined}
      onValueChange={(value) => setExpandedModule(value)}
      className="space-y-4"
    >
      {modules.map((module, index) => (
        <AccordionItem
          key={module.id}
          value={module.id}
          className="overflow-hidden rounded-lg border"
        >
          <AccordionTrigger className="hover:bg-accent px-4 py-2 hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full">
                {index + 1}
              </div>
              <div className="text-left">
                <h3 className="font-medium">{module.title}</h3>
                {module.description && (
                  <p className="text-muted-foreground text-sm">
                    {module.description}
                  </p>
                )}
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="border-t">
            <div className="space-y-2 p-4">
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                asChild
              >
                <Link href={`/courses/${courseId}/modules/${module.id}`}>
                  <CheckCircle2 className="text-primary h-4 w-4" />
                  Continue Module
                </Link>
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
