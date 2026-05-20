import { Outlet } from 'react-router-dom';
import Header from './header';
import BottomNav from './bottomNav';

const Layout = () => {
  return (
    <section className="h-dvh flex flex-col">
      <Header />
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <Outlet />
      </div>
      <BottomNav />
    </section>
  );
};

export default Layout;
