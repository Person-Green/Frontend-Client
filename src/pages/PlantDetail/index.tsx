import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getPlantById, addFavorite, removeFavorite } from '../../entities';
import type {
  PlantCatalogItemResponse,
  PlantDetailResponse,
} from '../../entities';
import Button from '../../shared/ui/button';
import NonePlantImage from '../../assets/plants/none.svg';
import { toDifficultyLabel } from '../../shared/lib/plantLabels';
import Kakao from '../../assets/icon/kakao.svg';

declare global {
  interface Window {
    Kakao: {
      isInitialized: () => boolean;
      init: (key: string) => void;
      Share: {
        sendCustom: (options: { templateId: number; templateArgs?: Record<string, string> }) => void;
      };
    };
  }
}

const KAKAO_JS_KEY = import.meta.env.VITE_KAKAO_API_KEY as string;

const loadKakaoSDK = (): Promise<void> =>
  new Promise((resolve, reject) => {
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_JS_KEY);
      }
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js';
    script.onload = () => {
      window.Kakao.init(KAKAO_JS_KEY);
      resolve();
    };
    script.onerror = () => reject(new Error('카카오 SDK 로드 실패'));
    document.head.appendChild(script);
  });

const catalogToDetail = (
  item: PlantCatalogItemResponse,
): PlantDetailResponse => ({
  plantId: item.plantId,
  plantKoreanName: item.plantKoreanName,
  plantEnglishName: item.plantEnglishName,
  imageUrl: item.imageUrl,
  manageDifficulty: item.manageDifficulty,
  size: item.size,
  airPurification: item.airPurification,
  isFavorite: item.isFavorite,
  waterPeriod: '',
  appropriateTemperature: '',
  appropriateHumidity: '',
  sunlightRequirements: '',
  recommendedIndoorLocation: '',
  petSafety: '',
  description: '',
});

const PlantDetail = () => {
  const { plantId } = useParams<{ plantId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const passedPlant = (
    location.state as { plant?: PlantCatalogItemResponse } | null
  )?.plant;
  const [plant, setPlant] = useState<PlantDetailResponse | null>(
    passedPlant && passedPlant.plantId === plantId
      ? catalogToDetail(passedPlant)
      : null,
  );
  const [loading, setLoading] = useState(
    !(passedPlant && passedPlant.plantId === plantId),
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!plantId) return;
    const hasPassed = passedPlant && passedPlant.plantId === plantId;
    if (!hasPassed) setLoading(true);
    getPlantById(plantId)
      .then((res) => setPlant(res))
      .catch(() => {
        if (!hasPassed) setError(true);
      })
      .finally(() => setLoading(false));
  }, [plantId]);

  const handleFavorite = async () => {
    if (!plant || !plantId) return;
    try {
      if (plant.isFavorite) {
        await removeFavorite(plantId);
      } else {
        await addFavorite(plantId);
      }
      setPlant((prev) => prev ? { ...prev, isFavorite: !prev.isFavorite } : prev);
    } catch (e) {
      console.error('즐겨찾기 처리 실패', e);
    }
  };

  const handleKakaoShare = async () => {
    if (!plant) return;
    try {
      await loadKakaoSDK();
      const shareUrl = `https://people-green.vercel.app${window.location.pathname}`;
      window.Kakao.Share.sendCustom({
        templateId: 133611,
        templateArgs: {
          shareUrl,
          img: plant.imageUrl?.trim() || '',
        },
      });
    } catch (e) {
      console.error('카카오 공유 실패', e);
    }
  };

  if (loading) {
    return (
      <main className="flex flex-col items-center justify-center min-h-dvh">
        <span className="body-s text-text-20">불러오는 중...</span>
      </main>
    );
  }

  if (error || !plant) {
    return (
      <main className="flex flex-col items-center justify-center min-h-dvh gap-12">
        <span className="body-s text-text-20">식물 정보를 불러올 수 없어요.</span>
        <button onClick={() => navigate(-1)} className="label-m text-text-highlight">
          돌아가기
        </button>
      </main>
    );
  }

  return (
    <main className="flex flex-col min-h-dvh bg-surface-10">
      {/* 헤더 */}
      <div className="flex items-center px-16 py-8 h-[60px] w-full relative shrink-0">
        <button onClick={() => navigate(-1)} className="icon-m text-text-30 absolute left-16">
          keyboard_arrow_left
        </button>
        <span className="body-m font-bold w-full text-text-20 text-center">식물상세</span>
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex flex-col gap-12 overflow-y-auto no-scrollbar flex-1 px-20 py-4">
          {/* 식물 이미지 */}
          <div
            className="relative w-full aspect-square bg-surface-20 rounded-14 flex items-center justify-center overflow-hidden bg-center bg-no-repeat bg-cover"
            style={{
              backgroundImage: `url(${plant.imageUrl && plant.imageUrl.trim() !== '' ? plant.imageUrl : NonePlantImage})`,
            }}
          >
            {/* 즐겨찾기 버튼 */}
            <button
              onClick={handleFavorite}
              className="absolute top-16 right-16"
            >
              <span
                className={plant.isFavorite ? 'text-primary' : 'text-text-30'}
                style={{
                  userSelect: 'none',
                  fontFamily: 'Material Symbols Rounded',
                  fontSize: '28px',
                  lineHeight: '100%',
                  fontVariationSettings: plant.isFavorite
                    ? "'wght' 300, 'FILL' 1, 'GRAD' 0, 'opsz' 28"
                    : "'wght' 300, 'FILL' 0, 'GRAD' 0, 'opsz' 28",
                }}
              >
                favorite
              </span>
            </button>
          </div>

          {/* 텍스트 정보 섹션 */}
          <div className="flex flex-col gap-12">
            {/* 이름 + 난이도 */}
            <div className="flex justify-between items-start">
              <div>
                <span className="title-m text-text-10">{plant.plantKoreanName}</span>
                <span className="body-s text-text-20">({plant.plantEnglishName})</span>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span className="icon-xs text-primary">verified_user</span>
                <span className="label-s text-text-20">
                  {toDifficultyLabel(plant.manageDifficulty)}
                </span>
              </div>
            </div>

            {/* 설명 */}
            <p className="body-s text-text-20">{plant.description}</p>

            {/* 정보 그리드 */}
            <div className="flex flex-col gap-12">
              <div className="flex gap-20">
                <InfoItem icon="humidity_percentage" label={plant.appropriateHumidity} />
                <InfoItem icon="thermometer" label={plant.appropriateTemperature} />
              </div>
              <div className="flex gap-20">
                <InfoItem icon="clear_day" label={plant.sunlightRequirements} />
                <InfoItem icon="pet_supplies" label={plant.petSafety} />
              </div>
              <div className="flex gap-20">
                <InfoItem icon="potted_plant" label={plant.size} />
                <InfoItem icon="opacity" label={plant.waterPeriod} />
              </div>
            </div>
          </div>
        </div>

        {/* 하단 고정 버튼 */}
        <div className="px-20 py-20 shrink-0 flex gap-8">
          <Button icon="shopping_cart">구매하기</Button>
          <button className="p-16 rounded-14 bg-primary" onClick={handleKakaoShare}>
            <img src={Kakao} alt="카카오톡 공유"/>
          </button>
        </div>
      </div>
    </main>
  );
};

interface InfoItemProps {
  icon: string;
  label: string;
}

const InfoItem = ({ icon, label }: InfoItemProps) => (
  <div className="flex items-center gap-6">
    <span className="icon-xs text-text-20">{icon}</span>
    <span className="label-m text-text-20">{label}</span>
  </div>
);

export default PlantDetail;
