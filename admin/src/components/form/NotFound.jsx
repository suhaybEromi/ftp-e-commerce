import { Link } from "react-router-dom";
import { Home, ArrowLeft, ShieldAlert } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-3xl">
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl">
          <div className="absolute inset-0 bg-linear-to-br from-red-500/10 via-transparent to-cyan-500/10" />
          <div className="absolute -top-20 -right-20 h-52 w-52 rounded-full bg-red-500/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative z-10 p-8 md:p-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-300">
              <ShieldAlert size={16} />
              Admin Panel
            </div>

            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <h1 className="text-7xl md:text-8xl font-black tracking-tight text-white">
                  404
                </h1>
                <h2 className="mt-3 text-2xl md:text-3xl font-bold text-slate-100">
                  Page not found
                </h2>
                <p className="mt-4 text-sm md:text-base leading-7 text-slate-400">
                  The page you are looking for does not exist, may have been
                  moved, or you may not have permission to access it from the
                  admin dashboard.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 rounded-2xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
                  >
                    <Home size={18} />
                    Go to Dashboard
                  </Link>

                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-700"
                  >
                    <ArrowLeft size={18} />
                    Products
                  </Link>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="relative flex h-72 w-72 items-center justify-center rounded-full border border-slate-800 bg-slate-950/80">
                  <div className="absolute h-56 w-56 rounded-full border border-dashed border-slate-700 animate-spin [animation-duration:12s]" />
                  <div className="absolute h-40 w-40 rounded-full border border-dashed border-red-500/30 animate-spin [animation-direction:reverse] [animation-duration:8s]" />
                  <div className="text-center">
                    <div className="text-6xl font-black text-red-500">404</div>
                    <p className="mt-2 text-sm text-slate-400">
                      Missing admin route
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-slate-800 pt-5 text-xs text-slate-500">
              Error Code: ADMIN_PAGE_NOT_FOUND
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
