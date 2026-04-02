export default function ModalDesign({
  open,
  onClose,
  title,
  children,
  size = "lg",
}) {
  if (!open) return null;

  // custom size between modal design.
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-xl",
    xl: "max-w-3xl",
    xxl: "max-w-5xl",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className={`w-full ${sizeClasses[size]} rounded-3xl border border-slate-800 bg-slate-900 text-white shadow-2xl`}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-4 py-4">
          <div>
            <h2 className="text-2xl font-semibold">{title}</h2>
          </div>

          <button
            onClick={onClose}
            className="cursor-pointer rounded-xl px-3 py-2 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            Close
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[60vh] overflow-y-auto px-5 py-5">{children}</div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-800 px-6 py-5">
          <button
            onClick={onClose}
            className="cursor-pointer rounded-2xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
