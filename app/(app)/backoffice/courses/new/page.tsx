"use client";

import InputFloatingLabel from "@/components/ui/inputFloatingLabel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/hooks/useUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { SimplifiedModuleType } from "@/types/moduleTypes";
import ModuleCard from "../_components/moduleCard";
import Separator from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const schema = z.object({
  title: z.string().nonempty("Title is required").max(100, "Title must be 100 characters or less"),
  summary: z.string().nonempty("Summary is required"),
  language: z.string().nonempty("Difficulty is required"),
});

type FormData = z.infer<typeof schema>;

const CreateCoursePage = () => {
  const { user } = useUser();
  const [modules, setModules] = useState<SimplifiedModuleType[]>([]);

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
    },
  });

  // @TODO: Get teamId from selector
  const selectedTeamId = user?.teams?.length ? user?.teams[0].id : "";

  const updateModule = (moduleId: string, updatedData: Partial<SimplifiedModuleType>) => {
    setModules((prevModules) =>
      prevModules.map((module) => (module.id === moduleId ? { ...module, ...updatedData } : module)),
    );
  };

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

  return (
    <main className="mb-10 max-w-7xl w-full">
      <h4 className="xl:mb-[30px] mb-4">Novo curso</h4>
      <div className="mt-6">
        <Tabs defaultValue="general">
          <TabsList className="w-fit">
            <TabsTrigger value="general">
              <span className="unbound-font text-sm font-medium">Informações Gerais</span>
            </TabsTrigger>
            <TabsTrigger value="modules">
              <span className="unbound-font text-sm font-medium">Módulos e outros</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="xl:pt-4 pt-2">
            <form className="bg-card rounded-[3px] p-6">
              <div className="flex flex-col gap-y-4">
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
                      <p className="text-xs">Language</p>
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
                  name="summary"
                  control={control}
                  render={({ field }) => <Textarea {...field} id="summaryTextArea" />}
                />
                {errors.summary?.message && (
                  <p className="text-red-500 mt-1 mb-5 form-error">{errors.summary?.message}</p>
                )}
              </div>
            </form>
          </TabsContent>
          <TabsContent value="modules" className="xl:pt-4 pt-2">
            <div className="flex flex-col gap-y-6 p-6">
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
                  />
                );
              })}
              <Separator />
              <div>
                <Button onClick={createModule}>Add Module</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default CreateCoursePage;
