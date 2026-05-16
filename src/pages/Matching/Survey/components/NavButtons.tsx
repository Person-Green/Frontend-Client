import Button from '../../../../shared/button.tsx';

type NavButtonsProps = {
  showPrev: boolean;
  onPrev: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
};

const NavButtons = ({
  showPrev,
  onPrev,
  onNext,
  nextDisabled,
  nextLabel = '다음으로',
}: NavButtonsProps) => {
  return (
    <div className="flex gap-8 h-fit py-16">
      {showPrev && (
        <button
          type="button"
          onClick={onPrev}
          className="flex-1 p-16 rounded-14 bg-gray-200 text-text-20 body-s"
        >
          {'< 이전으로'}
        </button>
      )}
      <div className="flex-2">
        <Button onClick={onNext} dimmed={nextDisabled}>
          {nextLabel}
        </Button>
      </div>
    </div>
  );
};

export default NavButtons;
