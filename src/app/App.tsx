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
import MatchingHistory from '../pages/Matching/History';
import PlantDetail from '../pages/PlantDetail';
import Encyclopedia from '../pages/Encyclopedia';
import MyPlants from '../pages/MyPlants';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/matching" element={<Matching />} />
          <Route path="/encyclopedia" element={<Encyclopedia />} />
          <Route path="/my-plants" element={<MyPlants />} />
        </Route>
        <Route path="/plants/:plantId" element={<PlantDetail />} />
        <Route path="/auth" element={<AuthFlow />} />
        <Route path="/matching/survey" element={<MatchingSurvey />} />
        <Route path="/matching/result" element={<MatchingResult />} />
        <Route path="/matching/history" element={<MatchingHistory />} />
        <Route path="/auth/google/callback" element={<AuthCallback />} />
        <Route path="/auth/enter-name" element={<EnterName />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
export default App;
