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
  // nextDisabled,
  nextLabel = '다음으로',
}: NavButtonsProps) => {
  return (
    <div className="flex gap-8 h-fit py-16">
      {showPrev && (
        <button
          type="button"
          onClick={onPrev}
          className="flex-1 flex items-center justify-center gap-6 p-16 rounded-14 bg-surface-20 text-text-20 body-s"
        >
          <span className="icon-s">chevron_backward</span> 
          <span className="mr-12">이전으로</span>
        </button>
      )}
      <div className="flex-1">
        <Button onClick={onNext}>
          {nextLabel}
        </Button>
      </div>
    </div>
  );
};

export default NavButtons;
