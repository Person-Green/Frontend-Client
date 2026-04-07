// import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
// import Banner from '../widgets/banner';
// import Header from '../widgets/header';
// import Layout from '../widgets/layout';
// import BottomNav from '../widgets/bottomNav';
// import NotFound from '../pages/notfound';
import Onboarding from '../pages/onboarding.tsx';
import Login from '../pages/login.tsx';

function App() {
  const [currentPage, setCurrentPage] = useState<'onboarding' | 'login'>(
    'onboarding',
  );
  if (currentPage === 'onboarding') {
    return <Onboarding onComplete={() => setCurrentPage('login')} />;
  }
  return <Login />;

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
