import OptionCard from './components/OptionCard.tsx';
import type { QuestionProps } from './types.ts';

const CARE_OPTIONS = [
  { value: 'easy', label: '관리가 쉬운 식물이 좋아요.', icon: 'psychiatry' },
  { value: 'mid', label: '적당한 관리는 가능해요.', icon: 'back_hand' },
  { value: 'high', label: '손이 좀 가도 괜찮아요.', icon: 'sign_language' },
];

const QuestionCare = ({ answers, setAnswers }: QuestionProps) => {
  const selected = answers.care;

  return (
    <div className="flex flex-col gap-12">
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
  );
};

export default QuestionCare;
