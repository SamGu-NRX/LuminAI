export interface Resource {
  title: string;
  url: string;
  type: "documentation" | "video" | "article" | "github";
  description: string;
}

export interface Project {
  title: string;
  description: string;
  objectives: string[];
  technologies: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

export interface LearningObjective {
  title: string;
  description: string;
  topics: string[];
}

export interface WeekModule {
  id: number;
  week: string | number;
  title: string;
  wittyTitle: string;
  subtitle: string;
  wittySubtitle: string;
  description: string;
  duration: string;
  learningObjectives: LearningObjective[];
  project: Project;
  resources: Resource[];
  prerequisites?: string[];
}

export const DIFFICULTY_COLORS = {
  Beginner: "text-green-500",
  Intermediate: "text-yellow-500",
  Advanced: "text-red-500",
} as const;

export const RESOURCE_ICONS = {
  documentation: "BookOpen",
  video: "Video",
  article: "FileText",
  github: "Github",
} as const;
