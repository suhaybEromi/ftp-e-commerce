import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-slate-900">
      <Sidebar />

      <div className="flex flex-1 flex-col md:ml-45">
        <Topbar />
        <main className="p-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
