import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { FaShoppingCart, FaUserCog, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { shoppingViewHeaderMenuItems } from '../../config';
import { logoutUser, resetTokenAndCredentials } from '../../store/authSlice';
import CartWrapper from './CartWrapper';
import { fetchCart } from '../../store/shopSlice/cartSlice';
import Logo from "../../assets/Logo.png";

function MenuItems({ onMenuItemClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(menuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      menuItem.id !== "home" &&
      menuItem.id !== "products" &&
      menuItem.id !== "search"
        ? { category: [menuItem.id] }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    if (location.pathname.includes("listing") && currentFilter !== null) {
      setSearchParams(new URLSearchParams(`category=${menuItem.id}`));
    } else {
      navigate(menuItem.path);
    }
    if (onMenuItemClick) {
      onMenuItemClick();
    }
  }

  return (
    <nav className="flex flex-col lg:flex-row gap-4 text-black">
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

function HeaderRightContent({ cartDrawerId = "cart-drawer" }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    // dispatch(logoutUser());
    dispatch(resetTokenAndCredentials());
    sessionStorage.clear();
    navigate("/auth/login");
  }

  useEffect(() => {
    if (user) {
      dispatch(fetchCart(user?.id));
    }
  }, [dispatch, user]);

  return (
    <div className="flex items-center gap-4">
      {/* Cart Drawer */}
      <div className="drawer drawer-end">
        <input id={cartDrawerId} type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor={cartDrawerId} className="btn btn-outline">
            <FaShoppingCart className="w-5 h-5 text-black" />
            <span className="badge badge-secondary absolute top-0 right-0">
              {cartItems?.length || 0}
            </span>
          </label>
        </div>
        <div className="drawer-side z-50">
          <label htmlFor={cartDrawerId} className="drawer-overlay"></label>
          <ul className="menu bg-white text-black min-h-full w-80 p-4">
            <CartWrapper cartItems={cartItems} />
          </ul>
        </div>
      </div>

      {/* User Dropdown */}
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-outline flex items-center text-black">
          {user?.username[0].toUpperCase()}
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-white rounded-box w-52"
        >
          <li>
            <span className="font-bold">Welcome <p className="font-bold text-green-700">{user?.username}</p> </span>
          </li>
          <li>
            <button  onClick={() => navigate("/shop/account")}>
              <FaUserCog className="mr-2" /> Account
            </button>
          </li>
          <li>
            <button onClick={handleLogout} className=" text-red-600">
              <FaSignOutAlt className="mr-2  text-red-600" /> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

function ShoppingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b p-4 bg-white text-black">
        <div className="flex justify-between items-center">
          <Link to="/shop/home" className="flex items-center gap-2 text-lg font-bold">
            <img src={Logo} alt="Logo" className="h-12 w-auto" />
          </Link>
          <div className="hidden lg:block">
            <MenuItems />
          </div>
          <div className="lg:hidden flex items-center gap-2">
            <button className="btn btn-outline" onClick={() => setMobileMenuOpen(true)}>
              <FaBars className="h-6 w-6" />
            </button>
            <HeaderRightContent cartDrawerId="cart-drawer-mobile" />
          </div>
          <div className="hidden lg:flex">
            <HeaderRightContent cartDrawerId="cart-drawer-desktop" />
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 z-40 backdrop-blur-md bg-white/30" 
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          {/* Drawer panel */}
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white p-4 overflow-y-auto transition-transform duration-300">
            <button 
              className="btn btn-outline btn-error mb-4 text-black" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Close
            </button>
            <MenuItems onMenuItemClick={() => setMobileMenuOpen(false)} />
          </div>
        </>
      )}
    </>
  );
}

export default ShoppingHeader;
