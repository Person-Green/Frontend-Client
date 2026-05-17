import type { PlantRecommendationResponse } from '../../../../shared/api/types';
import Img from "../../../../assets/banner/banner1.svg"

interface ResultPlantProps {
  plant: PlantRecommendationResponse;
  rank?: number;
}

const ResultPlant = ({ plant }: ResultPlantProps) => {
  return (
    <li className="flex flex-col gap-12 cursor-pointer">
      {/* 이미지 영역 */}
      <div className="relative w-full aspect-square rounded-14 bg-[#EEF2E6] overflow-hidden flex items-end justify-center">
        <div className="w-[80%] h-[80%] flex items-center justify-center">
            <img src={Img} />
        </div>
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
          <span className="icon-xs-fill text-primary">favorite</span>
          <span className="label-s text-text-30">{plant.score}</span>
        </div>
      </div>
    </li>
  );
};

export default ResultPlant;
