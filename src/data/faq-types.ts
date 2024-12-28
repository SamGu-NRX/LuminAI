import { type LucideIcon } from "lucide-react";

export interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

export interface FAQSectionProps {
  icon: LucideIcon;
  title: string;
  questions: number[];
  openItem: number | null;
  setOpenItem: (item: number | null) => void;
}

export interface CategoryType {
  [key: string]: {
    icon: LucideIcon;
    title: string;
    questions: number[];
  };
}

export interface FAQDataType {
  [key: number]: {
    question: string;
    answer: string;
  };
}
