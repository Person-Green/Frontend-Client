import { Route, Routes } from "react-router-dom";
import Banner from "../widgets/banner";
import Header from "../widgets/header";
import Layout from "../widgets/layout";
import BottomNav from "../widgets/bottomNav";

function App() {

  return (
    <>
      <Header/>
      <Banner/>
      <Routes>
        <Route element={<Layout/>}>
          {/* Pages */}
        </Route>
      </Routes>
      <BottomNav />
    </>
  );
}

export default App