import SurveyHeader from './components/SurveyHeader.tsx';
import ProgressBar from './components/ProgressBar.tsx';
import MatchingTitle from '../../../shared/matchingTitle.tsx';
import NavButtons from './components/NavButtons.tsx';
import type { QuestionProps } from './types.ts';

const PLACE_OPTIONS = [
  { value: 'bedroom', label: '침실', icon: '🛏' },
  { value: 'living', label: '거실', icon: '🛋' },
  { value: 'kitchen', label: '주방', icon: '🍳' },
  { value: 'office', label: '사무실', icon: '🏢' },
  { value: 'desk', label: '책상', icon: '🗄' },
  { value: 'bathroom', label: '욕실', icon: '🚿' },
  { value: 'veranda', label: '베란다/발코니', icon: '🪟' },
  { value: 'window', label: '창가', icon: '🌤' },
];

const QuestionPlace = ({
  step,
  total,
  answers,
  setAnswers,
  onNext,
  onPrev,
}: QuestionProps) => {
  const selected = answers.place;

  return (
    <main className="min-h-screen flex flex-col p-20">
      <SurveyHeader title="장소 선택" onBack={onPrev} />
      <ProgressBar current={step} total={total} />

      <MatchingTitle icon='place_item' textSize='title-l' >
        주로 어느 장소에 식물을
        <br />
        배치하실 예정인가요?
      </MatchingTitle>

      <div className="flex flex-wrap gap-8 flex-1">
        {PLACE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setAnswers({ ...answers, place: opt.value })}
            className={`flex items-center gap-6 px-16 py-10 rounded-full label-s ${
              selected === opt.value
                ? 'bg-primary text-text-on-primary'
                : 'bg-gray-200 text-text-20'
            }`}
          >
            <span>{opt.icon}</span>
            <span>{opt.label}</span>
          </button>
        ))}
      </div>

      <NavButtons
        showPrev={false}
        onPrev={onPrev}
        onNext={onNext}
        nextDisabled={!selected}
      />
    </main>
  );
};

export default QuestionPlace;
