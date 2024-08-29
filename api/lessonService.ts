import api, { Api } from "./api";
import { LESSON } from "./constants";
import { AxiosResponse } from "axios";
import { LessonType } from "@/types/lessonTypes";

type LessonResponse = {
  lessonId: string;
};

class LessonService {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  public async createLesson(lessonData: LessonType): Promise<AxiosResponse<LessonResponse>> {
    const response = await this.api.post<LessonResponse>(LESSON, lessonData);
    return response;
  }

  public async getLessonById(id: string): Promise<AxiosResponse<LessonType>> {
    const response = await this.api.get<LessonType>(`${LESSON}?lessonId=${id}`);
    return response;
  }
}

const lessonService = new LessonService(api);
export default lessonService;
