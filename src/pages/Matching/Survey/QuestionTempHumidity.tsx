import type { QuestionProps } from './types.ts';

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
    className={`flex flex-col items-center justify-center gap-12 px-16 py-24 rounded-14 border ${
      selected
        ? 'border-primary bg-[#5F9B45]/10 text-primary'
        : 'border-stroke-10-trans bg-white text-text-20'
    }`}
  >
    <span className="body-s">{label}</span>
    <span className={`label-s ${selected ? 'text-primary' : 'text-text-30'}`}>
      {sub}
    </span>
  </button>
);

const QuestionTempHumidity = ({ answers, setAnswers }: QuestionProps) => {
  return (
    <div className="flex flex-col gap-16 py-16">
      <div className="flex flex-col gap-6">
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

      <div className="flex flex-col gap-6">
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
  );
};

export default QuestionTempHumidity;
