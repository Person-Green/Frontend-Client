import { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../../shared/ui/button.tsx';
import type { SurveyAnswers } from '../Survey/types.ts';
import ResultPlant from './components/ResultPlant.tsx';
import { recommendPlants } from '../../../shared/api/plants.ts';
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

const MatchingResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const answers = (location.state as { answers?: SurveyAnswers } | null)
    ?.answers;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RecommendPlantsResponse | null>(null);

  useEffect(() => {
    if (!answers) return;

    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await recommendPlants(buildRequest(answers));
        setResult(data);
      } catch {
        setError('추천 식물을 불러오는 데 실패했어요. 다시 시도해 주세요.');
      } finally {
        setLoading(false);
      }
    };

    fetch();
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
          <ul className="grid grid-cols-2 gap-x-12 gap-y-24">
            {result.plants.map((plant, index) => (
              <ResultPlant key={plant.plantId} plant={plant} rank={index + 1} />
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
