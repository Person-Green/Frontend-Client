type SurveyHeaderProps = {
  title: string;
  onBack: () => void;
};

const SurveyHeader = ({ title, onBack }: SurveyHeaderProps) => {
  return (
    <header className="relative h-60 flex mx-16 my-8 items-center justify-center ">
      <button
        type="button"
        onClick={onBack}
        className="absolute left-0 p-8 icon-l text-text-30"
      >
        keyboard_arrow_left
      </button>
      <span className="label-m text-text-20">{title}</span>
    </header>
  );
};

export default SurveyHeader;
