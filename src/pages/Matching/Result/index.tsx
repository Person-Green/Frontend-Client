import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DetailHeader from '../../../widgets/detailHeader.tsx';
import MatchingTitle from '../../../shared/matchingTitle.tsx';
import Title from '../../../shared/ui/title.tsx';
import Modal from '../../../shared/ui/modal.tsx';
import ResultPlant from '../../../shared/ui/ResultPlant.tsx';
import { useModalStore } from '../../../shared/stores/modalStore.ts';
import { getRecommendationHistoryById } from '../../../entities/history.ts';
import { recommendPlants } from '../../../entities/plants.ts';
import { useBackOrHome } from '../../../shared/lib/useBackOrHome.ts';
import type {
  CareLevelType,
  ExperienceLevelType,
  HumidityLevel,
  PlacementType,
  PlantRecommendationResponse,
  RecommendPlantsRequest,
  SunlightLevel,
  TemperatureLevel,
  VentilationLevel,
} from '../../../entities/types.ts';
import type { SurveyAnswers } from '../Survey/types.ts';

const PLACE_MAP: Record<string, PlacementType> = {
  bedroom: 'BEDROOM',
  living: 'LIVING_ROOM',
  kitchen: 'KITCHEN',
  office: 'OFFICE',
  desk: 'DESK',
  bathroom: 'BATHROOM',
  veranda: 'BALCONY',
  window: 'WINDOW',
};
const LIGHT_MAP: Record<string, SunlightLevel> = {
  low: 'LOW',
  mid: 'MEDIUM',
  high: 'HIGH',
};
const AIR_MAP: Record<string, VentilationLevel> = {
  low: 'LOW',
  mid: 'NORMAL',
  high: 'HIGH',
};
const TEMP_MAP: Record<string, TemperatureLevel> = {
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

const buildRecommendRequest = (
  answers: SurveyAnswers,
): RecommendPlantsRequest | null => {
  if (
    !answers.place ||
    !answers.light ||
    !answers.air ||
    !answers.temperature ||
    !answers.humidity ||
    !answers.care ||
    !answers.experience ||
    !answers.pet
  ) {
    return null;
  }
  const placement = PLACE_MAP[answers.place];
  const sunlight = LIGHT_MAP[answers.light];
  const ventilation = AIR_MAP[answers.air];
  const temperature = TEMP_MAP[answers.temperature];
  const humidity = HUMIDITY_MAP[answers.humidity];
  const careLevel = CARE_MAP[answers.care];
  const experienceLevel = EXPERIENCE_MAP[answers.experience];
  if (
    !placement ||
    !sunlight ||
    !ventilation ||
    !temperature ||
    !humidity ||
    !careLevel ||
    !experienceLevel
  ) {
    return null;
  }
  return {
    placement,
    sunlight,
    ventilation,
    temperature,
    humidity,
    careLevel,
    experienceLevel,
    hasPet: answers.pet === 'yes',
  };
};

type ResultState = {
  historyId?: number;
  answers?: SurveyAnswers;
};

const MatchingResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const goBack = useBackOrHome();
  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const state = (location.state ?? null) as ResultState | null;
  const historyId = state?.historyId;
  const answers = state?.answers;
  const isHistoryView = typeof historyId === 'number';

  const [recommendedPlants, setRecommendedPlants] = useState<
    PlantRecommendationResponse[]
  >([]);
  const [titleText, setTitleText] = useState<string>('사용자님 장소에');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (isHistoryView) {
          const data = await getRecommendationHistoryById(historyId);
          if (cancelled) return;
          setRecommendedPlants(data.result.plants);
          setTitleText(data.title);
        } else if (answers) {
          const body = buildRecommendRequest(answers);
          if (!body) {
            throw new Error('설문 응답이 완전하지 않습니다.');
          }
          const data = await recommendPlants(body);
          if (cancelled) return;
          setRecommendedPlants(data.plants);
        } else {
          throw new Error('잘못된 접근입니다.');
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setError(
            e instanceof Error && e.message
              ? e.message
              : '매칭 결과를 불러오지 못했습니다.',
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [isHistoryView, historyId, answers]);

  const showExitModal = () => {
    openModal({
      useImage: false,
      title: '나가기 전에!',
      body: '식물 찜하기 하셨나요?',
      label: '다시 매칭기록에서 찾아보실수 있어요!',
      buttonAmount: 2,
      buttons: [
        { label: '더 둘러보기', onClick: () => closeModal() },
        {
          label: '나가기',
          icon: 'meeting_room',
          onClick: () => {
            closeModal();
            navigate('/');
          },
        },
      ],
    });
  };

  return (
    <main className="min-h-screen flex flex-col">
      <DetailHeader onBack={isHistoryView ? goBack : showExitModal}>
        매칭결과
      </DetailHeader>
      <section className="flex flex-1 flex-col gap-24 p-20">
        <div className="flex flex-1 flex-col gap-24 pt-24">
          <MatchingTitle icon="bookmarks" textSize="title-l">
            {titleText}
            <br />
            알맞는 식물들을 찾았어요!
          </MatchingTitle>

          <div className="flex flex-1 flex-col gap-16 py-16">
            <Title icon="yard" title="추천 식물" />

            {isLoading && (
              <p className="label-s text-text-30 text-center py-8">
                불러오는 중...
              </p>
            )}
            {error && (
              <p className="label-s text-text-30 text-center py-8">{error}</p>
            )}

            {!isLoading && !error && (
              <ul className="grid grid-cols-2 gap-x-8 gap-y-12">
                {recommendedPlants.map((plant, index) => (
                  <ResultPlant
                    key={`${plant.plantId}-${index}`}
                    plant={plant}
                    rank={index + 1}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
      <Modal />
    </main>
  );
};

export default MatchingResult;
