import { Route, Routes } from 'react-router-dom';
import Layout from '../widgets/layout';
import NotFound from '../pages/AuthFlow/notfound.tsx';
import AuthFlow from '../pages/AuthFlow';
import AuthCallback from '../pages/AuthFlow/callback.tsx';
import EnterName from '../pages/AuthFlow/enterName.tsx';
import Home from '../pages/Home';
import Matching from '../pages/Matching';
import MatchingSurvey from '../pages/Matching/Survey';
import MatchingResult from '../pages/Matching/Result';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/matching" element={<Matching />} />
        </Route>
        <Route path="/auth" element={<AuthFlow />} />
        <Route path="/matching/survey" element={<MatchingSurvey />} />
        <Route path="/matching/result" element={<MatchingResult />} />
        <Route path="/auth/google/callback" element={<AuthCallback />} />
        <Route path="/auth/enter-name" element={<EnterName />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
export default App;
