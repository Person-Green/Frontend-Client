import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../../shared/ui/button.tsx';
import { recommendPlants } from '../../../shared/api/plants.ts';
import type { SurveyAnswers } from '../Survey/types.ts';
import type {
  RecommendPlantsRequest,
  RecommendPlantsResponse,
  SunlightLevel,
  VentilationLevel,
  TemperatureLevel,
  HumidityLevel,
  CareLevelType,
  ExperienceLevelType,
  PlacementType,
} from '../../../shared/api/types.ts';

// ─── Survey 값 → API 요청 값 매핑 ────────────────────────────────────────────

const SUNLIGHT_MAP: Record<string, SunlightLevel> = {
  low: 'LOW',
  mid: 'MEDIUM',
  high: 'HIGH',
};

const VENTILATION_MAP: Record<string, VentilationLevel> = {
  low: 'LOW',
  mid: 'NORMAL',
  high: 'HIGH',
};

const TEMPERATURE_MAP: Record<string, TemperatureLevel> = {
  cool: 'LOW',
  normal: 'NORMAL',
  hot: 'HIGH',
};

const HUMIDITY_MAP: Record<string, HumidityLevel> = {
  dry: 'LOW',
  mid: 'NORMAL',
  wet: 'HIGH',
};

const CARE_MAP: Record<string, CareLevelType> = {
  easy: 'LOW',
  mid: 'MEDIUM',
  high: 'HIGH',
};

const EXPERIENCE_MAP: Record<string, ExperienceLevelType> = {
  first: 'BEGINNER',
  few: 'INTERMEDIATE',
  expert: 'ADVANCED',
};

const PLACEMENT_MAP: Record<string, PlacementType> = {
  bedroom: 'BEDROOM',
  living: 'LIVING_ROOM',
  kitchen: 'KITCHEN',
  office: 'OFFICE',
  desk: 'DESK',
  bathroom: 'BATHROOM',
  veranda: 'BALCONY',
  window: 'WINDOW',
};

function buildRequest(answers: SurveyAnswers): RecommendPlantsRequest {
  return {
    sunlight: SUNLIGHT_MAP[answers.light ?? ''] ?? 'LOW',
    ventilation: VENTILATION_MAP[answers.air ?? ''] ?? 'LOW',
    temperature: TEMPERATURE_MAP[answers.temperature ?? ''] ?? 'LOW',
    humidity: HUMIDITY_MAP[answers.humidity ?? ''] ?? 'LOW',
    careLevel: CARE_MAP[answers.care ?? ''] ?? 'LOW',
    experienceLevel: EXPERIENCE_MAP[answers.experience ?? ''] ?? 'BEGINNER',
    hasPet: answers.pet === 'yes',
    placement: PLACEMENT_MAP[answers.place ?? ''] ?? 'DESK',
  };
}

// ─── 컴포넌트 ─────────────────────────────────────────────────────────────────

const MatchingResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const answers = (location.state as { answers?: SurveyAnswers } | null)
    ?.answers;

  const [result, setResult] = useState<RecommendPlantsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!answers) {
      setError('설문 데이터가 없습니다.');
      setLoading(false);
      return;
    }

    const request = buildRequest(answers);

    recommendPlants(request)
      .then((data) => {
        setResult(data);
      })
      .catch(() => {
        setError('추천 결과를 불러오는 데 실패했습니다.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen flex flex-col p-20">
      <h1 className="title-l py-24">매칭 결과</h1>

      {loading && (
        <div className="flex-1 flex items-center justify-center">
          <p className="body-s text-text-30">추천 식물을 찾고 있어요...</p>
        </div>
      )}

      {error && (
        <div className="flex-1 flex items-center justify-center">
          <p className="body-s text-red-500">{error}</p>
        </div>
      )}

      {result && (
        <div className="flex-1 flex flex-col gap-16">
          <p className="body-s text-text-30">{result.representativeEnvironment}</p>
          <ul className="flex flex-col gap-12">
            {result.plants.map((plant) => (
              <li
                key={plant.plantId}
                className="flex flex-col gap-4 p-16 rounded-14 bg-surface-20"
              >
                <div className="flex items-center justify-between">
                  <span className="body-m font-semibold">{plant.plantName}</span>
                  <span className="label-s text-text-30">{plant.plantEnglishName}</span>
                </div>
                <p className="body-s text-text-20">{plant.description}</p>
                {plant.reasons.length > 0 && (
                  <ul className="flex flex-col gap-2 mt-4">
                    {plant.reasons.map((reason, i) => (
                      <li key={i} className="label-s text-primary">
                        • {reason}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="h-fit pt-24">
        <Button onClick={() => navigate('/')}>홈으로</Button>
      </div>
    </main>
  );
};

export default MatchingResult;
