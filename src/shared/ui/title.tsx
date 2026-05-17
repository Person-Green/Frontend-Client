interface TitleProps {
  icon: string | undefined;
  title: string;
  textSize: string;
}

const Title = ({ icon, title, textSize }: TitleProps) => {
  return (
    <div className="flex items-center gap-6">
      <span className="icon-m text-text-highlight">{icon}</span>
      <span className={textSize}>{title}</span>
    </div>
  );
};
export default Title;
