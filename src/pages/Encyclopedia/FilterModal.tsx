import { useState } from 'react';
import { createPortal } from 'react-dom';
import Dim from '../../shared/ui/dim';
import Button from '../../shared/ui/button';
import {
  useFilterStore,
  type PlantFilter,
} from '../../shared/stores/filterStore';

interface FilterSectionConfig {
  key: keyof PlantFilter;
  title: string;
  options: { value: string; label: string }[];
}

const SECTIONS: FilterSectionConfig[] = [
  {
    key: 'manageDifficulty',
    title: '관리난이도',
    options: [
      { value: '매우쉬움', label: '관리매우쉬움' },
      { value: '쉬움', label: '관리쉬움' },
      { value: '보통', label: '관리보통' },
      { value: '어려움', label: '관리어려움' },
    ],
  },
  {
    key: 'airPurification',
    title: '공기정화',
    options: [
      { value: '아주높음', label: '아주높음' },
      { value: '높음', label: '높음' },
      { value: '보통', label: '보통' },
    ],
  },
  {
    key: 'plantSize',
    title: '식물크기',
    options: [
      { value: '소형', label: '소형' },
      { value: '중형', label: '중형' },
      { value: '대형', label: '대형' },
    ],
  },
];

interface RadioOptionProps {
  selected: boolean;
  label: string;
  onClick: () => void;
}

const RadioOption = ({ selected, label, onClick }: RadioOptionProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-6 px-6"
    >
      <span
        className={`flex items-center justify-center w-[14px] h-[14px] outline-offset-[-1px] rounded-full outline transition-all duration-100 ease-in-out ${
          selected ? 'outline-primary outline-4 outline-offset-[-4px]' : 'outline-stroke-10'
        }`}
      >
        {selected && <span className="w-[6px] h-[6px] rounded-full bg-surface-10" />}
      </span>
      <p
        className={`label-s ${selected ? 'text-text-20' : 'text-text-30'}`}
      >
        {label}
      </p>
    </button>
  );
};

interface FilterSectionProps {
  config: FilterSectionConfig;
}

const FilterSection = ({ config }: FilterSectionProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const value = useFilterStore((s) => s.draft[config.key]);
  const setDraft = useFilterStore((s) => s.setDraft);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between w-full"
      >
        <p className="body-m !font-semibold text-text-20">{config.title}</p>
        <span className={`icon-s text-text-30 p-4 transition-all duration-200 ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'}`} >
          keyboard_arrow_down
        </span>
      </button>
        <div className="flex flex-col gap-8 py-12 transition-all duration-500 ease-in-out">
          {isOpen && 
            config.options.map((option) => (
            <RadioOption
              key={option.value}
              selected={value === option.value}
              label={option.label}
              onClick={() => setDraft(config.key, option.value)}
            />
          ))}
        </div>
    </div>
  );
};

const FilterModal = () => {
  const isOpen = useFilterStore((s) => s.isOpen);
  const closeModal = useFilterStore((s) => s.closeModal);
  const applyFilter = useFilterStore((s) => s.applyFilter);

  if (!isOpen) return null;

  return createPortal(
    <>
      <Dim onClick={closeModal} />
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full flex flex-col gap-16 px-16 pt-16 pb-24 rounded-t-[14px] bg-surface-10 shadow-[0px_0px_8px_0px_rgba(132,137,148,0.2)] z-2000">
        <div className="flex items-start justify-between w-full text-text-10">
          <div className="flex items-center">
            <span className="icon-s">filter_alt</span>
            <p className="body-m !font-[600]">필터</p>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="icon-s text-text-10"
            aria-label="필터 닫기"
          >
            close
          </button>
        </div>

        <div className="flex flex-col gap-6 px-8 w-full">
          {SECTIONS.map((section) => (
            <FilterSection key={section.key} config={section} />
          ))}
        </div>

        <div className="w-full py-24">
          <Button onClick={applyFilter}>적용하기</Button>
        </div>
      </div>
    </>,
    document.body,
  );
};

export default FilterModal;
