import { Route, Routes } from 'react-router-dom';
import Layout from '../widgets/layout';
import NotFound from '../pages/notfound';
import AuthFlow from '../feature/AuthFlow';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/auth" element={<AuthFlow />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
export default App;
