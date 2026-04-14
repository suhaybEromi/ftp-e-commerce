import { Pencil, Trash2 } from "lucide-react";
import productLocale from "../locale/product";
import Spinner from "../../../components/form/Spinner";

const classTitle =
  "px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400";

export default function ProductTable({
  products,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  if (products === null) {
    return <Spinner />;
  }

  if (products.length === 0) {
    return (
      <div className="flex min-h-62.5 items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-950/40">
        <p className="text-center text-2xl font-bold text-slate-400">
          {productLocale?.empty || "No products found"}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-800">
          <thead className="bg-slate-950/80">
            <tr>
              <th className={classTitle}>Product</th>
              <th className={classTitle}>Item Code</th>
              <th className={classTitle}>Price</th>
              <th className={classTitle}>Discount</th>
              <th className={classTitle}>Stock</th>
              <th className={classTitle}>Active</th>
              <th className={classTitle}>Status</th>
              <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800 bg-slate-900/40">
            {products.map(product => {
              const firstImage = product?.variants?.[0]?.images?.[0]?.url || "";

              return (
                <tr
                  key={product._id}
                  className="transition hover:bg-slate-800/60"
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={`${import.meta.env.VITE_API_URL_IMG}${firstImage}`}
                        alt={product?.name?.en || "Product"}
                        className="h-14 w-14 rounded-2xl border border-slate-700 object-cover"
                      />

                      <div className="min-w-0 max-w-50">
                        <p className="truncate font-semibold text-white">
                          {product?.name?.en || "No name"}
                        </p>

                        <p className="mt-1 truncate text-xs text-slate-400">
                          {product?.brand?.name?.en ||
                            product?.brand?.name ||
                            "No brand"}
                        </p>

                        <p className="mt-1 truncate text-xs text-slate-500">
                          {product?.collectionName?.name?.en ||
                            product?.collectionName?.name ||
                            "No collection"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-300">
                    {product?.itemCode || "-"}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-white">
                    {product?.price ?? 0}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-sm text-red-400">
                    {product?.discountPrice ?? 0}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-300">
                    {product?.stockQuantity ?? 0}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4">
                    {product?.isActive ? (
                      <span className="inline-flex rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
                        Inactive
                      </span>
                    )}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4">
                    <select
                      value={product?.status || "pending"}
                      onChange={e =>
                        onStatusChange(product._id, e.target.value)
                      }
                      className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none"
                    >
                      <option value="pending">⌛ Pending</option>
                      <option value="approved">✅ Approved</option>
                      <option value="rejected">❌ Rejected</option>
                    </select>
                  </td>

                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onEdit(product)}
                        className="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-sm font-medium text-blue-400 transition hover:bg-blue-500/20"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => onDelete(product._id)}
                        className="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/20"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
