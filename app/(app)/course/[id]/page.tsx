"use client";

import Image from "next/image";
import { getCourse } from "@/api/courseService";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CoursePage = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  const [course, setCourse] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchCourse = async () => {
      try {
        const response = await getCourse(id);
        setCourse(response);
      } catch (err) {
        console.error("Failed to fetch course:", err);
        setError("Failed to fetch course");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, []);

  console.info(course);
  return (
    <div className="flex xl:pt-10 px-2 pt-16 flex-col w-full">
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!loading && !course && <div>course not found</div>}
      {course && (
        <div>
          <div>
            <h2 className="mb-5" data-cy="text-home-courses">
              {course.title}
            </h2>
            <Image
              src={"https://placehold.co/1280x440.png"}
              alt={""}
              width="1280"
              height="440"
              className="border rounded-xl mb-10"
            />
          </div>
          <div className="mb-5">
            <h6 className="text-primary mb-4">Summary</h6>
            <p>{course.summary}</p>
          </div>
          <div>
            <h6 className="text-primary mb-4">Content</h6>
            {course.modules.map((module: any, index: any) => (
              <div>
                <ModuleAccordeon key={index} index={index} title={module.title} lessons={module.lessons} />
                <hr />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ModuleAccordeon = ({ index, title, lessons }: { index: any; title: string; lessons: any }) => {
  const router = useRouter();

  console.info(lessons);
  return (
    <div>
      <h6>{`Module ${index + 1}: ${title}`}</h6>
      <ul>
        {lessons.map((lesson: string) => (
          <li onClick={() => router.push(`/lesson/${lesson}`)}>{lesson}</li>
        ))}
      </ul>
    </div>
  );
};

export default CoursePage;
