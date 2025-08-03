import { createContext, useContext, ReactNode } from "react";

interface CourseProgressContextType {
  refreshProgress: () => void;
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
  refreshProgress: () => void;
}

export const CourseProgressProvider = ({ children, refreshProgress }: CourseProgressProviderProps) => {
  return <CourseProgressContext.Provider value={{ refreshProgress }}>{children}</CourseProgressContext.Provider>;
};
