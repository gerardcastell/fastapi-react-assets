import { BrowserRouter, Routes, Route } from "react-router";
import { HomePage } from "../pages/HomePage";
import { AssetFormPage } from "../pages/AssetFormPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="assets">
          <Route path="new" element={<AssetFormPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
