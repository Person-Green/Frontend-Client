interface ButtonProps {
  onClick?: () => void;
  icon: string | undefined;
  children: React.ReactNode;
}

const Button = ({ icon, children, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={
        'h-full p-16 flex justify-center gap-6 bg-primary rounded-14 text-text-on-primary'
      }
      type="button"
    >
      {icon && <span className={'icon-s'}>{icon}</span>}
      <div className={'body-s flex justify-center gap-6 whitespace-nowrap'}>
        {children}
      </div>
    </button>
  );
};

export default Button;
