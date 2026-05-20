import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFavoritePlants } from '../../entities';
import type {
  FavoritePlantsResponse,
  PlantCatalogItemResponse,
} from '../../entities';
import { useHeader } from '../../shared/stores/headerStore';
import EncyclopediaCard from '../Encyclopedia/EncyclopediaCard';

const toCatalogItem = (
  plant: FavoritePlantsResponse,
): PlantCatalogItemResponse => ({
  plantId: plant.plantId,
  plantKoreanName: plant.plantKoreanName,
  plantEnglishName: plant.plantEnglishName,
  imageUrl: plant.imageUrl,
  size: plant.size,
  airPurification: plant.airPurification,
  manageDifficulty: plant.manageDifficulty,
  isFavorite: plant.isFavorite,
  favoriteCount: plant.favoriteCount,
});

const MyPlants = () => {
  const navigate = useNavigate();
  const [plantList, setPlantList] = useState<PlantCatalogItemResponse[]>([]);

  useHeader('favorite', '내식물');

  useEffect(() => {
    getFavoritePlants()
      .then((res) => setPlantList(res.favoritePlants.map(toCatalogItem)))
      .catch((e) => console.error('내 식물 로딩 실패', e));
  }, []);

  return (
    <main className="flex flex-col gap-24 p-20">
      <section className="flex flex-col gap-8">
        <div className="flex items-center justify-between px-6">
          <span className="label-s text-text-20">총 {plantList.length}개</span>
        </div>

        <ul className="grid grid-cols-2 gap-x-8 gap-y-16">
          {plantList.map((plant) => (
            <EncyclopediaCard
              key={plant.plantId}
              plant={plant}
              onClick={() =>
                navigate(`/plants/${plant.plantId}`, { state: { plant } })
              }
            />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default MyPlants;
