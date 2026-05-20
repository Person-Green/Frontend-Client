import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { icon: 'park', label: '정원', path: '/' },
    { icon: 'explore', label: '매칭', path: '/matching' },
    { icon: 'temp_preferences_eco', label: '식물도감', path: '/encyclopedia' },
    { icon: 'favorite', label: '내식물', path: '/my-plants' },
  ];

  return (
    <nav className="fixed bottom-0 flex h-fit w-dvw bg-surface-10 px-12 border-t border-t-stroke-10">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className="flex flex-col items-center w-full py-8 gap-6"
          >
            <span className={`icon-m ${isActive ? 'text-text-10' : 'text-text-30'} transition-all duration-100 ease-in-out`}>
              {item.icon}
            </span>
            <span className={`label-s ${isActive ? 'text-text-10' : 'text-text-30'} transition-all duration-100 ease-in-out`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;