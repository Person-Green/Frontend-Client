import axiosInstance from './axiosInstance';
import type { DiagnosisRequest, DiagnosisResultResponse } from './types';

/**
 * 환경 진단 실행
 * POST /diagnosis
 */
export const executeDiagnosis = async (
  body: DiagnosisRequest,
): Promise<DiagnosisResultResponse> => {
  const { data } = await axiosInstance.post<DiagnosisResultResponse>(
    '/diagnosis',
    body,
  );
  return data;
};
