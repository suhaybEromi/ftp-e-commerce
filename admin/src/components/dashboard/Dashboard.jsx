import {
  FiShoppingBag,
  FiClock,
  FiRefreshCw,
  FiCheckCircle,
} from "react-icons/fi";
import VisitorWebsite from "./VisitorWebsite";

const stats = [
  {
    title: "Total Orders",
    value: "164",
    icon: <FiShoppingBag />,
  },
  {
    title: "Pending",
    value: "16",
    icon: <FiClock />,
  },
  {
    title: "Processing",
    value: "104",
    icon: <FiRefreshCw />,
  },
  {
    title: "Delivered",
    value: "125",
    icon: <FiCheckCircle />,
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen p-2">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white">Dashboard</h2>
        <p className="mt-2 text-sm text-slate-400">
          Welcome back. Here’s an overview of your orders.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-slate-700"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">
                  {item.title}
                </p>
                <h3 className="mt-3 text-3xl font-bold text-white">
                  {item.value}
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-xl text-slate-200">
                {item.icon}
              </div>
            </div>

            <div className="mt-6 h-2 w-full rounded-full bg-slate-800">
              <div className="h-2 w-2/3 rounded-full bg-white"></div>
            </div>
          </div>
        ))}
      </div>
      <div className="my-8 ms-2">
        <VisitorWebsite />
      </div>
    </div>
  );
}
