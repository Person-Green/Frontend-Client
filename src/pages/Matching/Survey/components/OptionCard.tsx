type OptionCardProps = {
  icon?: string;
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
          ? 'border-primary bg-primary/10 text-primary'
          : 'border-gray-200 bg-white text-text-20'
      }`}
    >
      {icon && <span className="text-xl">{icon}</span>}
      <span className="body-s">{label}</span>
    </button>
  );
};

export default OptionCard;
