import { Route, Routes } from 'react-router-dom';
import Layout from '../widgets/layout';
import NotFound from '../pages/AuthFlow/notfound.tsx';
import AuthFlow from '../pages/AuthFlow';
import AuthCallback from '../pages/AuthFlow/callback.tsx';
import EnterName from '../pages/AuthFlow/enterName.tsx';
import Home from '../pages/Home';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/auth" element={<AuthFlow />} />
        <Route path="/auth/google/callback" element={<AuthCallback />} />
        <Route path="/auth/enter-name" element={<EnterName />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
export default App;
