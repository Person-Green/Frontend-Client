import PlantItem from '../../shared/plantItem.tsx';
import Button from '../../shared/button.tsx';
import EatenCharacter from '../../assets/character/eaten.svg';
import Title from '../../shared/title.tsx';

const Home = () => {
  const plantList = [
    {
      name: '스쿠티',
      description: '중형,관리쉬움',
    },
    {
      name: '몬스테라',
      description: '대형,관리보통',
    },
    {
      name: '스킨답서스',
      description: '소형~중형, 초보추천',
    },
  ];
  return (
    <main className="flex flex-col gap-24 p-20">
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
            <span className="label-s">약 1소요</span>
            <span className="label-s">5가지 질문</span>
          </div>
        </figure>
        <div className="flex gap-8">
          <button className="w-full px-16 py-12 rounded-max bg-primary text-text-on-primary">
            매칭받기
          </button>
          <button className="w-full px-16 py-12 rounded-max bg-surface-30 text-text-20">
            식물 알아보기
          </button>
        </div>
      </article>
      {/*인기식물*/}
      <article className="flex flex-col gap-12 pb-20">
        <div className="flex justify-between items-center">
          <Title icon="nest_eco_leaf" title="인기식물" textSize="title-m" />
          <span className="py-6 px-12 rounded-max label-s bg-surface-20 text-text-20">
            전체보기
          </span>
        </div>
        <ul className="flex gap-16 overflow-x-scroll no-scrollbar">
          {plantList.map((item, i) => (
            <PlantItem i={i} name={item.name} description={item.description} />
          ))}
        </ul>
      </article>
      {/*식물 팁*/}
      <section className="flex flex-col gap-12">
        <Title icon="potted_plant" title="식물 팁" textSize="title-s" />
        <div className="flex flex-col p-16 bg-surface-20 rounded-8">
          <span className="label-m text-text-20">
            겨울철에는 물주기 간격을 늘려주세요!
          </span>
          <span className="label-m text-text-20">
            대부분의 식물이 겨울에는 성장이 느려집니다.
          </span>
        </div>
      </section>
    </main>
  );
};
export default Home;
