import { useState } from "react";
import LanguageTabs from "../../../components/modal/LanguageTabs";

export default function ProductForm({ activeLang, setActiveLang }) {
  const isRTL = activeLang === "ar" || activeLang === "ku";

  const [keywords, setKeywords] = useState([]);
  const [input, setInput] = useState("");

  const addKeyword = () => {
    const value = input.trim();
    if (!value || keywords.includes(value)) return;
    setKeywords(prev => [...prev, value]);
    setInput("");
  };

  const removeKeyword = item => {
    setKeywords(prev => prev.filter(k => k !== item));
  };

  const handleKeyDown = e => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addKeyword();
    }
  };

  return (
    <div>
      <LanguageTabs activeLang={activeLang} setActiveLang={setActiveLang} />

      <div
        dir={isRTL ? "rtl" : "ltr"}
        className="grid grid-cols-1 gap-5 md:grid-cols-2"
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Item Code
          </label>
          <input
            type="text"
            placeholder="Enter item code"
            className={`w-full rounded-3xl border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder:text-slate-500 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700 ${
              isRTL ? "text-right" : "text-left"
            }`}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Product Name
          </label>
          <input
            type="text"
            placeholder="Enter product name"
            className={`w-full rounded-3xl border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder:text-slate-500 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700 ${
              isRTL ? "text-right" : "text-left"
            }`}
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Description
          </label>
          <textarea
            rows={7}
            placeholder="Write product description"
            className={`w-full resize-none rounded-3xl border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder:text-slate-500 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700 ${
              isRTL ? "text-right" : "text-left"
            }`}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Category
          </label>
          <select
            className="w-full rounded-3xl border border-slate-700 bg-slate-800 px-4 py-2
          text-white outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700"
          >
            <option>Select category</option>
            <option>Fashion</option>
            <option>Electronics</option>
            <option>Beauty</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Brand
          </label>
          <select className="w-full rounded-3xl border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700">
            <option>Select brand</option>
            <option>Nike</option>
            <option>Apple</option>
            <option>Zara</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Price
          </label>
          <input
            type="number"
            placeholder="Enter price"
            className="w-full rounded-3xl border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder:text-slate-500 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Discount Price
          </label>
          <input
            type="number"
            placeholder="Enter discount price"
            className="w-full rounded-3xl border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder:text-slate-500 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Keywords
          </label>

          <div
            className="flex flex-wrap items-center gap-2 rounded-3xl border border-slate-700
            bg-slate-800 px-3 py-3 focus-within:border-slate-500 focus-within:ring-2 focus-within:ring-slate-700"
          >
            {/* Keywords */}
            {keywords.map(item => (
              <span
                key={item}
                className="flex items-center gap-1 rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-200"
              >
                {item}
                <button onClick={() => removeKeyword(item)}>✕</button>
              </span>
            ))}

            {/* Input */}
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={addKeyword}
              placeholder="Write product keywords..."
              className={`flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 outline-none ${
                isRTL ? "text-right" : "text-left"
              }`}
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Stock
          </label>
          <select className="w-full rounded-3xl border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700">
            <option>Select stock</option>
            <option>In Stock</option>
            <option>Out Stock</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Color
          </label>
          <input
            type="text"
            placeholder="Enter color"
            className="w-full rounded-3xl border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder:text-slate-500 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Product Image
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
                  Upload product image
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  PNG, JPG up to 5MB
                </p>
              </div>
            </div>

            <input type="file" className="hidden" />
          </label>
        </div>
      </div>
    </div>
  );
}
