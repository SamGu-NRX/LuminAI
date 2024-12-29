export type UserRole = {
  id: string;
  user_id: string;
  role: 'teacher' | 'student';
  created_at: string;
};

export type Certificate = {
  id: string;
  course_id: string;
  file_url: string;
  created_at: string;
};

export type CourseTeacher = {
  id: string;
  course_id: string;
  user_id: string;
  created_at: string;
};

export type Course = {
  id: string;
  title: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export type Module = {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  order: number;
  created_at: string;
  updated_at: string;
};

export type Lecture = {
  id: string;
  module_id: string;
  title: string;
  content: string | null;
  video_url: string | null;
  order: number;
  created_at: string;
  updated_at: string;
};

export type Assignment = {
  id: string;
  lecture_id: string;
  title: string;
  description: string | null;
  due_date: string | null;
  created_at: string;
  updated_at: string;
};

export type UserProgress = {
  id: string;
  user_id: string;
  lecture_id: string;
  completed: boolean;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
};

export type Submission = {
  id: string;
  user_id: string;
  assignment_id: string;
  content: string | null;
  file_url: string | null;
  grade: number | null;
  submitted_at: string;
  created_at: string;
  updated_at: string;
};