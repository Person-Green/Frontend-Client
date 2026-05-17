import ProgressBar from './components/ProgressBar.tsx';
import MatchingTitle from '../../../shared/matchingTitle.tsx';
import NavButtons from './components/NavButtons.tsx';
import type { QuestionProps } from './types.ts';

const PLACE_OPTIONS = [
  { value: 'bedroom', label: '침실', icon: 'bed' },
  { value: 'living', label: '거실', icon: 'chair' },
  { value: 'kitchen', label: '주방', icon: 'skillet' },
  { value: 'office', label: '사무실', icon: 'apartment' },
  { value: 'desk', label: '책상', icon: 'desk' },
  { value: 'bathroom', label: '욕실', icon: 'shower' },
  { value: 'veranda', label: '베란다/발코니', icon: 'balcony' },
  { value: 'window', label: '창가', icon: 'window' },
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
    <main className="flex flex-1 flex-col gap-24 p-20">
      <ProgressBar current={step} total={total} />
      <div className="flex flex-col flex-1 gap-24 py-24">
        <MatchingTitle icon='place_item' textSize='title-l' >
          주로 어느 장소에 식물을
          <br />
          배치하실 예정인가요?
        </MatchingTitle>

        <div className="flex flex-wrap gap-8 py-16 items-start">
          {PLACE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setAnswers({ ...answers, place: opt.value })}
              className={`shrink-0 flex items-center gap-6 px-16 py-6 rounded-full body-m ${
                selected === opt.value
                  ? 'bg-primary text-text-on-primary'
                  : 'bg-surface-20 text-text-20'
              }`}
            >
              <span className='icon-s'>{opt.icon}</span>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
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
