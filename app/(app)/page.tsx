"use client";

import CourseCardPreview from "@/components/ui/courseCardPreview";
import Loading from "@/components/ui/loading";
import { useCourse } from "@/hooks/useCourse";
import { useUser } from "@/hooks/useUser";
import { CourseType } from "@/types/courseTypes";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect } from "react";
import rankStar from "../../public/assets/icons/level-star.svg";
import globalRank from "../../public/assets/icons/global-rank.svg";
import weeklyRank from "../../public/assets/icons/weekly-rank.svg";
import victor from "../../public/assets/icons/victor-img.svg";

const Home = () => {
  const { courses, loading, error, fetchCourses } = useCourse();
  const t = useTranslations("home");
  const { userLoading, user } = useUser();

  useEffect(() => {
    if (!userLoading && user) fetchCourses();
  }, [userLoading]);

  return (
    <div className="flex xl:pt-10 px-2 pt-5 flex-col w-full mb-20">
      <h4 className="mb-5" data-cy="text-home-courses">
        {t("courses")}
      </h4>
      <p className="text-body1 mb-10 xl:mb-16">{t("description")}</p>
      {loading && (
        <div className="flex w-full justify-center">
          <Loading />
        </div>
      )}
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4 justify-center md:flex-row">
          <h5>Victor Carvalho</h5>
          <Image src={victor} alt="Victor" />
        </div>
        <ul className="flex gap-4 items-center justify-center bg-secondary-main w-[max-content] py-2 px-4 rounded-xl">
          <li className="flex flex-col items-center justify-center text-neutral-50 px-10 gap-1">
            <Image src={rankStar} alt="Level star" /> <p>Level</p> <p>6</p>
          </li>
          <li className="flex flex-col items-center justify-center text-neutral-50 px-10 border-r border-l border-neutral-300 gap-1">
            {" "}
            <Image src={globalRank} alt="Global rank" />
            <p>Rank Geral</p>
            <p>#162</p>
          </li>
          <li className="flex flex-col items-center justify-center text-neutral-50 px-10 gap-1">
            <Image src={weeklyRank} alt="Weekly rank" />
            <p>Rank Sem.</p>
            <p>#16</p>
          </li>
        </ul>
      </div>
      {error && <div>{error}</div>}
      {!loading && !courses && <div>Courses not found</div>}
      {!loading && (
        <div className="flex flex-row flex-wrap w-full">
          {courses &&
            courses.map((course: CourseType) => (
              <div className="pb-4 pr-4 w-full md:w-1/2 lg:w-1/3" key={course._id} data-cy="link-course-home">
                <CourseCardPreview
                  banner="blackPink" // @TODO: allow the content creator to choose the banner style when creating the course
                  title={course.title}
                  link={`course/${course._id}`}
                  key={course._id}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Home;
