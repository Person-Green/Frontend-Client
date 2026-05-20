interface HistoryItemProps {
  title: string;
  description: string;
  onClick?: () => void;
}

const HistoryItem = ({ title, description, onClick }: HistoryItemProps) => {
  return (
    <li
      onClick={onClick}
      className="flex items-center w-full p-20 rounded-14 bg-surface-10 border border-stroke-10-trans cursor-pointer"
    >
      <div className="flex flex-col gap-6 items-start break-words">
        <span className="body-s font-semibold text-text-10 leading-[22px]">
          {title}
        </span>
        <span className="label-s text-text-30">{description}</span>
      </div>
    </li>
  );
};

export default HistoryItem;
