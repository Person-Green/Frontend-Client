import { Route, Routes } from 'react-router-dom';
import Layout from '../widgets/layout';
import NotFound from '../pages/AuthFlow/notfound.tsx';
import AuthFlow from '../pages/AuthFlow';
import Home from '../pages/Home';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/auth" element={<AuthFlow />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
export default App;
