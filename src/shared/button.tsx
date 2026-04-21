interface ButtonProps {
  onClick?: () => void;
  icon: string | undefined;
  children: React.ReactNode;
  dimmed?: boolean;
}

const Button = ({ icon, children, onClick, dimmed }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`h-full w-full p-16 flex justify-center gap-6 bg-primary rounded-14 text-text-on-primary ${dimmed ? ' opacity-50' : ''}`}
      type="button"
    >
      {icon && <span className={'icon-s'}>{icon}</span>}
      <div
        className={
          'body-s flex justify-center items-center gap-6 whitespace-nowrap'
        }
      >
        {children}
      </div>
    </button>
  );
};

export default Button;
