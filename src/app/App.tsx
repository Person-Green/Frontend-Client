import { useState } from 'react';
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
}
export default App;
