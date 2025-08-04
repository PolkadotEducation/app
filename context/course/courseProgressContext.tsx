import { createContext, useContext, ReactNode } from "react";

interface CourseProgressContextType {
  updateCourseProgress: (_lessonId: string, _isCompleted: boolean) => void;
  updateCourseSummary: (_lessonId: string, _isCompleted: boolean, _points: number) => void;
}

const CourseProgressContext = createContext<CourseProgressContextType | undefined>(undefined);

export const useCourseProgressContext = () => {
  const context = useContext(CourseProgressContext);
  if (!context) {
    throw new Error("useCourseProgressContext must be used within a CourseProgressProvider");
  }
  return context;
};

interface CourseProgressProviderProps {
  children: ReactNode;
  updateCourseProgress: (_lessonId: string, _isCompleted: boolean) => void;
  updateCourseSummary: (_lessonId: string, _isCompleted: boolean, _points: number) => void;
}

export const CourseProgressProvider = ({
  children,
  updateCourseProgress,
  updateCourseSummary,
}: CourseProgressProviderProps) => {
  return (
    <CourseProgressContext.Provider
      value={{
        updateCourseProgress,
        updateCourseSummary,
      }}
    >
      {children}
    </CourseProgressContext.Provider>
  );
};
