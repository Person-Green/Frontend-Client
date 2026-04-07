import { useState } from 'react';
import Plant1 from '../assets/plants/plant1.png';
import Plant2 from '../assets/plants/plant2.png';
import Plant3 from '../assets/plants/plant3.png';
import Button from '../shared/button';

type OnboardingPageProps = {
  onComplete: () => void;
};

const OnboardingPage = ({ onComplete }: OnboardingPageProps) => {
  const itemList = [
    {
      id: 1,
      img: Plant1,
      title: (
        <>
          오늘, 내 공간에 <span className="text-text-highlight">초록</span>을
          들여볼까요?
        </>
      ),
      description:
        '몇가지 질문에 답해주시면,\n사용자님 공간에 알 맞는 식물을 추천해드립니다!',
      buttonDescription: '다음',
      subTag: '건너뛰기',
    },
    {
      id: 2,
      img: Plant2,
      title: (
        <>
          <span className="text-text-highlight">간단</span>하고,{' '}
          <span className="text-text-highlight">쉬운</span> 질문으로 준비했어요.
        </>
      ),
      description:
        '어려운 식물 지식이 없어도,\n키워드에 맞는 환경을 알아서 분석해드려요.',
      buttonDescription: '다음',
      subTag: '건너뛰기',
    },
    {
      id: 3,
      img: Plant3,
      title: (
        <>
          친구들과 식물을 <span className="text-text-highlight">공유</span>
          해보세요!
        </>
      ),
      description:
        '좋아하는 식물들을 저장하고,\nSNS를 통해서 친구들에게 공유해보세요!',
      buttonSpan: 'psychiatry',
      buttonDescription: '초록이 만나러가기',
      subTag: '처음으로 돌아가기',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = itemList[currentIndex];
  const isLastPage = currentIndex === itemList.length - 1;

  const handleNext = () => {
    if (isLastPage) {
      onComplete();
      return;
    }

    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handleSubAction = () => {
    if (isLastPage) {
      setCurrentIndex(0);
      return;
    }
    onComplete();
    return;
  };

  return (
    <main className={'min-h-screen p-20 flex items-center justify-center'}>
      <div className={'h-fit flex flex-col gap-24'} key={currentItem.id}>
        <div className={'flex flex-col items-center gap-20'}>
          <img src={currentItem.img} alt="식물사진" />
          <div className="flex flex-col items-center gap-12">
            <div className={'title-m text-text-10'}>{currentItem.title}</div>
            <div className="whitespace-pre-line body-s text-text-20 text-center">
              {currentItem.description}
            </div>
          </div>
          <div className={'label-m text-text-20'}>
            {currentItem.id}
            <span className={'text-text-30'}>/{itemList.length}</span>
          </div>
        </div>
        <div className={'py-24 flex flex-col justify-center gap-6'}>
          {/*  버튼 컴포넌트*/}
          <Button icon={currentItem.buttonSpan} onClick={handleNext}>
            {currentItem.buttonDescription}
          </Button>
          <button
            className={'label-s text-text-30 underline'}
            onClick={handleSubAction}
          >
            {currentItem.subTag}
          </button>
        </div>
      </div>
    </main>
  );
};
export default OnboardingPage;
