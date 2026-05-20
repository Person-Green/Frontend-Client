import NonePlantImage from '../../assets/plants/none.svg';

interface PlantInfo {
  name: string;
  description: string;
  imageUrl?: string;
  onClick?: () => void;
}

const PlantItem = ({ name, description, imageUrl, onClick }: PlantInfo) => {
  const src = imageUrl && imageUrl.trim() !== '' ? imageUrl : NonePlantImage;
  return (
    <li
      className="flex flex-col items-center cursor-pointer"
      onClick={onClick}
    >
      <div className="w-[120px] h-[120px] bg-surface-30 rounded-8">
      <img
        src={src}
        alt={name}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = NonePlantImage;
        }}
        className="w-[120px] h-[120px] rounded-8 object-cover"
      />
      </div>
      <span className="body-s !font-[600] text-text-10">{name}</span>
      <span className="label-s text-text-20">{description}</span>
    </li>
  );
};
export default PlantItem;
