interface ButtonProps {
  onClick?: () => void;
  bg? : string | undefined;
  icon?: string | undefined;
  children: React.ReactNode;
  dimmed?: boolean;
  disabled?: boolean;
  undo?: boolean;
}

const Button = ({ icon, children, onClick, dimmed, disabled, undo }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`h-full w-full p-16 flex justify-center gap-6 rounded-14 ${dimmed || disabled ? ' opacity-50' : ''} ${disabled ? 'cursor-not-allowed' : ''} ${undo ? 'bg-surface-20 text-text-20' : 'bg-primary text-text-on-primary'}`}
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
