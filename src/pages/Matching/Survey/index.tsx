import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DetailHeader from '../../../widgets/detailHeader.tsx';
import MatchingTitle from '../../../shared/matchingTitle.tsx';
import ProgressBar from './components/ProgressBar.tsx';
import NavButtons from './components/NavButtons.tsx';
import { QUESTIONS } from './model/questions.ts';
import type { SurveyAnswers } from './types.ts';

const MatchingSurvey = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<SurveyAnswers>({});

  const total = QUESTIONS.length;
  const isFirst = step === 0;
  const isLast = step === total - 1;
  const current = QUESTIONS[step];
  const CurrentQuestion = current.component;

  const handleNext = () => {
    if (isLast) {
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
      <DetailHeader>{current.headerTitle}</DetailHeader>
      <main className="flex flex-1 flex-col p-20 gap-24">
        <ProgressBar current={step + 1} total={total} />
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
        <NavButtons
          showPrev={!isFirst}
          onPrev={handlePrev}
          onNext={handleNext}
          nextDisabled={!current.isReady(answers)}
          nextLabel={isLast ? '결과 보기' : undefined}
        />
      </main>
    </main>
  );
};

export default MatchingSurvey;
