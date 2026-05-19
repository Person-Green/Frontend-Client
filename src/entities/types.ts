// ─── Auth ────────────────────────────────────────────────────────────────────

export interface GoogleAuthorizationResponse {
  authorizationUrl: string;
  state: string;
}

export interface GoogleLoginRequest {
  authorizationCode: string;
  state: string;
  redirectUri: string;
}

export interface UserResponse {
  id: number;
  email: string;
  name: string;
  profileImageUrl: string;
}

export interface AuthTokenResponse {
  accessToken: string;
  expiresIn: number;
  user: UserResponse;
}

export interface UpdateUsernameRequest {
  username: string;
}

// ─── Diagnosis ───────────────────────────────────────────────────────────────

export interface DiagnosisRequest {
  sunlight: string;
  temperature: string;
  humidity: string;
  ventilation: string;
}

export interface DiagnosisResponse {
  typeId: string;
  typeName: string;
  description: string;
  sunlight: string;
  ventilation: string;
  temperature: string;
  humidity: string;
}

export interface PlantSummaryResponse {
  plantId: string;
  plantKoreanName: string;
  plantEnglishName: string;
  manageDifficulty: string;
  airPurification: string;
  size: string;
  description: string;
  fit: string;
}

export interface DiagnosisResultResponse {
  environment: DiagnosisResponse;
  plants: PlantSummaryResponse[];
}

// ─── Plant Recommendation ────────────────────────────────────────────────────

export type SunlightLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type VentilationLevel = 'LOW' | 'NORMAL' | 'HIGH';
export type TemperatureLevel = 'LOW' | 'NORMAL' | 'HIGH';
export type HumidityLevel = 'LOW' | 'NORMAL' | 'HIGH';
export type CareLevelType = 'LOW' | 'MEDIUM' | 'HIGH';
export type ExperienceLevelType = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
export type PlacementType =
  | 'DESK'
  | 'WINDOW'
  | 'LIVING_ROOM'
  | 'BATHROOM'
  | 'KITCHEN'
  | 'BEDROOM'
  | 'BALCONY'
  | 'OFFICE';

export interface RecommendPlantsRequest {
  sunlight: SunlightLevel;
  ventilation: VentilationLevel;
  temperature: TemperatureLevel;
  humidity: HumidityLevel;
  careLevel: CareLevelType;
  experienceLevel: ExperienceLevelType;
  hasPet: boolean;
  placement: PlacementType;
}

export interface PlantRecommendationResponse {
  plantId: string;
  plantName: string;
  plantEnglishName: string;
  imageUrl: string | null;
  score: number;
  reasons: string[];
  cautions: string[];
  representativeEnvironment: string;
  secondaryEnvironmentTags: string[];
  airPurificationLevel: string;
  petSafetyLevel: string;
  difficultyLevel: string;
  sizeCategory: string;
  recommendedPlacements: string[];
  description: string;
}

export interface RecommendPlantsResponse {
  historyId: number;
  saved: boolean;
  representativeEnvironment: string;
  secondaryEnvironmentTags: string[];
  plants: PlantRecommendationResponse[];
}

// ─── Plant Catalog ───────────────────────────────────────────────────────────

export type ManageDifficulty = 'VERY_EASY' | 'EASY' | 'NORMAL' | 'HARD';
export type AirPurification = 'NORMAL' | 'HIGH' | 'VERY_HIGH';

export interface GetPlantsParams {
  cursor?: string;
  size?: number;
  sort?: 'ID_ASC' | 'LIKE_DESC';
  keyword?: string;
  manageDifficulty?: ManageDifficulty[];
  airPurification?: AirPurification[];
  plantSize?: string[];
  environmentTypeId?: string[];
}

export interface PlantCatalogItemResponse {
  plantId: string;
  plantKoreanName: string;
  plantEnglishName: string;
  imageUrl?: string;
  size: string;
  airPurification: string;
  manageDifficulty: string;
  isFavorite: boolean;
  favoriteCount: number;
}

export interface PlantCatalogPageResponse {
  plants: PlantCatalogItemResponse[];
  nextCursor: string;
  hasNext: boolean;
}

export interface PlantDetailResponse {
  plantId: string;
  plantKoreanName: string;
  plantEnglishName: string;
  imageUrl?: string;
  manageDifficulty: string;
  waterPeriod: string;
  appropriateTemperature: string;
  appropriateHumidity: string;
  sunlightRequirements: string;
  size: string;
  recommendedIndoorLocation: string;
  airPurification: string;
  petSafety: string;
  description: string;
  isFavorite: boolean;
}

export interface FavoritePlantsResponse {
  plantId: string;
  plantKoreanName: string;
  plantEnglishName: string;
  imageUrl?: string;
  size: string;
  airPurification: string;
  manageDifficulty: string;
  isFavorite: boolean;
  favoriteCount: number;
}

export interface FavoritePlantsListResponse {
  favoritePlants: FavoritePlantsResponse[];
}

// ─── Recommendation History ──────────────────────────────────────────────────

export interface RecommendationHistoryItem {
  historyId: number;
  title: string;
  plantSummaryText: string;
  createdAt: string;
}

export interface RecommendationHistoryPageResponse {
  items: RecommendationHistoryItem[];
  nextCursor: number;
  hasNext: boolean;
}

export interface RequestSnapshot {
  sunlight: string;
  ventilation: string;
  temperature: string;
  humidity: string;
  careLevel: string;
  experienceLevel: string;
  hasPet: boolean;
  placement: string;
}

export interface ResultSnapshot {
  representativeEnvironment: string;
  secondaryEnvironmentTags: string[];
  plants: PlantRecommendationResponse[];
}

export interface RecommendationHistoryDetailResponse {
  historyId: number;
  title: string;
  plantSummaryText: string;
  createdAt: string;
  request: RequestSnapshot;
  result: ResultSnapshot;
}
