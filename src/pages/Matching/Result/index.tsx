import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DetailHeader from '../../../widgets/detailHeader.tsx';
import MatchingTitle from '../../../shared/matchingTitle.tsx';
import Title from '../../../shared/ui/title.tsx';
import Modal from '../../../shared/ui/modal.tsx';
import ResultPlant from '../../../shared/ui/ResultPlant.tsx';
import { useModalStore } from '../../../shared/stores/modalStore.ts';
import { getRecommendationHistoryById } from '../../../shared/api/history.ts';
import type {
  PlantRecommendationResponse,
  RecommendPlantsResponse,
  RecommendationHistoryDetailResponse,
} from '../../../shared/api/types.ts';

const MOCK_PLANT_BASE: Omit<PlantRecommendationResponse, 'plantId' | 'score'> = {
  plantName: '스투키',
  plantEnglishName: 'Stucky',
  reasons: [],
  cautions: [],
  representativeEnvironment: '실내',
  secondaryEnvironmentTags: [],
  airPurificationLevel: 'HIGH',
  petSafetyLevel: 'SAFE',
  difficultyLevel: 'EASY',
  sizeCategory: 'MEDIUM',
  recommendedPlacements: [],
  description: '관리 쉬움, 중형, 공기정화 높음',
};

const MOCK_RESULT: RecommendPlantsResponse = {
  historyId: 0,
  saved: false,
  representativeEnvironment: '실내',
  secondaryEnvironmentTags: [],
  plants: [
    { ...MOCK_PLANT_BASE, plantId: 'mock-1', score: 107 },
    { ...MOCK_PLANT_BASE, plantId: 'mock-2', score: 94000 },
    { ...MOCK_PLANT_BASE, plantId: 'mock-3', score: 9000 },
    { ...MOCK_PLANT_BASE, plantId: 'mock-4', score: 62 },
    { ...MOCK_PLANT_BASE, plantId: 'mock-4', score: 62 },
    { ...MOCK_PLANT_BASE, plantId: 'mock-4', score: 62 },
    { ...MOCK_PLANT_BASE, plantId: 'mock-4', score: 62 },
    { ...MOCK_PLANT_BASE, plantId: 'mock-4', score: 62 },
    { ...MOCK_PLANT_BASE, plantId: 'mock-4', score: 62 },
  ],
};

const MatchingResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const historyId = (location.state as { historyId?: number } | null)?.historyId;
  const isHistoryView = typeof historyId === 'number';

  const [historyDetail, setHistoryDetail] =
    useState<RecommendationHistoryDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(isHistoryView);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isHistoryView) return;
    let cancelled = false;
    setIsLoading(true);
    setError(null);
    getRecommendationHistoryById(historyId)
      .then((data) => {
        if (!cancelled) setHistoryDetail(data);
      })
      .catch((e) => {
        console.error(e);
        if (!cancelled) setError('매칭 결과를 불러오지 못했습니다.');
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [historyId, isHistoryView]);

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

  const plants: PlantRecommendationResponse[] = isHistoryView
    ? (historyDetail?.result.plants ?? [])
    : MOCK_RESULT.plants;

  const titleFirstLine = isHistoryView
    ? (historyDetail?.title ?? '')
    : '사용자님 장소에';

  return (
    <main className="min-h-screen flex flex-col">
      <DetailHeader onBack={isHistoryView ? () => navigate(-1) : showExitModal}>
        매칭결과
      </DetailHeader>
      <section className="flex flex-1 flex-col gap-24 p-20">
        <div className="flex flex-1 flex-col gap-24 pt-24">
          <MatchingTitle icon="bookmarks" textSize="title-l">
            {titleFirstLine}
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
                {plants.map((plant, index) => (
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
