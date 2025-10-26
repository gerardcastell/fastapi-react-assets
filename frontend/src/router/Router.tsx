import { BrowserRouter, Routes, Route } from "react-router";
import { HomePage } from "../pages/HomePage";
import { CreateAssetsPage } from "../pages/CreateAssetsPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="assets">
          <Route path="new" element={<CreateAssetsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
