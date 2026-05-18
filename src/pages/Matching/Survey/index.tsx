import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DetailHeader from '../../../widgets/detailHeader.tsx';
import MatchingTitle from '../../../shared/matchingTitle.tsx';
import Button from '../../../shared/ui/button.tsx';
import Modal from '../../../shared/ui/modal.tsx';
import { useModalStore } from '../../../shared/stores/modalStore.ts';
import { QUESTIONS } from './model/questions.ts';
import type { SurveyAnswers } from './types.ts';

const MatchingSurvey = () => {
  const navigate = useNavigate();
  const initial = useMemo(() => {
    const saved = localStorage.getItem('matchingSurveyAnswers');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as SurveyAnswers;
        const firstIncomplete = QUESTIONS.findIndex((q) => !q.isReady(parsed));
        return {
          answers: parsed,
          step: firstIncomplete === -1 ? QUESTIONS.length - 1 : firstIncomplete,
        };
      } catch {
        // fall through to default
      }
    }
    return { answers: { experience: 'first' } as SurveyAnswers, step: 0 };
  }, []);
  const [step, setStep] = useState(initial.step);
  const [answers, setAnswers] = useState<SurveyAnswers>(initial.answers);
  const answersRef = useRef(answers);
  answersRef.current = answers;
  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const showExitModal = () => {
    openModal({
      useImage: false,
      title: '정말 나가시겠어요?',
      body: '지금 나가셔도 언제든지 다시 할 수 있어요!',
      label: '데이터는 동일한 디바이스에서만 저장됩니다.',
      buttonAmount: 2,
      buttons: [
        { label: '계속하기', onClick: () => closeModal() },
        {
          label: '나가기',
          icon: 'meeting_room',
          onClick: () => {
            localStorage.setItem('matchingSurveyAnswers', JSON.stringify(answersRef.current));
            closeModal();
            navigate('/matching');
          },
        },
      ],
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isRefresh =
        e.key === 'F5' ||
        ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'r');
      if (isRefresh) {
        e.preventDefault();
        showExitModal();
      }
    };
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const total = QUESTIONS.length;
  const isFirst = step === 0;
  const isLast = step === total - 1;
  const current = QUESTIONS[step];
  const CurrentQuestion = current.component;
  const progressPercent = ((step + 1) / total) * 100;

  const handleNext = () => {
    if (isLast) {
      localStorage.removeItem('matchingSurveyAnswers');
      navigate('/matching/result', { state: { answers } });
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (isFirst) {
      navigate('/matching');
      return;
    }
    setStep((prev) => prev - 1);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <DetailHeader onBack={showExitModal}>{current.headerTitle}</DetailHeader>
      <main className="flex flex-1 flex-col p-20 gap-24">
        <div className="flex flex-col gap-4 py-12">
          <div className="w-full h-8 bg-gray-200 rounded-full overflow-hidden bg-surface-20">
            <div
              className="h-full bg-primary rounded-full transition-[width] duration-200 ease-in-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between px-6 label-s text-text-30">
            <span>진행도</span>
            <p>
              <span className="text-text-20">{step + 1}</span>/{total}
            </p>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-24 py-24">
          <MatchingTitle icon={current.titleIcon} textSize="title-l">
            {current.titleLines.map((line, i) => (
              <Fragment key={i}>
                {i > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </MatchingTitle>
          <CurrentQuestion answers={answers} setAnswers={setAnswers} />
        </div>
        <div className="flex gap-8 h-fit py-16">
          {!isFirst && (
            <div className="flex-1">
            <Button onClick={handlePrev} undo={true}>
              <span className="icon-s">chevron_backward</span>
              <span className="mr-12">이전으로</span>
            </Button>
          </div>
          )}
          <div className="flex-1">
            <Button onClick={handleNext} disabled={!current.isReady(answers)}>
              다음으로
            </Button>
          </div>
        </div>
      </main>
      <Modal />
    </main>
  );
};

export default MatchingSurvey;
