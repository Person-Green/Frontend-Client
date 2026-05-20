interface PlantInfo {
  key: number;
  name: string;
  description: string;
}

const PlantItem = ({ key, name, description }: PlantInfo) => {
  return (
    <li key={key} className="flex flex-col items-center">
      <div className="w-[120px] h-[120px] bg-surface-30 rounded-8"></div>
      <span className="body-s">{name}</span>
      <span className="label-s">{description}</span>
    </li>
  );
};
export default PlantItem;
