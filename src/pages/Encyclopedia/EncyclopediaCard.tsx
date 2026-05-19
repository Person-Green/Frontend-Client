import type { PlantCatalogItemResponse } from '../../entities';
import Img from '../../assets/banner/banner1.svg';

interface EncyclopediaCardProps {
  plant: PlantCatalogItemResponse;
  onClick?: () => void;
}

const formatFavoriteCount = (count: number): string => {
  if (count >= 10000) {
    const value = count / 10000;
    return `${value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)}만`;
  }
  if (count >= 1000) {
    return `${Math.floor(count / 1000)}천`;
  }
  return String(count);
};

const EncyclopediaCard = ({ plant, onClick }: EncyclopediaCardProps) => {
  return (
    <li
      onClick={onClick}
      className="flex flex-col gap-12 cursor-pointer min-w-0"
    >
      <div className="relative w-full aspect-square rounded-8 bg-[#EEF2E6] overflow-hidden flex items-end justify-center">
        <div className="w-[80%] h-[80%] flex items-center justify-center">
          <img src={Img} alt={plant.plantKoreanName} />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <p className="body-m">
          <span className="font-bold text-text-10">{plant.plantKoreanName}</span>
          <span className="label-s font-normal text-text-20">
            ({plant.plantEnglishName})
          </span>
        </p>

        <p className="label-s text-text-30 line-clamp-2">
          {`관리 ${plant.manageDifficulty}, ${plant.size}, 공기정화 ${plant.airPurification}`}
        </p>

        <div className="flex items-center">
          <span
            className={`icon-xs-fill ${plant.isFavorite ? 'text-primary' : 'text-text-30'}`}
          >
            favorite
          </span>
          <span className="label-s text-text-30">
            {formatFavoriteCount(plant.favoriteCount)}
          </span>
        </div>
      </div>
    </li>
  );
};

export default EncyclopediaCard;
