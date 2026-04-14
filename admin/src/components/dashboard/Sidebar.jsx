import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../../contexts/AuthContext";

const navStyle =
  "flex items-center rounded-xl px-4 py-2 text-sm transition-all";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { logout, user } = useContext(authContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const ok = window.confirm("Are you sure logout or not?");
    if (!ok) return;

    try {
      await logout();
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      {/* overlay for mobile/tablet */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-45 border-r border-slate-600 bg-slate-900 p-4 transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:block`}
      >
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-white">FTP</h1>
          <hr className="my-2.5 text-slate-600" />
        </div>

        <div className="space-y-2 truncate">
          <NavLink
            to="/"
            end
            onClick={closeSidebar}
            className={({ isActive }) =>
              `${navStyle} ${
                isActive
                  ? "bg-sky-700 opacity-90 text-white font-extrabold"
                  : "text-gray-300 font-medium"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/products"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `${navStyle} ${
                isActive
                  ? "bg-sky-700 opacity-90 text-white font-extrabold"
                  : "text-gray-300 font-medium"
              }`
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/brand"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `${navStyle} ${
                isActive
                  ? "bg-sky-700 opacity-90 text-white font-extrabold"
                  : "text-gray-300 font-medium"
              }`
            }
          >
            Brand
          </NavLink>

          <NavLink
            to="/category"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `${navStyle} ${
                isActive
                  ? "bg-sky-700 opacity-90 text-white font-extrabold"
                  : "text-gray-300 font-medium"
              }`
            }
          >
            Category
          </NavLink>

          <NavLink
            to="/sub-category"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `${navStyle} ${
                isActive
                  ? "bg-sky-700 opacity-90 text-white font-extrabold"
                  : "text-gray-300 font-medium"
              }`
            }
          >
            Sub Category
          </NavLink>

          <NavLink
            to="/collection"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `${navStyle} ${
                isActive
                  ? "bg-sky-700 opacity-90 text-white font-extrabold"
                  : "text-gray-300 font-medium"
              }`
            }
          >
            Collection
          </NavLink>

          <NavLink
            to="/add-product"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `${navStyle} ${
                isActive
                  ? "bg-sky-700 opacity-90 text-white font-extrabold"
                  : "text-gray-300 font-medium"
              }`
            }
          >
            Add Products
          </NavLink>

          <button
            className="mt-5 ms-3 flex cursor-pointer items-center rounded-xl bg-red-600 px-6 py-1.5 text-sm text-white transition-all"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
