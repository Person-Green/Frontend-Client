interface ButtonProps {
  onClick?: () => void;
  bg? : string | undefined;
  icon?: string | undefined;
  children: React.ReactNode;
  dimmed?: boolean;
  disabled?: boolean;
}

const Button = ({ icon, children, onClick, dimmed, disabled }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`h-full w-full p-16 flex justify-center gap-6 bg-primary rounded-14 text-text-on-primary ${dimmed || disabled ? ' opacity-50' : ''} ${disabled ? 'cursor-not-allowed' : ''}`}
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
