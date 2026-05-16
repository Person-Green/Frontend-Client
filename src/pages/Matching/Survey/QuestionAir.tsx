import DetailHeader from '../../../widgets/detailHeader.tsx';
import ProgressBar from './components/ProgressBar.tsx';
import MatchingTitle from '../../../shared/matchingTitle.tsx';
import NavButtons from './components/NavButtons.tsx';
import OptionCard from './components/OptionCard.tsx';
import type { QuestionProps } from './types.ts';

const AIR_OPTIONS = [
  { value: 'low', label: '환기가 거의 되지 않아요.', icon: '🚫' },
  { value: 'mid', label: '보통 수준이에요.', icon: '🌬' },
  { value: 'high', label: '바람이 잘 통하고 자주 환기돼요.', icon: '💨' },
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
    <main className="min-h-screen flex flex-col p-20">
      <DetailHeader>환기 & 공기</DetailHeader>
      <ProgressBar current={step} total={total} />
      <MatchingTitle icon='air' textSize='title-l' >
        장소의 공기 순환이나
        <br />
        환기 수준은 어떤 편인가요?
      </MatchingTitle>

      <div className="flex flex-col gap-12 flex-1">
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
