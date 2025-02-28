import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiGrid, FiBox, FiShoppingBag, FiCheckCircle, FiMenu } from "react-icons/fi";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <FiGrid size={20} />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/product",
    icon: <FiBox size={20} />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <FiCheckCircle size={20} />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();

  return (
    <nav className="flex flex-col gap-2 mt-8">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            setOpen && setOpen(false);
          }}
          className="flex items-center gap-2 p-3 cursor-pointer rounded-md hover:bg-gray-100 hover:text-gray-800"
        >
          {menuItem.icon}
          <span className="text-lg transition-colors">{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      {open && (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      <aside
        className={`fixed lg:static z-20 flex flex-col bg-white shadow-md w-64 h-full min-h-screen transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 p-4 cursor-pointer bg-white text-black"
        >
          <FiShoppingBag size={24} />
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <MenuItems setOpen={setOpen} />
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
