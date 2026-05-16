import axiosInstance from './axiosInstance';
import type {
  RecommendationHistoryPageResponse,
  RecommendationHistoryDetailResponse,
} from './types';

/**
 * 추천 히스토리 목록 조회 (커서 기반 페이지네이션)
 * GET /users/me/recommendation-histories
 */
export const getRecommendationHistories = async (params?: {
  cursor?: number;
  size?: number;
}): Promise<RecommendationHistoryPageResponse> => {
  const { data } =
    await axiosInstance.get<RecommendationHistoryPageResponse>(
      '/users/me/recommendation-histories',
      { params },
    );
  return data;
};

/**
 * 추천 히스토리 상세 조회
 * GET /users/me/recommendation-histories/:historyId
 */
export const getRecommendationHistoryById = async (
  historyId: number,
): Promise<RecommendationHistoryDetailResponse> => {
  const { data } =
    await axiosInstance.get<RecommendationHistoryDetailResponse>(
      `/users/me/recommendation-histories/${historyId}`,
    );
  return data;
};

/**
 * 추천 히스토리 삭제
 * DELETE /users/me/recommendation-histories/:historyId
 */
export const deleteRecommendationHistory = async (
  historyId: number,
): Promise<void> => {
  await axiosInstance.delete(
    `/users/me/recommendation-histories/${historyId}`,
  );
};
