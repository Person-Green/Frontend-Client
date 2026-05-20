import { useHeaderStore } from '../shared/stores/headerStore';

const Header = () => {
  const config = useHeaderStore((s) => s.config);
  if (!config) return null;

  const { icon, title, rightSlot, variant = 'primary' } = config;
  const colorClass =
    variant === 'highlight' ? 'text-text-highlight' : 'text-primary';

  return (
    <header className="flex items-center justify-between pl-24 pr-16 h-[3.75rem]">
      <div className={`flex items-center gap-6 ${colorClass}`}>
        <span className="icon-m">{icon}</span>
        <h1 className="title-m">{title}</h1>
      </div>
      {rightSlot}
    </header>
  );
};

export default Header;
