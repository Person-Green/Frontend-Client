interface PlantInfo {
  name: string;
  description: string;
  onClick?: () => void;
}

const PlantItem = ({ name, description, onClick }: PlantInfo) => {
  return (
    <li
      className="flex flex-col items-center cursor-pointer"
      onClick={onClick}
    >
      <div className="w-[120px] h-[120px] bg-surface-30 rounded-8"></div>
      <span className="body-s !font-[600] text-text-10">{name}</span>
      <span className="label-s text-text-20">{description}</span>
    </li>
  );
};
export default PlantItem;
