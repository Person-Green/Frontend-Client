import { Route, Routes } from "react-router-dom";
import Layout from "../widgets/layout";
import NotFound from "../pages/notfound";

function App() {

  return (
    <>
      <Routes>
        <Route element={<Layout/>}>
          {/* Pages */}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App