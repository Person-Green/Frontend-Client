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
  return (
    <div className="flex w-full border-b border-stroke-10">
      {TABS.map((tab) => {
        const isActive = active === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={`flex-1 flex items-center justify-center px-16 py-8 label-m transition-colors ${
              isActive
                ? 'border-b border-primary text-text-highlight'
                : 'text-text-30'
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
