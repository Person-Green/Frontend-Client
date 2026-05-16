import DetailHeader from '../../../widgets/detailHeader.tsx';
import ProgressBar from './components/ProgressBar.tsx';
import MatchingTitle from '../../../shared/matchingTitle.tsx';
import NavButtons from './components/NavButtons.tsx';
import OptionCard from './components/OptionCard.tsx';
import type { QuestionProps } from './types.ts';

const PET_OPTIONS = [
  { value: 'yes', label: '네, 같이 살고있어요.', icon: '🐾' },
  { value: 'no', label: '아니요, 반려동물이 없어요.', icon: '🚫' },
];

const EXPERIENCE_OPTIONS = [
  { value: 'first', label: '처음' },
  { value: 'few', label: '몇 번 정도' },
  { value: 'expert', label: '익숙함' },
];

const QuestionPet = ({
  step,
  total,
  answers,
  setAnswers,
  onNext,
  onPrev,
}: QuestionProps) => {
  const ready = answers.pet && answers.experience;

  return (
    <main className="min-h-screen flex flex-col p-20">
      <DetailHeader>반려동물 & 경험</DetailHeader>
      <ProgressBar current={step} total={total} />
      <MatchingTitle icon='pets' textSize='title-l' >
        함께 살고있는
        <br />
        반려동물이 있나요?
      </MatchingTitle>

      <div className="flex flex-col gap-12">
        {PET_OPTIONS.map((opt) => (
          <OptionCard
            key={opt.value}
            icon={opt.icon}
            label={opt.label}
            selected={answers.pet === opt.value}
            onClick={() => setAnswers({ ...answers, pet: opt.value })}
          />
        ))}
      </div>

      <div className="flex flex-col gap-8 pt-24 flex-1">
        <span className="label-s text-text-30">식물을 키워 보신적이 있나요?</span>
        <div className="grid grid-cols-3 bg-gray-200 rounded-14 p-4">
          {EXPERIENCE_OPTIONS.map((opt) => {
            const isActive = answers.experience === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setAnswers({ ...answers, experience: opt.value })}
                className={`p-12 rounded-12 label-s ${
                  isActive ? 'bg-white text-text-10' : 'text-text-30'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      <NavButtons
        showPrev
        onPrev={onPrev}
        onNext={onNext}
        nextDisabled={!ready}
        nextLabel="결과 보기"
      />
    </main>
  );
};

export default QuestionPet;
