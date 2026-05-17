import { Outlet } from 'react-router-dom';
import Header from './header';
import BottomNav from './bottomNav';

const Layout = () => {
  return (
    <section>
      <Header />
      <Outlet />
      <BottomNav />
    </section>
  );
};

export default Layout;
