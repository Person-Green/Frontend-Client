interface TitleProps {
  icon: string | undefined;
  children: React.ReactNode;
  textSize: string;
}

const MatchingTitle = ({ icon, children, textSize }: TitleProps) => {
  return (
    <div className="flex items-center gap-6">
      <span className="icon-l text-text-10 p-16">{icon}</span>
      <span className={textSize}>{children}</span>
    </div>
  );
};
export default MatchingTitle;
