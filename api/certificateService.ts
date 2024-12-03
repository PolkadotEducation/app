import { ServerAxiosError, serverGet, serverPost } from "./actions/api";
import { CERTIFICATES, CERTIFICATE_GENERATE } from "./constants";
import { CertificateType } from "@/types/certificateTypes";

export const getCertificates = async (params?: { userId?: string; courseId?: string }): Promise<CertificateType[]> => {
  const queryParams = new URLSearchParams();
  if (params?.userId) queryParams.append("userId", params.userId);
  if (params?.courseId) queryParams.append("courseId", params.courseId);

  const url = queryParams.toString() ? `${CERTIFICATES}?${queryParams.toString()}` : CERTIFICATES;

  const response = await serverGet<CertificateType[]>(url);
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response as CertificateType[];
};

export const generateCertificate = async (courseId: string): Promise<CertificateType> => {
  const response = await serverPost<CertificateType>(CERTIFICATE_GENERATE, { courseId });
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response as CertificateType;
};

export const getCertificateById = async (certificateId: string): Promise<CertificateType> => {
  const response = await serverGet<CertificateType>(`${CERTIFICATES}/${certificateId}`);
  if ((response as ServerAxiosError).error) throw response as ServerAxiosError;
  return response as CertificateType;
};
