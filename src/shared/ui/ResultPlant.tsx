import { useNavigate } from 'react-router-dom';
import type { PlantRecommendationResponse } from '../../entities';
import NonePlant from '../../assets/plants/none.svg';

interface ResultPlantProps {
  plant: PlantRecommendationResponse;
  rank?: number;
}

const ResultPlant = ({ plant }: ResultPlantProps) => {
  const navigate = useNavigate();

  return (
    <li
      className="flex flex-col gap-12 cursor-pointer"
      onClick={() => navigate(`/plants/${plant.plantId}`)}
    >
      {/* 이미지 영역 */}
      <div className="relative w-full aspect-square rounded-14 bg-[#EEF2E6] overflow-hidden flex items-center justify-center">
        {plant.imageUrl ? (
          <img
            src={plant.imageUrl}
            alt={plant.plantName}
            className="w-full h-full object-cover"
          />
        ) : (
          <img src={NonePlant} alt="" className="w-full h-full object-contain" />
        )}
      </div>

      {/* 텍스트 영역 */}
      <div className="flex flex-col gap-4">
        {/* 이름 */}
        <p className="body-m">
          <span className="font-bold text-text-10">{plant.plantName}</span>
          <span className="font-normal text-text-20">({plant.plantEnglishName})</span>
        </p>

        {/* 설명 */}
        <p className="label-s text-text-30 line-clamp-2">{plant.description}</p>

        {/* 좋아요 */}
        <div className="flex items-center gap-4 mt-2">
          <span
            className={`icon-xs-fill ${plant.isFavorite ? 'text-primary' : 'text-text-30'}`}
          >
            favorite
          </span>
          <span className="label-s text-text-30">{plant.favoriteCount}</span>
        </div>
      </div>
    </li>
  );
};

export default ResultPlant;
