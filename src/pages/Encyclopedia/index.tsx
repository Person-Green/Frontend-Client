import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPlants } from '../../entities';
import type { PlantCatalogItemResponse } from '../../entities';
import { useFilterStore } from '../../shared/stores/filterStore';
import { useHeader } from '../../shared/stores/headerStore';
import {
  toAirPurificationLabel,
  toDifficultyShort,
} from '../../shared/lib/plantLabels';
import EncyclopediaCard from './EncyclopediaCard';
import TabBar, { type EncyclopediaTab } from './TabBar';
import FilterModal from './FilterModal';

const Encyclopedia = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<EncyclopediaTab>('all');
  const [plantList, setPlantList] = useState<PlantCatalogItemResponse[]>([]);
  const applied = useFilterStore((s) => s.applied);
  const openFilterModal = useFilterStore((s) => s.openModal);

  useHeader('temp_preferences_eco', '식물도감');

  useEffect(() => {
    getPlants({ size: 50 })
      .then((res) => setPlantList(res.plants))
      .catch((e) => console.error('식물도감 로딩 실패', e));
  }, []);

  const visiblePlants = useMemo(() => {
    let plants = plantList;
    if (activeTab === 'popular') {
      plants = [...plants].sort((a, b) => b.favoriteCount - a.favoriteCount);
    } else if (activeTab === 'favorites') {
      plants = plants.filter((p) => p.isFavorite);
    }
    if (applied.manageDifficulty) {
      plants = plants.filter(
        (p) => toDifficultyShort(p.manageDifficulty) === applied.manageDifficulty,
      );
    }
    if (applied.airPurification) {
      plants = plants.filter(
        (p) => toAirPurificationLabel(p.airPurification) === applied.airPurification,
      );
    }
    if (applied.plantSize) {
      plants = plants.filter((p) => p.size === applied.plantSize);
    }
    return plants;
  }, [activeTab, applied, plantList]);

  return (
    <main className="flex flex-col gap-24 p-20">
      <TabBar active={activeTab} onChange={setActiveTab} />

      <section className="flex flex-col gap-8">
        <div className="flex items-center justify-between px-6">
          <span className="label-s text-text-20">총 {visiblePlants.length}개</span>
          <button
            type="button"
            onClick={openFilterModal}
            className="flex items-center text-text-30"
          >
            <span className="icon-xs">filter_alt</span>
            <span className="label-s">필터</span>
          </button>
        </div>

        <ul className="grid grid-cols-2 gap-x-8 gap-y-16">
          {visiblePlants.map((plant) => (
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

      <FilterModal />
    </main>
  );
};

export default Encyclopedia;
