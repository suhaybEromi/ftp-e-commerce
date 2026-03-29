import LanguageTabs from "../../../components/modal/LanguageTabs";

export default function CategoryForm({ activeLang, setActiveLang }) {
  const isRTL = activeLang === "ar" || activeLang === "ku";

  return (
    <div>
      <LanguageTabs activeLang={activeLang} setActiveLang={setActiveLang} />

      <div dir={isRTL ? "rtl" : "ltr"} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Category
          </label>
          <select
            className="w-full rounded-3xl border border-slate-700 bg-slate-800 px-2 py-2
          text-white outline-0 transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700"
          >
            <option>Select category</option>
            <option>Fashion</option>
            <option>Electronics</option>
            <option>home Appliances</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Language
          </label>
          <input
            type="text"
            placeholder="Enter sub category name"
            className={`w-full rounded-3xl border border-slate-700 bg-slate-800 px-2 py-2 text-white placeholder:text-slate-500 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700 ${
              isRTL ? "text-right" : "text-left"
            }`}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Sub Category Image
          </label>
          <label className="block cursor-pointer rounded-3xl border-2 border-dashed border-slate-600 bg-slate-800/60 p-8 text-center transition hover:border-slate-500">
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-2xl bg-slate-700/70">
                <svg
                  className="h-4 w-4 text-slate-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5V17a2 2 0 002 2h14a2 2 0 002-2v-.5M16 8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
              </div>

              <div>
                <p className="text-sm font-medium text-white">
                  Upload sub category image
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  PNG, JPG up to 5MB
                </p>
              </div>
            </div>

            <input type="file" className="hidden" />
          </label>
        </div>

        <div className="flex items-center justify-between rounded-3xl border border-slate-800 bg-slate-950 px-4 py-4">
          <div>
            <label className="block text-sm font-medium text-white">
              Active Sub Category
            </label>
            <p className="mt-1 text-xs text-slate-400">
              Show this Sub category in store
            </p>
          </div>

          <button
            type="button"
            className="relative h-7 w-12 rounded-full bg-slate-700 transition"
          >
            <span className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
