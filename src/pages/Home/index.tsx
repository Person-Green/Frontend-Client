import { useEffect, useState } from 'react';
import PlantItem from '../../shared/ui/plantItem.tsx';
import { useNavigate } from 'react-router-dom';
import EatenCharacter from '../../assets/character/eaten.svg';
import Title from '../../shared/ui/title.tsx';
import { getPlants } from '../../entities';
import type { PlantCatalogItemResponse } from '../../entities';
import { useHeader } from '../../shared/stores/headerStore.ts';
import Banner from '../../widgets/banner.tsx';
import { toDifficultyLabel } from '../../shared/lib/plantLabels.ts';

const Home = () => {
  const navigate = useNavigate();
  const [plantList, setPlantList] = useState<PlantCatalogItemResponse[]>([]);

  useHeader('park', '정원');

  useEffect(() => {
    getPlants({ sort: 'LIKE_DESC', size: 10 })
      .then((res) => setPlantList(res.plants))
      .catch((e) => console.error('인기식물 로딩 실패', e));
  }, []);
  return (
    <main className="flex flex-col gap-24 p-20">
      <Banner/>
      {/*맞춤 식물 큐레이션*/}
      <article className="flex flex-col gap-16 p-16 bg-surface-20 rounded-8">
        <figure className="flex flex-col gap-6 p-8">
          <div className="flex justify-between p-8">
            <div className="flex flex-col gap-6"> 
              <span className="body-s text-text-20">매칭하기</span>
              <span className="title-s text-text-10">맞춤 식물 큐레이션</span>
            </div>
            <img src={EatenCharacter} alt="캐릭터" className="w-[41.36px]" />
          </div>
          <div className="flex justify-between items-center px-8 text-text-20">
            <span className="label-s">약 1분 소요</span>
            <span className="label-s">5가지 질문</span>
          </div>
        </figure>
        <div className="flex gap-8">
          <button className=" body-s !font-[500] w-full px-16 py-12 rounded-max bg-primary text-text-on-primary" onClick={() => navigate('/matching')}>
            매칭받기
          </button>
          <button className="w-full px-16 py-12 rounded-max bg-surface-30 text-text-20" onClick={() => navigate('/encyclopedia')}>
            식물 알아보기
          </button>
        </div>
      </article>
      {/*인기식물*/}
      <article className="flex flex-col gap-12 pb-20 ">
        <div className="flex justify-between items-center">
          <Title icon="nest_eco_leaf" title="인기식물" />
          <span className="py-6 px-12 rounded-max label-s bg-surface-20 text-text-20" onClick={() => navigate('/encyclopedia')}>
            전체보기
          </span>
        </div>
        <ul className="flex gap-16 overflow-x-scroll no-scrollbar -mx-20 px-20">
          {plantList.map((item) => (
            <PlantItem
              key={item.plantId}
              name={item.plantKoreanName}
              description={`${item.size}, ${toDifficultyLabel(item.manageDifficulty)}`}
              imageUrl={item.imageUrl}
              onClick={() => navigate(`/plants/${item.plantId}`)}
            />
          ))}
        </ul>
      </article>
      {/*식물 팁*/}
      <section className="flex flex-col gap-12">
        <Title icon="potted_plant" title="식물 팁" />
        <div className="flex flex-col p-16 bg-surface-20 rounded-8">
          <span className="label-m !font-[500] text-text-20 whitespace-pre-line">
            {`겨울철에는 물주기 간격을 늘려주세요!\n대부분의 식물이 겨울에는 성장이 느려집니다.`}
          </span>
        </div>
      </section>
    </main>
  );
};
export default Home;
