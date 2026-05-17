interface TitleProps {
  icon: string | undefined;
  title: string;
}

const Title = ({ icon, title }: TitleProps) => {
  return (
    <div className="flex items-center gap-6">
      <span className="icon-m text-text-highlight">{icon}</span>
      <span className="title-m text-text-10">{title}</span>
    </div>
  );
};
export default Title;
