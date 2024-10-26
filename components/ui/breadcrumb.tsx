"use client";

import { useCourse } from "@/hooks/useCourse";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumb = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const { selectedCourse, selectedLesson, loading } = useCourse();

  if (pathname === "/") {
    return null;
  }

  const hiddenSegments = ["course", "lesson"];
  const isCoursePage = pathname.startsWith("/course/") && segments.length === 2;
  const isLessonPage = pathname.startsWith("/lesson/") && segments.length === 2;

  if ((isCoursePage || isLessonPage) && loading) {
    return <></>;
  }

  return (
    <nav className="text-sm font-medium">
      <ol className="list-reset flex items-center">
        <li className="flex items-center">
          <Link href={"/"} className="text-text-secondary hover:underline body1">
            Home
          </Link>
          {segments.length > 0 && <span className="mx-2 text-text-secondary">/</span>}
        </li>

        {isCoursePage && selectedCourse ? (
          <li className="text-primary body1">{selectedCourse.title}</li>
        ) : isLessonPage && selectedLesson ? (
          <>
            {selectedCourse && (
              <>
                <li className="flex items-center">
                  <Link href={`/course/${selectedCourse._id}`} className="text-text-secondary hover:underline body1">
                    {selectedCourse.title}
                  </Link>
                  <span className="mx-2 text-text-secondary">/</span>
                </li>
              </>
            )}
            <li className="text-primary body1">{selectedLesson.title}</li>
          </>
        ) : (
          segments.map((segment, index) => {
            const href = "/" + segments.slice(0, index + 1).join("/");
            const isLast = index === segments.length - 1;
            const name = segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
            if (hiddenSegments.includes(segment)) {
              return null;
            }
            return (
              <li key={href} className="flex items-center">
                {isLast ? (
                  <span className="text-primary body1">{name}</span>
                ) : (
                  <Link href={href} className="text-text-secondary hover:underline body1">
                    {name}
                  </Link>
                )}
                {!isLast && <span className="mx-2 text-text-secondary">/</span>}
              </li>
            );
          })
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
