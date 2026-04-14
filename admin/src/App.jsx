import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from "./components/dashboard/AdminLayout";
import Dashboard from "./components/dashboard/Dashboard";
import AddProductPage from "./features/product/pages/AddProductPage";
import BrandPage from "./features/brand/pages/BrandPage";
import CategoryPage from "./features/category/pages/CategoryPage";
import SubCategoryPage from "./features/subcategory/pages/SubCategoryPage";
import CollectionPage from "./features/collection/pages/CollectionPage";
import { Toaster } from "react-hot-toast";
import NotFound from "./components/form/NotFound";
import ProductPage from "./features/product/pages/ProductPage";
import SignupForm from "./features/auth/authLogin/components/SignupForm";
import LoginForm from "./features/auth/authLogin/components/LoginForm";
import AuthContextProvider from "./contexts/AuthContext";
import ProtectedRoute from "./features/auth/authLogin/protect/ProtectedRoute";
import RoleProtectedRoute from "./features/auth/authLogin/protect/RoleProtectedRoute";
import PublicRoute from "./features/auth/authLogin/protect/PublicRoute";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2000,
          }}
        />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<AdminLayout />}>
              <Route
                element={
                  <RoleProtectedRoute allowedRoles={["super_admin", "admin"]} />
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="products" element={<ProductPage />} />
                <Route path="brand" element={<BrandPage />} />
                <Route path="category" element={<CategoryPage />} />
                <Route path="sub-category" element={<SubCategoryPage />} />
                <Route path="collection" element={<CollectionPage />} />
              </Route>

              <Route
                element={
                  <RoleProtectedRoute
                    allowedRoles={["super_admin", "data_entry"]}
                  />
                }
              >
                <Route path="add-product" element={<AddProductPage />} />
              </Route>
            </Route>
          </Route>

          <Route
            element={<RoleProtectedRoute allowedRoles={["super_admin"]} />}
          >
            <Route path="/signup" element={<SignupForm />} />
          </Route>

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginForm />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
