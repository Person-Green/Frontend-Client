import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionPlace from './QuestionPlace.tsx';
import QuestionLight from './QuestionLight.tsx';
import QuestionAir from './QuestionAir.tsx';
import QuestionTempHumidity from './QuestionTempHumidity.tsx';
import QuestionCare from './QuestionCare.tsx';
import QuestionPet from './QuestionPet.tsx';
import DetailHeader from '../../../widgets/detailHeader.tsx';
import type { SurveyAnswers } from './types.ts';

const QUESTIONS = [
  QuestionPlace,
  QuestionLight,
  QuestionAir,
  QuestionTempHumidity,
  QuestionCare,
  QuestionPet,
];

const HEADER_TITLES = ['장소선택', '채광', '환기 & 공기', '온도 & 습도', '관리', '반려동물 & 경험'];

const MatchingSurvey = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<SurveyAnswers>({});

  const total = QUESTIONS.length;
  const isFirst = step === 0;
  const isLast = step === total - 1;

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

  const CurrentQuestion = QUESTIONS[step];

  return (
    <main className="min-h-screen flex flex-col">
      <DetailHeader>{HEADER_TITLES[step]}</DetailHeader>
      <CurrentQuestion
        step={step + 1}
        total={total}
        answers={answers}
        setAnswers={setAnswers}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </main>
  );
};

export default MatchingSurvey;
