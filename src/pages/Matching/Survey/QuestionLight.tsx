import SurveyHeader from './components/SurveyHeader.tsx';
import ProgressBar from './components/ProgressBar.tsx';
import MatchingTitle from '../../../shared/matchingTitle.tsx';
import NavButtons from './components/NavButtons.tsx';
import OptionCard from './components/OptionCard.tsx';
import type { QuestionProps } from './types.ts';

const LIGHT_OPTIONS = [
  { value: 'low', label: '거의 빛이 없거나 들지 않아요.', icon: '🌑' },
  { value: 'mid', label: '간접광이나 보통 수준이에요.', icon: '🌥' },
  { value: 'high', label: '채광이 좋은 장소에요.', icon: '☀️' },
];

const QuestionLight = ({
  step,
  total,
  answers,
  setAnswers,
  onNext,
  onPrev,
}: QuestionProps) => {
  const selected = answers.light;

  return (
    <main className="min-h-screen flex flex-col p-20">
      <SurveyHeader title="채광" onBack={onPrev} />
      <ProgressBar current={step} total={total} />
      <MatchingTitle icon='sunny' textSize='title-l' >
        햇빛이 얼마나 들어오는
        <br />
        공간인가요?
      </MatchingTitle>

      <div className="flex flex-col gap-12 flex-1">
        {LIGHT_OPTIONS.map((opt) => (
          <OptionCard
            key={opt.value}
            icon={opt.icon}
            label={opt.label}
            selected={selected === opt.value}
            onClick={() => setAnswers({ ...answers, light: opt.value })}
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

export default QuestionLight;
