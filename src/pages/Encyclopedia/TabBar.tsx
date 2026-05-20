export type EncyclopediaTab = 'all' | 'popular' | 'favorites';

interface TabBarProps {
  active: EncyclopediaTab;
  onChange: (tab: EncyclopediaTab) => void;
}

const TABS: { key: EncyclopediaTab; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'popular', label: '인기식물' },
  { key: 'favorites', label: '찜목록' },
];

const TabBar = ({ active, onChange }: TabBarProps) => {
  const activeIndex = TABS.findIndex((tab) => tab.key === active);

  return (
    <div className="relative flex w-full border-b border-stroke-10">
      <div
        className="pointer-events-none absolute -bottom-px left-0 h-px w-1/3 bg-primary transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
      />
      {TABS.map((tab) => {
        const isActive = active === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={`flex-1 flex items-center justify-center px-16 py-8 label-m transition-colors duration-300 ease-in-out ${
              isActive ? 'text-text-highlight' : 'text-text-30'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default TabBar;
