import axiosInstance from '../shared/api/axiosInstance';
import type {
  GetPlantsParams,
  PlantCatalogPageResponse,
  PlantDetailResponse,
  FavoritePlantsListResponse,
  RecommendPlantsRequest,
  RecommendPlantsResponse,
} from './types';

/**
 * 식물 목록 조회 (커서 기반 페이지네이션)
 * GET /plants
 */
export const getPlants = async (
  params?: GetPlantsParams,
): Promise<PlantCatalogPageResponse> => {
  const { data } = await axiosInstance.get<PlantCatalogPageResponse>(
    '/plants',
    { params },
  );
  return data;
};

/**
 * 식물 상세 조회
 * GET /plants/:plantId
 */
export const getPlantById = async (
  plantId: string,
): Promise<PlantDetailResponse> => {
  const { data } = await axiosInstance.get<PlantDetailResponse>(
    `/plants/${plantId}`,
  );
  return data;
};

/**
 * 식물 즐겨찾기 추가
 * POST /plants/:plantId/favorite
 */
export const addFavorite = async (plantId: string): Promise<void> => {
  await axiosInstance.post(`/plants/${plantId}/favorite`);
};

/**
 * 식물 즐겨찾기 제거
 * DELETE /plants/:plantId/favorite
 */
export const removeFavorite = async (plantId: string): Promise<void> => {
  await axiosInstance.delete(`/plants/${plantId}/favorite`);
};

/**
 * 즐겨찾기한 식물 목록 조회
 * GET /plants/favorites
 */
export const getFavoritePlants =
  async (): Promise<FavoritePlantsListResponse> => {
    const { data } =
      await axiosInstance.get<FavoritePlantsListResponse>('/plants/favorites');
    return data;
  };

/**
 * 식물 추천 받기
 * POST /diagnosis/recommendations
 */
export const recommendPlants = async (
  body: RecommendPlantsRequest,
): Promise<RecommendPlantsResponse> => {
  const { data } = await axiosInstance.post<RecommendPlantsResponse>(
    '/diagnosis/recommendations',
    body,
  );
  return data;
};
