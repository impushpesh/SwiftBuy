import { Route,Routes  } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

// importing slice
import {checkAuthStatus} from './store/authSlice/index'

// Auth
import Authlayout from "./components/auth/Authlayout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";

// Admin
import AdminLayout from "./components/admin-view/Adminlayout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";

// Shop
import ShoppingLayout from "./components/shopping-view/Shoppinglayout";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingAccount from "./pages/shopping-view/account";
import ShoppingCheckout from "./pages/shopping-view/checkout";

// Payment
import PaypalReturnPage from "./pages/shopping-view/paymentreturn";
import PaymentSuccessPage from "./pages/shopping-view/paymentsuccess";

//Page doesnt exist
import NotFound from "./pages/404";

// Auth component
import CheckAuth from "./components/common/check-auth";

// Unauth page
import UnauthPage from "./pages/unauth";

// Loading component
import Loading from "./components/loading/loading";
import Search from "./pages/shopping-view/search";


function App() {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(checkAuthStatus())
  }, [dispatch])
  
  if (isLoading){
    return <Loading />
  }

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/" element={<CheckAuth isAuthenticated={isAuthenticated} user={user} />} />
        {/* Auth */}
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <Authlayout />
          </CheckAuth>
          } >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        {/* Admin */}
        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
          } >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="product" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
        {/* Shop */}
        <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
          } >
        <Route path="home" element={<ShoppingHome />} />
        <Route path="listing" element={<ShoppingListing />} />
        <Route path="account" element={<ShoppingAccount />} />
        <Route path="checkout" element={<ShoppingCheckout />} />
        <Route path="paypal-return" element={<PaypalReturnPage />} />
        <Route path="payment-success" element={<PaymentSuccessPage />} />
        <Route path="search" element= {<Search/>} />

        </Route>
        {/* Page doesnt exist */}
        <Route path="*" element={<NotFound />} />

        <Route path="/unauth-page" element={<UnauthPage />} />

      </Routes>
      <Toaster />
      
    </div>
  );
}

export default App;
