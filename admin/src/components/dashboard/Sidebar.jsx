import { NavLink } from "react-router-dom";

const navStyle =
  "flex items-center rounded-xl px-4 py-2 text-sm transition-all";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 hidden border-r border-slate-600 h-screen w-45 p-4 md:block">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-white">FTP</h1>
        <hr className="my-2.5 text-slate-600" />
      </div>

      <div className="space-y-2 truncate">
        <NavLink
          to="/"
          end
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
      </div>
    </aside>
  );
}
