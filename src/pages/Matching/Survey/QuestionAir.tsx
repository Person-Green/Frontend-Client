import ProgressBar from './components/ProgressBar.tsx';
import MatchingTitle from '../../../shared/matchingTitle.tsx';
import NavButtons from './components/NavButtons.tsx';
import OptionCard from './components/OptionCard.tsx';
import type { QuestionProps } from './types.ts';

const AIR_OPTIONS = [
  { value: 'low', label: '환기가 거의 되지 않아요.', icon: 'mode_fan_off' },
  { value: 'mid', label: '보통 수준이에요.', icon: 'toys_fan' },
  { value: 'high', label: '바람이 잘 통하고 자주 환기돼요.', icon: 'airwave' },
];

const QuestionAir = ({
  step,
  total,
  answers,
  setAnswers,
  onNext,
  onPrev,
}: QuestionProps) => {
  const selected = answers.air;

  return (
    <main className="flex flex-1 flex-col p-20 gap-24">
      <ProgressBar current={step} total={total} />
      <div className="flex flex-col flex-1 gap-24 py-24">
        <MatchingTitle icon='air' textSize='title-l' >
          장소의 공기 순환이나
          <br />
          환기 수준은 어떤 편인가요?
        </MatchingTitle>

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

export default QuestionAir;
