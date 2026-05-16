import DetailHeader from '../../../widgets/detailHeader.tsx';
import ProgressBar from './components/ProgressBar.tsx';
import MatchingTitle from '../../../shared/matchingTitle.tsx';
import NavButtons from './components/NavButtons.tsx';
import OptionCard from './components/OptionCard.tsx';
import type { QuestionProps } from './types.ts';

const CARE_OPTIONS = [
  { value: 'easy', label: '관리가 쉬운 식물이 좋아요.', icon: '🌱' },
  { value: 'mid', label: '적당한 관리는 가능해요.', icon: '✋' },
  { value: 'high', label: '손이 좀 가도 괜찮아요.', icon: '🤲' },
];

const QuestionCare = ({
  step,
  total,
  answers,
  setAnswers,
  onNext,
  onPrev,
}: QuestionProps) => {
  const selected = answers.care;

  return (
    <main className="min-h-screen flex flex-col p-20">
      <DetailHeader>관리</DetailHeader>
      <ProgressBar current={step} total={total} />
      <MatchingTitle icon='volunteer_activism' textSize='title-l' >
        식물을 어떻게
        <br />
        돌봐줄 수 있나요?
      </MatchingTitle>

      <div className="flex flex-col gap-12 flex-1">
        {CARE_OPTIONS.map((opt) => (
          <OptionCard
            key={opt.value}
            icon={opt.icon}
            label={opt.label}
            selected={selected === opt.value}
            onClick={() => setAnswers({ ...answers, care: opt.value })}
          />
        ))}
      </div>

      <NavButtons
        showPrev
        onPrev={onPrev}
        onNext={onNext}
        nextDisabled={!selected}
      />
    </main>
  );
};

export default QuestionCare;
