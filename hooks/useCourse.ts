import { useContext } from "react";
import { CourseContext } from "@/context/course/courseProvider";

export const useCourse = () => {
  const context = useContext(CourseContext);

  if (!context) {
    throw new Error("useCourse");
  }

  return context;
};
