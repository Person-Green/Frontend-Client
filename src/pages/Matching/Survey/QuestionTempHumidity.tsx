import ProgressBar from './components/ProgressBar.tsx';
import MatchingTitle from '../../../shared/matchingTitle.tsx';
import NavButtons from './components/NavButtons.tsx';
import type { QuestionProps } from './types.ts';
import DetailHeader from '../../../widgets/detailHeader.tsx';

const TEMP_OPTIONS = [
  { value: 'cool', label: '서늘함', sub: '18~20°C' },
  { value: 'normal', label: '보통', sub: '21~24°C' },
  { value: 'hot', label: '높음', sub: '25°C 이상' },
];

const HUMIDITY_OPTIONS = [
  { value: 'dry', label: '건조함', sub: '30% 이하' },
  { value: 'mid', label: '적당함', sub: '40~60%' },
  { value: 'wet', label: '습함', sub: '65% 이상' },
];

type GridCardProps = {
  label: string;
  sub: string;
  selected: boolean;
  onClick: () => void;
};

const GridCard = ({ label, sub, selected, onClick }: GridCardProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-4 p-16 rounded-14 border ${
      selected
        ? 'border-primary bg-primary/10 text-primary'
        : 'border-gray-200 bg-white text-text-20'
    }`}
  >
    <span className="body-s">{label}</span>
    <span className="label-s text-text-30">{sub}</span>
  </button>
);

const QuestionTempHumidity = ({
  step,
  total,
  answers,
  setAnswers,
  onNext,
  onPrev,
}: QuestionProps) => {
  const ready = answers.temperature && answers.humidity;

  return (
    <main className="min-h-screen flex flex-col p-20">
      <DetailHeader>온도 & 습도</DetailHeader>  
      <ProgressBar current={step} total={total} />
      <MatchingTitle icon='dew_point' textSize='title-l' >
        장소의 온도와 습도는
        <br />
        어떤 편인가요?
      </MatchingTitle>

      <div className="flex flex-col gap-16 flex-1">
        <div className="flex flex-col gap-8">
          <span className="label-s text-text-30">온도</span>
          <div className="grid grid-cols-3 gap-8">
            {TEMP_OPTIONS.map((opt) => (
              <GridCard
                key={opt.value}
                label={opt.label}
                sub={opt.sub}
                selected={answers.temperature === opt.value}
                onClick={() =>
                  setAnswers({ ...answers, temperature: opt.value })
                }
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <span className="label-s text-text-30">습도</span>
          <div className="grid grid-cols-3 gap-8">
            {HUMIDITY_OPTIONS.map((opt) => (
              <GridCard
                key={opt.value}
                label={opt.label}
                sub={opt.sub}
                selected={answers.humidity === opt.value}
                onClick={() => setAnswers({ ...answers, humidity: opt.value })}
              />
            ))}
          </div>
        </div>
      </div>

      <NavButtons
        showPrev
        onPrev={onPrev}
        onNext={onNext}
        nextDisabled={!ready}
      />
    </main>
  );
};

export default QuestionTempHumidity;
