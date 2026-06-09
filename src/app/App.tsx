import { Route, Routes } from 'react-router-dom';
import Layout from '../widgets/layout';
import NotFound from '../pages/AuthFlow/notfound.tsx';
import AuthFlow from '../pages/AuthFlow/index.tsx';
import AuthCallback from '../pages/AuthFlow/callback.tsx';
import KakaoCallback from '../pages/AuthFlow/kakaoCallback.tsx';
import EnterName from '../pages/AuthFlow/enterName.tsx';
import Home from '../pages/Home';
import Matching from '../pages/Matching';
import MatchingSurvey from '../pages/Matching/Survey';
import MatchingResult from '../pages/Matching/Result';
import MatchingHistory from '../pages/Matching/History';
import PlantDetail from '../pages/PlantDetail';
import Encyclopedia from '../pages/Encyclopedia';
import MyPlants from '../pages/MyPlants';
import RequireAuth from './RequireAuth';

function App() {
  return (
    <>
      <Routes>
        <Route
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/matching" element={<Matching />} />
          <Route path="/encyclopedia" element={<Encyclopedia />} />
          <Route path="/my-plants" element={<MyPlants />} />
        </Route>
        <Route
          path="/plants/:plantId"
          element={
            <RequireAuth>
              <PlantDetail />
            </RequireAuth>
          }
        />
        <Route
          path="/matching/survey"
          element={
            <RequireAuth>
              <MatchingSurvey />
            </RequireAuth>
          }
        />
        <Route
          path="/matching/result"
          element={
            <RequireAuth>
              <MatchingResult />
            </RequireAuth>
          }
        />
        <Route
          path="/matching/history"
          element={
            <RequireAuth>
              <MatchingHistory />
            </RequireAuth>
          }
        />
        <Route
          path="/kakao/callback"
          element={
            <RequireAuth>
              <KakaoCallback />
            </RequireAuth>
          }
        />
        <Route path="/auth" element={<AuthFlow />} />
        <Route path="/auth/google/callback" element={<AuthCallback />} />
        <Route path="/auth/enter-name" element={<EnterName />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
export default App;
