"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import InputFloatingLabel from "@/components/ui/inputFloatingLabel";
import ChoicesInputComponent from "@/components/ui/choices";
import { useTranslations } from "next-intl";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChallengeType } from "@/types/challengeTypes";
import { challengeSchema, ChallengeFormData } from "./challengeUtils";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LOCALE_FEATURES, LOCALE_LANGUAGES } from "@/components/constants";

interface ChallengeFormProps {
  challenge?: ChallengeType | null;
  onSubmit: (_data: ChallengeFormData) => Promise<void>;
  isLoading?: boolean;
  submitButtonText?: string;
}

export function ChallengeForm({ challenge, onSubmit, isLoading = false, submitButtonText }: ChallengeFormProps) {
  const t = useTranslations("backoffice");

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ChallengeFormData>({
    resolver: zodResolver(challengeSchema),
    defaultValues: {
      difficulty: challenge?.difficulty || "easy",
      question: challenge?.question || "",
      choices: challenge?.choices || ["", "", "", "", ""],
      correctChoice: challenge?.correctChoice || 0,
      language: challenge?.language || "",
    },
  });

  const handleFormSubmit = async (data: ChallengeFormData) => {
    await onSubmit(data);
  };

  return (
    <main className="mb-10 max-w-7xl w-full" key={challenge?._id}>
      <div className="flex w-full justify-between mb-6">
        <h4 className="xl:mb-[30px] mb-4">{challenge ? t("updateChallenge") : t("newChallenge")}</h4>
      </div>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-card rounded-[3px] p-6">
        <div className="w-full">
          <Controller
            name="question"
            control={control}
            render={({ field }) => (
              <InputFloatingLabel
                {...field}
                type="text"
                id="questionInput"
                label={t("question")}
                additionalStyles="mb-5 w-full"
                error={errors.question?.message}
              />
            )}
          />
          <div className="w-full">
            <Controller
              name="difficulty"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <p className="text-xs mb-2">{t("difficulty")}</p>
                  <RadioGroup
                    {...field}
                    onValueChange={field.onChange}
                    className={`flex gap-x-4 ${errors.difficulty?.message ? "mb-0" : "mb-5"}`}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="easy" id="easyRadioButton" />
                      <label htmlFor="easyRadioButton">{t("easy")}</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="mediumRadioButton" />
                      <label htmlFor="mediumRadioButton">{t("medium")}</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hard" id="hardRadioButton" />
                      <label htmlFor="hardRadioButton">{t("hard")}</label>
                    </div>
                  </RadioGroup>
                  {errors.difficulty?.message && (
                    <p className="text-red-500 mt-1 mb-5 form-error">{errors.difficulty?.message}</p>
                  )}
                </div>
              )}
            />
          </div>
        </div>

        <div className="w-full">
          <Controller
            name="language"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col">
                <p className="text-xs mb-2">Language</p>
                <Select value={field.value || ""} onValueChange={field.onChange}>
                  <SelectTrigger className="mb-5" data-testid="language-select">
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.values(LOCALE_FEATURES).map((lang) => {
                        const value = LOCALE_LANGUAGES[lang.locale as keyof typeof LOCALE_LANGUAGES];
                        return (
                          <SelectItem value={value} key={lang.locale} data-testid={`language-option-${value}`}>
                            <div className="flex items-center">
                              <Image src={lang.icon} alt={lang.title} width={20} height={20} className="mr-2" />
                              <span>{lang.title}</span>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.language?.message && (
                  <p className="text-red-500 mt-1 mb-5 form-error">{errors.language?.message}</p>
                )}
              </div>
            )}
          />
        </div>

        <Controller
          name="choices"
          control={control}
          render={({ field }) => (
            <ChoicesInputComponent
              choices={field.value}
              correctChoice={watch("correctChoice")}
              onChoicesChange={(updatedChoices, updatedCorrectChoice) => {
                field.onChange(updatedChoices);
                setValue("correctChoice", updatedCorrectChoice);
              }}
            />
          )}
        />
        {errors.choices && <p className="text-red-500 form-error">{errors.choices.message}</p>}
        {errors.correctChoice && <p className="text-red-500 form-error">{errors.correctChoice.message}</p>}

        <div className="pt-6 mt-6 pb-6 flex w-full justify-end border-t-[1px] border-t-border-gray">
          <Button type="submit" data-cy="button-challenge-submit" disabled={isLoading}>
            {submitButtonText || (challenge ? t("updateChallenge") : t("createChallenge"))}
          </Button>
        </div>
      </form>
    </main>
  );
}
