import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from "./components/dashboard/AdminLayout";
import Dashboard from "./components/dashboard/Dashboard";
import ProductPage from "./features/product/pages/ProductPage";
import BrandPage from "./features/brand/pages/BrandPage";
import CategoryPage from "./features/category/pages/CategoryPage";
import SubCategoryPage from "./features/subcategory/pages/SubCategoryPage";
import CollectionPage from "./features/collection/pages/CollectionPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
        }}
      />
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-product" element={<ProductPage />} />
          <Route path="brand" element={<BrandPage />} />
          <Route path="category" element={<CategoryPage />} />
          <Route path="sub-category" element={<SubCategoryPage />} />
          <Route path="collection" element={<CollectionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
