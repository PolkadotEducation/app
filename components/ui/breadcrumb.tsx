"use client";

import { useCourse } from "@/hooks/useCourse";
import { useUser } from "@/hooks/useUser";
import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumb = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const { selectedCourse, selectedLesson, loading } = useCourse();
  const t = useTranslations("components");

  if (pathname === "/") {
    return null;
  }

  const { userLoading, user } = useUser();

  if (userLoading || !user) {
    return null;
  }

  const hiddenSegments = ["course", "lesson"];
  const isCoursePage = pathname.startsWith("/course/") && segments.length === 2;
  const isLessonPage = pathname.startsWith("/lesson/") && segments.length === 3;

  if ((isCoursePage || isLessonPage) && loading) {
    return null;
  }

  let previousSegment = "";
  let previousHref = "";

  if (segments.length === 1) {
    previousSegment = "home";
    previousHref = "/";
  } else if (!isLessonPage && segments.length > 1) {
    previousHref = "/" + segments.slice(0, segments.length - 1).join("/");
    previousSegment = segments[segments.length - 2].replace(/-/g, " ");
  }

  return (
    <>
      <nav className="text-sm font-medium hidden md:block">
        <ol className="list-reset flex items-center">
          <li className="flex items-center">
            <Link href={"/"} className="text-text-secondary hover:underline body1">
              {t("home")}
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
              const name = segment.replace(/-/g, " ");
              if (hiddenSegments.includes(segment)) {
                return null;
              }
              return (
                <li key={href} className="flex items-center">
                  {isLast ? (
                    <span className="text-primary body1">{t(name)}</span>
                  ) : (
                    <Link href={href} className="text-text-secondary hover:underline body1">
                      {t(name)}
                    </Link>
                  )}
                  {!isLast && <span className="mx-2 text-text-secondary">/</span>}
                </li>
              );
            })
          )}
        </ol>
      </nav>
      <div className="block md:hidden text-primary text-body1">
        {selectedCourse && isLessonPage ? (
          <Link href={`/course/${selectedCourse._id}`} className="flex gap-x-2 items-center">
            <ChevronLeft />
            {t("backTo")} {selectedCourse.title}
          </Link>
        ) : selectedCourse && isCoursePage ? (
          <Link href="/" className="flex gap-x-2 items-center">
            <ChevronLeft size={16} />
            {t("backTo")} {t("home")}
          </Link>
        ) : previousSegment ? (
          <Link href={previousHref} className="flex gap-x-2 items-center">
            <ChevronLeft size={12} />
            {t("backTo")} {t(previousSegment)}
          </Link>
        ) : null}
      </div>
    </>
  );
};

export default Breadcrumb;
