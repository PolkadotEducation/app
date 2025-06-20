"use client";

import InputFloatingLabel from "@/components/ui/inputFloatingLabel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/hooks/useUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useRef, useState } from "react";
import { ModuleType, SimplifiedModuleType } from "@/types/moduleTypes";
import ModuleCard from "../_components/moduleCard";
import Separator from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { LessonSummary } from "@/types/lessonTypes";
import { getLessonsSummary } from "@/api/lessonService";
import { CirclePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { createCourse } from "@/api/courseService";
import { useToast } from "@/hooks/useToast";
import { useTranslations } from "next-intl";
import CourseCardPreview from "@/components/ui/courseCardPreview";

const schema = z.object({
  title: z.string().nonempty("Title is required").max(100, "Title must be 100 characters or less"),
  summary: z.string().nonempty("Summary is required"),
  language: z.string().nonempty("Difficulty is required"),
  banner: z.string().nonempty("Banner is required"),
});

type FormData = z.infer<typeof schema>;

const CreateCoursePage = () => {
  const { user } = useUser();
  const [modules, setModules] = useState<SimplifiedModuleType[]>([]);
  const [lessons, setLessons] = useState<LessonSummary[]>([]);
  const router = useRouter();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const t = useTranslations("backoffice");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      summary: "",
      language: "english",
      banner: "blackPink",
    },
  });

  // @TODO: Get teamId from selector
  const selectedTeamId = user?.teams?.length ? user?.teams[0].id : "";

  const updateModule = (moduleId: string, updatedData: Partial<SimplifiedModuleType>) => {
    setModules((prevModules) =>
      prevModules.map((module) => (module.id === moduleId ? { ...module, ...updatedData } : module)),
    );
  };

  const getLessons = async () => {
    const response = await getLessonsSummary();
    setLessons(response);
  };

  useEffect(() => {
    getLessons();
  }, []);

  const createModule = () => {
    const newModuleId = `module-${modules.length + 1}`;
    setModules((prevModules) => [
      ...prevModules,
      {
        id: newModuleId,
        title: `Module ${modules.length + 1}`,
        lessons: [],
      },
    ]);
  };

  const onSubmit = async (data: FormData) => {
    if (modules.length <= 0) {
      toast({
        title: t("atLeastOneModule"),
        variant: "destructive",
      });
      return;
    }

    const courseData = {
      teamId: selectedTeamId,
      title: data.title,
      language: data.language,
      summary: data.summary,
      banner: data.banner as "blackPink" | "blackPurple" | "tetris" | "gradient",
      modules: modules.map((m) => {
        return {
          title: m.title,
          lessons: m.lessons,
        };
      }) as ModuleType[],
    };

    try {
      const response = await createCourse(selectedTeamId, courseData);
      if (response) {
        toast({
          title: t("courseCreated"),
          variant: "default",
        });
        router.push("/backoffice/courses");
      } else {
        toast({
          title: t("courseCreationError"),
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <main className="mb-10 max-w-7xl w-full">
      <h4 className="xl:mb-[30px] mb-4">{t("newCourse")}</h4>
      <form id="courseForm" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-6">
          <Tabs defaultValue="general">
            <TabsList className="w-fit">
              <TabsTrigger value="general">
                <span className="unbound-font text-sm font-medium">{t("generalInfo")}</span>
              </TabsTrigger>
              <TabsTrigger value="modules">
                <span className="unbound-font text-sm font-medium">{t("modulesAndOthers")}</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="general" className="xl:pt-4 pt-2">
              <div className="flex flex-col gap-y-4 bg-card p-6 mt-6">
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <InputFloatingLabel
                      {...field}
                      type="text"
                      id="titleInput"
                      label="Title"
                      additionalStyles="mb-5 w-[49%]"
                      error={errors.title?.message}
                    />
                  )}
                />
                <Controller
                  name="language"
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-col">
                      <p className="text-xs">{t("language")}</p>
                      <RadioGroup
                        {...field}
                        onValueChange={field.onChange}
                        className={`flex gap-x-4 ${errors.language?.message ? "mb-0" : "mb-5"}`}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="english" id="englishRadioButton" />
                          <label htmlFor="englishRadioButton">English</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="spanish" id="spanishRadioButton" />
                          <label htmlFor="spanishRadioButton">Spanish</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="portuguese" id="portugueseRadioButton" />
                          <label htmlFor="portugueseRadioButton">Portuguese</label>
                        </div>
                      </RadioGroup>
                      {errors.language?.message && (
                        <p className="text-red-500 mt-1 mb-5 form-error">{errors.language?.message}</p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  name="banner"
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-col">
                      <p className="text-xs">Banner</p>
                      <RadioGroup
                        {...field}
                        onValueChange={field.onChange}
                        className={`flex flex-wrap ${errors.language?.message ? "mb-0" : "mb-5"}`}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="blackPink" id="blackPinkRadioButton" />
                          <label htmlFor="blackPinkRadioButton">
                            <CourseCardPreview banner="blackPink" title="Black Pink" />
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="blackPurple" id="blackPurpleRadioButton" />
                          <label htmlFor="blackPurpleRadioButton">
                            <CourseCardPreview banner="blackPurple" title="Black Purple" />
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="tetris" id="tetrisRadioButton" />
                          <label htmlFor="tetrisRadioButton">
                            <CourseCardPreview banner="tetris" title="Tetris" />
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="gradient" id="gradientRadioButton" />
                          <label htmlFor="gradientRadioButton">
                            <CourseCardPreview banner="gradient" title="Gradient" />
                          </label>
                        </div>
                      </RadioGroup>
                      {errors.banner?.message && (
                        <p className="text-red-500 mt-1 mb-5 form-error">{errors.banner?.message}</p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  name="summary"
                  control={control}
                  render={({ field }) => <Textarea {...field} id="summaryTextArea" className="h-[280px]" />}
                />
                {errors.summary?.message && (
                  <p className="text-red-500 mt-1 mb-5 form-error">{errors.summary?.message}</p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="modules" className="xl:pt-4 pt-2">
              <div className="flex flex-col gap-y-6 p-6">
                {modules.length <= 0 && <p>{t("noModules")}</p>}
                {modules.map((module, index) => {
                  return (
                    <ModuleCard
                      key={module.id}
                      index={index}
                      title={module.title}
                      lessons={module.lessons.map(({ _id, title }) => ({ _id, title }))}
                      onChange={(updatedData) =>
                        updateModule(module.id as string, {
                          ...updatedData,
                          lessons: updatedData.lessons?.map(({ _id, title }) => ({ _id, title })) || module.lessons,
                        })
                      }
                      lessonsData={lessons}
                    />
                  );
                })}
                <Separator />
                <div>
                  <Button type="button" variant="outline" onClick={createModule}>
                    <CirclePlus className="mr-2" /> {t("addModule")}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <div className="flex gap-x-4 justify-end items-center mt-6">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              {t("cancel")}
            </Button>
            <Button type="submit">{t("submit")}</Button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default CreateCoursePage;
