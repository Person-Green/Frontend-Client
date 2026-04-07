import { Route, Routes } from 'react-router-dom';
import Layout from '../widgets/layout';
import NotFound from '../pages/notfound';
// import { useState } from 'react';
// import Onboarding from '../pages/onboarding.tsx';
// import Login from '../pages/login.tsx';

function App() {
  // const [currentPage, setCurrentPage] = useState<'onboarding' | 'login'>(
  //   'onboarding',
  // );
  // if (currentPage === 'onboarding') {
  //   return <Onboarding onComplete={() => setCurrentPage('login')} />;
  // }
  // return <Login />;

  return (
    <>
      <Routes>
        <Route element={<Layout />}>{/* Pages */}</Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
export default App;
