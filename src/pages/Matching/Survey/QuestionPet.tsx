import OptionCard from './components/OptionCard.tsx';
import type { QuestionProps } from './types.ts';

const PET_OPTIONS = [
  { value: 'yes', label: '네, 같이 살고있어요.', icon: 'pet_supplies' },
  { value: 'no', label: '아니요, 반려동물이 없어요.', icon: 'block' },
];

const EXPERIENCE_OPTIONS = [
  { value: 'first', label: '처음' },
  { value: 'few', label: '몇 번 정도' },
  { value: 'expert', label: '익숙함' },
];

const QuestionPet = ({ answers, setAnswers }: QuestionProps) => {
  return (
    <>
      <div className="flex flex-col gap-8 py-16">
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

      <div className="flex flex-col gap-6">
        <span className="body-s text-text-30">식물을 키워 보신적이 있나요?</span>
        <div className="grid grid-cols-3 bg-gray-200 rounded-14 bg-surface-20 p-6">
          {EXPERIENCE_OPTIONS.map((opt) => {
            const isActive = answers.experience === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setAnswers({ ...answers, experience: opt.value })}
                className={`p-12 rounded-12 body-s rounded-14 ${
                  isActive ? 'bg-surface-10 text-text-10' : 'text-text-30'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default QuestionPet;
