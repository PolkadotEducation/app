import { getCourse, getCoursesByLanguage } from "@/api/courseService";
import { getLessonById } from "@/api/lessonService";
import { getLessonProgress } from "@/api/progressService";
import { useUser } from "@/hooks/useUser";
import { CourseType } from "@/types/courseTypes";
import { LessonType } from "@/types/lessonTypes";
import { ProgressResponse } from "@/types/progressTypes";
import { createContext, useState, ReactNode } from "react";

interface CourseContextProps {
  loading: boolean;
  error: string | null;
  courses: CourseType[] | null;
  selectedCourse: CourseType | null;
  selectedLesson: LessonType | null;
  selectedLessonProgress: ProgressResponse | null;
  nextLesson: string | null;
  previousLesson: string | null;
  fetchCourses: () => Promise<void>;
  fetchCourseById: (_id: string) => Promise<void>;
  fetchLessonById: (_id: string, _courseId: string) => Promise<void>;
}

export const CourseContext = createContext<CourseContextProps | undefined>(undefined);

export const CourseProvider = ({ children }: { children: ReactNode }) => {
  const [courses, setCourses] = useState<CourseType[] | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<CourseType | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<LessonType | null>(null);
  const [selectedLessonProgress, setSelectedLessonProgress] = useState<ProgressResponse | null>(null);
  const [nextLesson, setNextLesson] = useState<string | null>(null);
  const [previousLesson, setPreviousLesson] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await getCoursesByLanguage(user?.language || "english");
      setCourses(response);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
      setError("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  const fetchCourseById = async (id: string) => {
    try {
      setLoading(true);
      const response = await getCourse(id);
      setSelectedCourse(response);
    } catch (err) {
      console.error("Failed to fetch course:", err);
      setError("Failed to fetch course");
    } finally {
      setLoading(false);
    }
  };

  const fetchLessonById = async (id: string, courseId: string) => {
    if (!user) return;

    try {
      setLoading(true);
      const response = await getLessonById(id as string);
      setSelectedLesson(response);
      const course = await getCourse(courseId);
      setSelectedCourse(course);
      const progress = await getLessonProgress({ userId: user?.id, courseId, lessonId: id });
      setSelectedLessonProgress(progress);
      const { previousLessonId, nextLessonId } = findAdjacentLessons(response);
      setPreviousLesson(previousLessonId);
      setNextLesson(nextLessonId);
    } catch (err) {
      console.error("Failed to fetch lesson:", err);
      setError("Failed to fetch lesson");
    } finally {
      setLoading(false);
    }
  };

  const findAdjacentLessons = (
    currentLesson: LessonType,
  ): { previousLessonId: string | null; nextLessonId: string | null } => {
    if (!selectedCourse || !selectedCourse.modules) return { previousLessonId: null, nextLessonId: null };

    let previousLessonId: string | null = null;
    let nextLessonId: string | null = null;

    for (let i = 0; i < selectedCourse.modules.length; i++) {
      const module = selectedCourse.modules[i];
      const lessonIndex = module.lessons.findIndex((lesson) => lesson._id === currentLesson._id);

      if (lessonIndex !== -1) {
        if (lessonIndex > 0) {
          previousLessonId = module.lessons[lessonIndex - 1]._id || null;
        } else {
          // Checking other modules, should we do it?
          for (let j = i - 1; j >= 0; j--) {
            const previousModule = selectedCourse.modules[j];
            if (previousModule.lessons.length > 0) {
              previousLessonId = previousModule.lessons[previousModule.lessons.length - 1]._id || null;
              break;
            }
          }
        }

        if (lessonIndex + 1 < module.lessons.length) {
          nextLessonId = module.lessons[lessonIndex + 1]._id || null;
        } else {
          // Checking other modules, should we do it?
          for (let j = i + 1; j < selectedCourse.modules.length; j++) {
            const nextModule = selectedCourse.modules[j];
            if (nextModule.lessons.length > 0) {
              nextLessonId = nextModule.lessons[0]._id || null;
              break;
            }
          }
        }
        break;
      }
    }

    return { previousLessonId, nextLessonId };
  };

  return (
    <CourseContext.Provider
      value={{
        loading,
        error,
        courses,
        selectedCourse,
        selectedLesson,
        selectedLessonProgress,
        nextLesson,
        previousLesson,
        fetchCourses,
        fetchCourseById,
        fetchLessonById,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};
