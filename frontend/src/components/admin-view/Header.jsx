import { FiLogOut } from "react-icons/fi";
import { FaAlignJustify } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/authSlice/index";
import Logo from "../../assets/Logo.png";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white border-b">
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden p-2 text-gray-700 rounded-md hover:bg-gray-100"
      >
        <FaAlignJustify size={24} />
        <span className="sr-only">Toggle Menu</span>
      </button>
      <div className="flex flex-1 justify-center">
        <img src={Logo} alt="Logo" className="h-12 w-auto" />
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium bg-red-500 text-white hover:bg-red-600"
        >
          <FiLogOut size={20} />
          Logout
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;
