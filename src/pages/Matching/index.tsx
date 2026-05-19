import { useNavigate } from 'react-router-dom';
import Button from '../../shared/ui/button.tsx';
import Modal from '../../shared/ui/modal.tsx';
import { useModalStore } from '../../shared/stores/modalStore.ts';
import Blink from '../../assets/character/blink.svg';
import { useHeader } from '../../shared/stores/headerStore.ts';

const Matching = () => {
  const navigate = useNavigate();
  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  useHeader('explore', '매칭', {
    variant: 'highlight',
    rightSlot: (
      <button
        type="button"
        onClick={() => navigate('/matching/history')}
        className="flex items-center justify-center p-8 rounded-max"
        aria-label="매칭 기록"
      >
        <span className="icon-l text-text-30">search_activity</span>
      </button>
    ),
  });

  const handleStart = () => {
    const saved = localStorage.getItem('matchingSurveyAnswers');
    if (!saved) {
      navigate('/matching/survey');
      return;
    }
    openModal({
      useImage: true,
      title: '이전 기록이 남아있어요!',
      body: '이어서 검사 할 수 있지만, 다시 시작하면 이전 데이터가 사라져요!',
      buttonAmount: 2,
      buttons: [
        {
          label: '다시 시작하기',
          onClick: () => {
            localStorage.removeItem('matchingSurveyAnswers');
            closeModal();
            navigate('/matching/survey');
          },
        },
        {
          label: '이어하기',
          onClick: () => {
            closeModal();
            navigate('/matching/survey');
          },
        },
      ],
    });
  };

  return (
    <main className="h-full flex flex-col p-20">
      <article className="h-full flex flex-col justify-center items-center gap-24">
        <object type="image/svg+xml" data={Blink} width={161} height={200} />
        <div className="flex flex-col gap-8 py-12">
          <span className="title-l">이제 같이 식물을 찾아볼까요?</span>
          <span className="body-s text-center">
            간단한 8개의 간단한 질문으로,
            <br /> 공간에 딱 맞는 식물을 찾아드릴게요!
          </span>
        </div>
      </article>
      <div className="h-fit">
        <Button onClick={handleStart}>매칭하기</Button>
      </div>
      <Modal />
    </main>
  );
};
export default Matching;
