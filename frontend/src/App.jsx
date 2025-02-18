import { Route,Routes  } from "react-router-dom";
// Auth
import Authlayout from "./components/auth/Authlayout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";

// Admin
import AdminLayout from "./components/admin-view/Adminlayout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";

// Shop
import ShoppingLayout from "./components/shopping-view/Shoppinglayout";

//Page doesnt exist
import NotFound from "./pages/404";

function App() {
  return (
    <div>
      <Routes>
        {/* Auth */}
        <Route path="/auth" element={<Authlayout />} >
          <Route path="/login" element={<AuthLogin />} />
          <Route path="/register" element={<AuthRegister />} />
        </Route>
        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />} >
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/product" element={<AdminProducts />} />
          <Route path="/orders" element={<AdminOrders />} />
          <Route path="/features" element={<AdminFeatures />} />
        </Route>
        {/* Shop */}
        <Route path="/shop" element={<ShoppingLayout />} >

        </Route>
        {/* Page doesnt exist */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      
    </div>
  );
}

export default App;
