interface PlantInfo {
  i: number;
  name: string;
  description: string;
}

const PlantItem = ({ i, name, description }: PlantInfo) => {
  return (
    <li key={i} className="flex flex-col items-center">
      <div className="w-[120px] h-[120px] bg-surface-30 rounded-8"></div>
      <span className="body-s">{name}</span>
      <span className="label-s">{description}</span>
    </li>
  );
};
export default PlantItem;
