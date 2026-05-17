import OptionCard from './components/OptionCard.tsx';
import type { QuestionProps } from './types.ts';

const AIR_OPTIONS = [
  { value: 'low', label: '환기가 거의 되지 않아요.', icon: 'mode_fan_off' },
  { value: 'mid', label: '보통 수준이에요.', icon: 'toys_fan' },
  { value: 'high', label: '바람이 잘 통하고 자주 환기돼요.', icon: 'airwave' },
];

const QuestionAir = ({ answers, setAnswers }: QuestionProps) => {
  const selected = answers.air;

  return (
    <div className="flex flex-col gap-12 py-16">
      {AIR_OPTIONS.map((opt) => (
        <OptionCard
          key={opt.value}
          icon={opt.icon}
          label={opt.label}
          selected={selected === opt.value}
          onClick={() => setAnswers({ ...answers, air: opt.value })}
        />
      ))}
    </div>
  );
};

export default QuestionAir;
