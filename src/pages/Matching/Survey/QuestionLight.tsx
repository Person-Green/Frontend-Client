import OptionCard from './components/OptionCard.tsx';
import type { QuestionProps } from './types.ts';

const LIGHT_OPTIONS = [
  { value: 'low', label: '거의 빛이 없거나 들지 않아요.', icon: 'backlight_high_off' },
  { value: 'mid', label: '간접광이나 보통 수준이에요.', icon: 'backlight_low' },
  { value: 'high', label: '채광이 좋은 장소에요.', icon: 'backlight_low' },
];

const QuestionLight = ({ answers, setAnswers }: QuestionProps) => {
  const selected = answers.light;

  return (
    <div className="flex flex-col gap-8 py-16">
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
  );
};

export default QuestionLight;
