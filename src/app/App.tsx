import { Route, Routes } from 'react-router-dom';
import Banner from '../widgets/banner';
import Header from '../widgets/header';
import Layout from '../widgets/layout';
import BottomNav from '../widgets/bottomNav';
import Onboarding from '../pages/onboarding.tsx';
import NotFound from '../pages/notfound.tsx';

function App() {
  if (1) {
    return <Onboarding />;
  }
  // return (
  //   <>
  //     <Header />
  //     <Banner />
  //     <Routes>
  //       <Route element={<Layout />}>{/* Pages */}</Route>
  //       <Route path="*" element={<NotFound />} />
  //     </Routes>
  //     <BottomNav />
  //   </>
  // );
}
export default App;
