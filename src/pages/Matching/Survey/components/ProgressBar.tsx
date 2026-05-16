type ProgressBarProps = {
  current: number;
  total: number;
};

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const percent = (current / total) * 100;
  return (
    <div className="flex flex-col gap-4 py-12">
      <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="flex justify-between label-s text-text-30">
        <span>진행도</span>
        <span>
          {current}/{total}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
