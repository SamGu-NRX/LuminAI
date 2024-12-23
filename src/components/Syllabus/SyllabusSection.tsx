"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/shadcn/utils";
import { WeekModule, DIFFICULTY_COLORS, RESOURCE_ICONS } from "@/data/syllabus-types";
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
      "w-full text-left p-6 rounded-lg transition-all border",
      isActive
        ? "bg-white shadow-lg border-gray-200"
        : "hover:bg-gray-50 border-transparent"
    )}
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
  >
    <span className="block text-sm text-gray-500 mb-1">Week {module.week}</span>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="block font-medium text-gray-900 mb-2">
            {module.title}
          </span>
        </TooltipTrigger>
        <TooltipContent>
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
                <Icons.CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-600">{topic}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </HoverCardTrigger>
    <HoverCardContent className="w-80">
      <div className="space-y-2">
        <h4 className="text-sm font-semibold">Key Learning Points</h4>
        <ul className="text-xs text-gray-500 list-disc list-inside">
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
    <FadeInWhenVisible as="section" className="min-h-screen w-full bg-gray-50/50 px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <header className="text-center mb-16">
          <motion.h1
            className="text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-800 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            AI Bootcamp Syllabus
          </motion.h1>
          <motion.p
            className="mt-4 text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            From Zero to AI Hero, No Cape Required
          </motion.p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <CardTitle className="text-2xl cursor-help">
                              {activeModule.wittyTitle}
                            </CardTitle>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-sm italic">
                              {activeModule.wittySubtitle}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <Badge variant="outline">{activeModule.duration}</Badge>
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
                        <h4 className="text-sm font-medium mb-2">
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {activeModule.project.technologies.map(
                            (tech, index) => (
                              <Badge key={index} variant="outline">
                                {tech}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Objectives</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {activeModule.project.objectives.map(
                            (objective, index) => (
                              <li key={index}>{objective}</li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Resources */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Resources
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeModule.resources.map((resource, index) => {
                      const IconComponent =
                        Icons[
                          RESOURCE_ICONS[resource.type] as keyof typeof Icons
                        ];
                      return (
                        <Card key={index}>
                          <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                              <IconComponent className="w-5 h-5" />
                              {resource.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-600 mb-2">
                              {resource.description}
                            </p>
                            <a
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline text-sm"
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
    </FadeInWhenVisible>
  );
}
