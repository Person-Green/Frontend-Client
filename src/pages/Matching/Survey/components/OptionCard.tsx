type OptionCardProps = {
  icon: string;
  label: string;
  selected: boolean;
  onClick: () => void;
};

const OptionCard = ({ icon, label, selected, onClick }: OptionCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-12 p-16 rounded-14 border ${
        selected
          ? 'border-primary bg-[#5F9B45]/10 text-text-highlight'
          : 'border-stroke-10-trans bg-surface-10 text-text-20'
      }`}
    >
      <p className={`p-6 rounded-max flex items-center justify-center ${
        selected
          ? ' bg-primary text-text-on-primary'
          : 'bg-surface-20 text-text-30'
      }`}>
        <span className="icon-s">{icon}</span>
      </p>
      <span className="body-s">{label}</span>
    </button>
  );
};

export default OptionCard;
