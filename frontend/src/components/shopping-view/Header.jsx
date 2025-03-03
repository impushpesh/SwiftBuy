import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { FaShoppingCart, FaUserCog, FaSignOutAlt, FaBars, FaHome } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { shoppingViewHeaderMenuItems } from '../../config';
import { logoutUser } from '../../store/authSlice';
import CartWrapper from './CartWrapper';
import { fetchCart } from '../../store/shopSlice/cartSlice';
import Logo from "../../assets/Logo.png";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? { category: [getCurrentMenuItem.id] }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(new URLSearchParams(`category=${getCurrentMenuItem.id}`))
      : navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex flex-col lg:flex-row lg:items-center gap-6">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <span
          onClick={() => handleNavigate(menuItem)}
          className="text-sm font-medium cursor-pointer hover:text-primary"
          key={menuItem.id}
        >
          {menuItem.label}
        </span>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartDrawer, setOpenCartDrawer] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    if (user) {
      dispatch(fetchCart(user?.id));
    }
  }, [dispatch, user]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 items-center">
      {/* Cart Drawer */}
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer-4" className="drawer-button btn btn-outline"><FaShoppingCart className="w-5 h-5" /><span className="badge badge-secondary absolute top-0 right-0">{cartItems?.items?.length || 0}</span></label>
        </div>
        <div className="drawer-side z-50">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-white text-black min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <CartWrapper setOpenCartSheet={setOpenCartDrawer} cartItems={cartItems?.items || []} />
          </ul>
        </div>
      </div>
      

      {/* User Dropdown */}
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-outline flex items-center">
          {user?.username[0].toUpperCase()}
        </label>
        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-white rounded-box w-52">
          <li><span className="font-bold">Logged in as {user?.username}</span></li>
          <li>
            <button onClick={() => navigate("/shop/account")}>
              <FaUserCog className="mr-2" /> Account
            </button>
          </li>
          <li>
            <button onClick={handleLogout}>
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

function ShoppingHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b  p-4 bg-white text-black">
      <div className="flex justify-between items-center">
        <Link to="/shop/home" className="flex items-center gap-2 text-lg font-bold">
          <img src={Logo} alt="Logo" className="h-12 w-auto" />
        </Link>
        <div className="lg:hidden">
          <button className="btn btn-outline">
            <FaBars className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
