import { IoCartOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { TbWorld } from "react-icons/tb";
import { GoSun } from "react-icons/go";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useContext } from "react";
import { authContext } from "../../contexts/AuthContext";

export default function Topbar({ sidebarOpen, setSidebarOpen }) {
  const { user } = useContext(authContext);

  return (
    <header className="top-0 z-10 border-b border-slate-600 px-4 py-2 text-white">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex w-full items-center gap-3 md:w-auto">
          <button
            type="button"
            aria-label="Toggle sidebar"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-lg p-2 hover:bg-slate-800 md:hidden"
          >
            <HiOutlineMenuAlt2 className="text-xl" />
          </button>

          <input
            type="text"
            placeholder="Search..."
            className="w-full max-w-sm rounded-xl border border-slate-600 bg-slate-800 px-4 py-2 text-white placeholder:text-slate-400 outline-none focus:border-slate-400"
          />
        </div>

        <a
          href="https://suhayb.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg border border-slate-600 px-3 py-2 text-sm hover:bg-slate-800"
        >
          <TbWorld className="text-lg" />
          <span>View Website</span>
        </a>

        <button
          type="button"
          aria-label="Toggle theme"
          className="rounded-lg p-2 text-lg hover:bg-slate-800"
        >
          <GoSun />
        </button>

        <div className="flex items-center gap-4 text-xl">
          <button
            type="button"
            aria-label="Orders"
            className="rounded-lg p-2 hover:bg-slate-800"
          >
            <IoCartOutline />
          </button>

          <button
            type="button"
            aria-label="Notifications"
            className="rounded-lg p-2 hover:bg-slate-800"
          >
            <IoIosNotificationsOutline />
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <FaRegUserCircle className="text-lg" />
          <span className="truncate">Welcome {user && user.name}</span>
        </div>
      </div>
    </header>
  );
}
