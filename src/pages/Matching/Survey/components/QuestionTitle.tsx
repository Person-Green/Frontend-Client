type QuestionTitleProps = {
  icon?: string;
  children: React.ReactNode;
};

const QuestionTitle = ({ icon, children }: QuestionTitleProps) => {
  return (
    <div className="flex items-center gap-12 py-24">
      {icon && <span className="text-3xl">{icon}</span>}
      <h2 className="title-m">{children}</h2>
    </div>
  );
};

export default QuestionTitle;
