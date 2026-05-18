import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { PlantCatalogItemResponse } from '../../shared/api';
import EncyclopediaCard from './EncyclopediaCard';
import TabBar, { type EncyclopediaTab } from './TabBar';

const MOCK_PLANTS: PlantCatalogItemResponse[] = [
  {
    plantId: '1',
    plantKoreanName: '스투키',
    plantEnglishName: 'Stucky',
    size: '중형',
    airPurification: '높음',
    manageDifficulty: '쉬움',
    isFavorite: false,
    favoriteCount: 107,
  },
  {
    plantId: '2',
    plantKoreanName: '스투키',
    plantEnglishName: 'Stucky',
    size: '중형',
    airPurification: '높음',
    manageDifficulty: '쉬움',
    isFavorite: true,
    favoriteCount: 94000,
  },
  {
    plantId: '3',
    plantKoreanName: '스투키',
    plantEnglishName: 'Stucky',
    size: '중형',
    airPurification: '높음',
    manageDifficulty: '쉬움',
    isFavorite: false,
    favoriteCount: 9000,
  },
  {
    plantId: '4',
    plantKoreanName: '스투키',
    plantEnglishName: 'Stucky',
    size: '중형',
    airPurification: '높음',
    manageDifficulty: '쉬움',
    isFavorite: false,
    favoriteCount: 62,
  },
  {
    plantId: '5',
    plantKoreanName: '스투키',
    plantEnglishName: 'Stucky',
    size: '중형',
    airPurification: '높음',
    manageDifficulty: '쉬움',
    isFavorite: true,
    favoriteCount: 320,
  },
];

const Encyclopedia = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<EncyclopediaTab>('all');

  const visiblePlants = useMemo(() => {
    if (activeTab === 'popular') {
      return [...MOCK_PLANTS].sort((a, b) => b.favoriteCount - a.favoriteCount);
    }
    if (activeTab === 'favorites') {
      return MOCK_PLANTS.filter((p) => p.isFavorite);
    }
    return MOCK_PLANTS;
  }, [activeTab]);

  return (
    <main className="flex flex-col gap-24 p-20 pb-100">
      <TabBar active={activeTab} onChange={setActiveTab} />

      <section className="flex flex-col gap-8">
        <div className="flex items-center justify-between px-6">
          <span className="label-s text-text-20">총 {visiblePlants.length}개</span>
          <div className="flex items-center text-text-30">
            <span className="icon-xs">filter_alt</span>
            <span className="label-s">필터</span>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-x-8 gap-y-16">
          {visiblePlants.map((plant) => (
            <EncyclopediaCard
              key={plant.plantId}
              plant={plant}
              onClick={() => navigate(`/plants/${plant.plantId}`)}
            />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Encyclopedia;
