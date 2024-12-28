"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/shadcn/utils";
import {
  LearningObjective,
  Project,
  Resource,
  WeekModule,
  DIFFICULTY_COLORS,
  RESOURCE_ICONS,
} from "@/data/syllabus-types";
import { syllabusData } from "@/data/syllabus";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import * as Icons from "lucide-react";
import FadeInWhenVisible from "@/utils/motion/FadeInWhenVisible";

interface ModuleSelectorProps {
  module: WeekModule;
  isActive: boolean;
  onClick: () => void;
}

const ModuleSelector = ({ module, isActive, onClick }: ModuleSelectorProps) => (
  <motion.button
    onClick={onClick}
    className={cn(
      "w-full rounded-lg border p-6 text-left transition-all",
      isActive
        ? "border-gray-200 bg-white shadow-lg"
        : "border-transparent hover:bg-gray-50",
    )}
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
  >
    <span className="mb-1 block text-sm text-gray-500">Week {module.week}</span>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="mb-2 block font-medium text-gray-900">
            {module.title}
          </span>
        </TooltipTrigger>
        <TooltipContent side="right" align="center">
          <p className="text-sm italic">{module.wittyTitle}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <span className="text-xs text-gray-500">{module.duration}</span>
  </motion.button>
);

const LearningObjectiveCard = ({
  objective,
}: {
  objective: LearningObjective;
}) => (
  <HoverCard>
    <HoverCardTrigger asChild>
      <Card className="cursor-pointer transition-all hover:shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">{objective.title}</CardTitle>
          <CardDescription>{objective.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {objective.topics.map((topic, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2"
              >
                <Icons.CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-600">{topic}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </HoverCardTrigger>
    <HoverCardContent
      side="right"
      align="center"
      sideOffset={-400}
      className="w-80"
    >
      <div className="space-y-2">
        <h4 className="text-sm font-semibold">Key Learning Points</h4>
        <ul className="list-inside list-disc text-xs text-gray-500">
          {objective.topics.slice(0, 3).map((topic, index) => (
            <li key={index}>{topic}</li>
          ))}
        </ul>
      </div>
    </HoverCardContent>
  </HoverCard>
);

export default function SyllabusSection() {
  const [activeModule, setActiveModule] = useState<WeekModule>(syllabusData[0]);

  return (
    <section className="min-h-screen w-full rounded-2xl bg-gray-50/10 px-4 py-16 shadow-sm backdrop-blur-md mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-7xl"
      >
        <header className="mb-16 text-center">
          <motion.h1
            className="bg-gradient-to-r from-purple-700/60 via-blue-700/60 to-pink-700/60 bg-clip-text text-6xl font-bold text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            AI Innovate Scholars Syllabus (2024)
          </motion.h1>
          <motion.p
            className="mt-4 text-lg text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            From Zero to AI Hero, No Cape Required
          </motion.p>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Module selector */}
          <div className="space-y-4">
            {syllabusData.map((module) => (
              <ModuleSelector
                key={module.id}
                module={module}
                isActive={activeModule.id === module.id}
                onClick={() => setActiveModule(module)}
              />
            ))}
          </div>

          {/* Content area */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Module overview */}
                <Card className="bg-gray-50/80">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <CardTitle className="cursor-help text-2xl">
                              {activeModule.wittyTitle}
                            </CardTitle>
                          </TooltipTrigger>
                          <TooltipContent
                            className="bg-white/80"
                            side="top"
                            align="center"
                          >
                            <p className="text-sm italic">
                              {activeModule.wittySubtitle}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <Badge variant="outline" className="bg-white">
                        {activeModule.duration}
                      </Badge>
                    </div>
                    <CardDescription>
                      {activeModule.description}
                    </CardDescription>
                  </CardHeader>
                </Card>

                {/* Learning objectives */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Learning Objectives
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {activeModule.learningObjectives.map((objective, index) => (
                      <LearningObjectiveCard
                        key={index}
                        objective={objective}
                      />
                    ))}
                  </div>
                </div>

                {/* Project section */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>
                        Project: {activeModule.project.title}
                      </CardTitle>
                      <Badge
                        variant="secondary"
                        className={
                          DIFFICULTY_COLORS[activeModule.project.difficulty]
                        }
                      >
                        {activeModule.project.difficulty}
                      </Badge>
                    </div>
                    <CardDescription>
                      {activeModule.project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="mb-2 text-sm font-medium">
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {activeModule.project.technologies.map(
                            (tech, index) => (
                              <Badge key={index} variant="outline">
                                {tech}
                              </Badge>
                            ),
                          )}
                        </div>
                      </div>
                      <div>
                        <h4 className="mb-2 text-sm font-medium">Objectives</h4>
                        <ul className="list-inside list-disc text-sm text-gray-600">
                          {activeModule.project.objectives.map(
                            (objective, index) => (
                              <li key={index}>{objective}</li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Resources */}
                <div>
                  <h3 className="mb-4 text-xl font-semibold text-gray-900">
                    Resources
                  </h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {activeModule.resources.map((resource, index) => {
                      const IconComponent = Icons[
                        RESOURCE_ICONS[resource.type] as keyof typeof Icons
                      ] as React.ElementType;
                      return (
                        <Card key={index}>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                              <IconComponent className="h-5 w-5" />
                              {resource.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="mb-2 text-sm text-gray-600">
                              {resource.description}
                            </p>
                            <a
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline"
                            >
                              View Resource
                            </a>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
