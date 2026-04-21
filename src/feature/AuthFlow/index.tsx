import EnterName from '../../pages/enterName.tsx';
import Login from '../../pages/login.tsx';
import Onboarding from '../../pages/onboarding.tsx';
import { useState } from 'react';

const AuthFlow = () => {
  const [currentPage, setCurrentPage] = useState<
    'onboarding' | 'login' | 'enterName'
  >('onboarding');

  if (currentPage === 'onboarding') {
    return <Onboarding onComplete={() => setCurrentPage('login')} />;
  }

  if (currentPage === 'login') {
    return <Login onGoogleLogin={() => setCurrentPage('enterName')} />;
  }

  return <EnterName />;
};
export default AuthFlow;
