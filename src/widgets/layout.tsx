import { Outlet } from "react-router-dom";
import Header from "./header";
import Banner from "./banner";
import BottomNav from "./bottomNav";

const Layout = () => {
  return(
		<section>
      <Header />
      <Banner />
      <Outlet />
      <BottomNav />
    </section>
  );
}

export default Layout;