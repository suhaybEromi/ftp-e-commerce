import { useState } from "react";
import productLocale from "../locale/product";
import ImageDragDrop from "../../../components/form/ImageDragDrop";

export default function ProductForm({ activeLang }) {
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
      <form>
        <div
          dir={isRTL ? "rtl" : "ltr"}
          className="grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {/* Item Code */}
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">
                  {productLocale.fields.itemCode}
                </label>
                <input
                  type="text"
                  placeholder="Item Code"
                  className={`w-full rounded-3xl border border-slate-700 placeholder:text-slate-600 bg-slate-800 px-3 py-2
                  text-white outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700
                  ${isRTL ? "text-right" : "text-left"}`}
                />
              </div>

              {/* Sku */}
              <div>
                <label
                  className={`mb-1 block text-sm font-medium text-slate-300
                  ${isRTL ? "text-right" : "text-left"}`}
                >
                  {productLocale.fields.sku}
                </label>
                <input
                  type="text"
                  placeholder="Sku"
                  className={`w-full rounded-3xl border border-slate-700 bg-slate-800 px-3 py-2
                  text-white outline-none placeholder:text-slate-500 transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700
                  ${isRTL ? "text-right" : "text-left"}`}
                />
              </div>

              {/* Color */}
              <div>
                <label
                  className={`mb-1 block text-sm font-medium text-slate-300
                ${isRTL ? "text-right" : "text-left"}`}
                >
                  {productLocale.fields.color}
                </label>
                <input
                  type="text"
                  placeholder="Color"
                  className={`w-full rounded-3xl border border-slate-700 bg-slate-800 px-3 py-2
                  text-white placeholder:text-slate-500 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700
                  ${isRTL ? "text-right" : "text-left"}`}
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {/* Name EN */}
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">
                  {productLocale.fields.nameEn}
                </label>
                <input
                  type="text"
                  placeholder="English"
                  className={`w-full rounded-3xl border border-slate-700 placeholder:text-slate-600 bg-slate-800 px-3 py-2
                  text-white outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700
                  ${isRTL ? "text-right" : "text-left"}`}
                />
              </div>

              {/* Name AR */}
              <div>
                <label
                  className={`mb-1 block text-sm font-medium text-slate-300
                  ${isRTL ? "text-left" : "text-right"}`}
                >
                  {productLocale.fields.nameAr}
                </label>
                <input
                  type="text"
                  placeholder="عربي"
                  className={`w-full rounded-3xl border border-slate-700 bg-slate-800 px-3 py-2
                  text-white outline-none placeholder:text-slate-500 transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700
                  ${isRTL ? "text-left" : "text-right"}`}
                />
              </div>

              {/* Name KU */}
              <div>
                <label
                  className={`mb-1 block text-sm font-medium text-slate-300
                ${isRTL ? "text-left" : "text-right"}`}
                >
                  {productLocale.fields.nameKu}
                </label>
                <input
                  type="text"
                  placeholder="کوردی"
                  className={`w-full rounded-3xl border border-slate-700 bg-slate-800 px-3 py-2
                  text-white placeholder:text-slate-500 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700
                  ${isRTL ? "text-left" : "text-right"}`}
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {/* Description EN */}
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">
                  {productLocale.fields.descriptionEn}
                </label>
                <textarea
                  rows={7}
                  placeholder="English"
                  className={`w-full resize-none rounded-3xl border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder:text-slate-500 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                />
              </div>

              {/* Description AR */}
              <div>
                <label
                  className={`mb-1 block text-sm font-medium text-slate-300
                  ${isRTL ? "text-left" : "text-right"}`}
                >
                  {productLocale.fields.descriptionAr}
                </label>
                <textarea
                  rows={7}
                  placeholder="عربي"
                  className={`w-full resize-none rounded-3xl border border-slate-700 bg-slate-800 px-3 py-2
                  text-white placeholder:text-slate-500 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700
                  ${isRTL ? "text-left" : "text-right"}`}
                />
              </div>

              {/* Description KU */}
              <div>
                <label
                  className={`mb-1 block text-sm font-medium text-slate-300
                ${isRTL ? "text-left" : "text-right"}`}
                >
                  {productLocale.fields.descriptionKu}
                </label>
                <textarea
                  rows={7}
                  placeholder="کوردی"
                  className={`w-full resize-none rounded-3xl border border-slate-700 bg-slate-800 px-3 py-2
                  text-white placeholder:text-slate-500 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700
                  ${isRTL ? "text-left" : "text-right"}`}
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
              {/* Collection */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  {productLocale.fields.collection}
                </label>
                <select
                  className="w-full rounded-3xl border border-slate-700 bg-slate-800 px-4 py-2
                text-white outline-none transition focus:border-slate-500 focus:ring-2
                focus:ring-slate-700"
                >
                  <option>Select collection</option>
                  <option>Fashion</option>
                  <option>Electronics</option>
                </select>
              </div>

              {/* Brand */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  {productLocale.fields.brand}
                </label>
                <select
                  className="w-full rounded-3xl border border-slate-700 bg-slate-800 px-4 py-2
                text-white outline-none transition focus:border-slate-500 focus:ring-2
                focus:ring-slate-700"
                >
                  <option>Select brand</option>
                  <option>Apple</option>
                  <option>Samsung</option>
                </select>
              </div>

              {/* Stock */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  {productLocale.fields.stock}
                </label>
                <select
                  className="w-full rounded-3xl border border-slate-700 bg-slate-800 px-4 py-2
                text-white outline-none transition focus:border-slate-500 focus:ring-2
                focus:ring-slate-700"
                >
                  <option>Select stock</option>
                  <option>In Stock</option>
                  <option>Out Stock</option>
                </select>
              </div>

              {/* Size */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  {productLocale.fields.size}
                </label>
                <select
                  className="w-full rounded-3xl border border-slate-700 bg-slate-800 px-4 py-2
                text-white outline-none transition focus:border-slate-500 focus:ring-2
                focus:ring-slate-700"
                >
                  <option>Select size</option>
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </select>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {/* Price */}
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">
                  {productLocale.fields.price}
                </label>
                <input
                  type="number"
                  placeholder="Price"
                  className={`w-full rounded-3xl border border-slate-700 placeholder:text-slate-600
                  bg-slate-800 px-3 py-2 text-white outline-none transition focus:border-slate-500
                  focus:ring-2 focus:ring-slate-700
                  ${isRTL ? "text-right" : "text-left"}`}
                />
              </div>

              {/* Discount Price */}
              <div>
                <label
                  className={`mb-1 block text-sm font-medium text-slate-300
                  ${isRTL ? "text-right" : "text-left"}`}
                >
                  {productLocale.fields.discountPrice}
                </label>
                <input
                  type="number"
                  placeholder="Discount Price"
                  className={`w-full rounded-3xl border border-slate-700 bg-slate-800 px-3 py-2 text-white
                  outline-none placeholder:text-slate-500 transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700
                  ${isRTL ? "text-right" : "text-left"}`}
                />
              </div>

              {/* Keywords */}
              <div>
                <label
                  className={`mb-1 block text-sm font-medium text-slate-300
                ${isRTL ? "text-right" : "text-left"}`}
                >
                  {productLocale.fields.keywords}
                </label>
                <div
                  className="flex flex-wrap items-center gap-2 rounded-3xl border border-slate-700
                bg-slate-800 px-3 py-3 focus-within:border-slate-500 focus-within:ring-2
                focus-within:ring-slate-700"
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
                    className={`flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 outline-none
                    ${isRTL ? "text-right" : "text-left"}`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
              isFeatured
              <div>
                <label className="block text-sm font-medium text-white">
                  {productLocale.fields.featured}
                </label>
                <div
                  className="flex items-center justify-between rounded-3xl
                  border border-slate-800 bg-slate-950 px-3 py-3"
                >
                  <label className="block text-sm font-medium text-white">
                    {productLocale.fields.featured}
                  </label>
                  <input type="checkbox" className="h-5 w-5 accent-white" />
                </div>
              </div>

              <div>
                <label
                  className={`mb-1 block text-sm font-medium text-slate-300
                  ${isRTL ? "text-right" : "text-left"}`}
                >
                  {productLocale.fields.rating}
                </label>
                <input
                  type="number"
                  placeholder="Rating"
                  className={`w-full rounded-3xl border border-slate-700 bg-slate-800 px-3 py-2 text-white
                  outline-none placeholder:text-slate-500 transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700
                  ${isRTL ? "text-right" : "text-left"}`}
                />
              </div>

              <div>
                <label
                  className={`mb-1 block text-sm font-medium text-slate-300
                  ${isRTL ? "text-right" : "text-left"}`}
                >
                  {productLocale.fields.points}
                </label>
                <input
                  type="number"
                  placeholder="Points"
                  className={`w-full rounded-3xl border border-slate-700 bg-slate-800 px-3 py-2 text-white
                  outline-none placeholder:text-slate-500 transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700
                  ${isRTL ? "text-right" : "text-left"}`}
                />
              </div>

              <div>
                <label
                  className={`mb-1 block text-sm font-medium text-slate-300
                  ${isRTL ? "text-right" : "text-left"}`}
                >
                  {productLocale.fields.cashBack}
                </label>
                <input
                  type="number"
                  placeholder="CashBack"
                  className={`w-full rounded-3xl border border-slate-700 bg-slate-800 px-3 py-2 text-white
                  outline-none placeholder:text-slate-500 transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700
                  ${isRTL ? "text-right" : "text-left"}`}
                />
              </div>
            </div>
          </div> */}

          <div className="md:col-span-2">
            <ImageDragDrop label={productLocale.fields.productImage} />

            {/* <label className="mb-2 block text-sm font-medium text-slate-300">
              Product Image
            </label>
            <label className="block cursor-pointer rounded-3xl border-2 border-dashed border-slate-600 bg-slate-800/60 p-8 text-center transition hover:border-slate-500">
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-700/70">
                  <svg
                    className="h-6 w-6 text-slate-300"
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
                    PNG, JPG, JPEG, WEBP, JFIF up to 5MB
                  </p>
                </div>
              </div>

              <input type="file" className="hidden" />
            </label> */}
          </div>
        </div>
      </form>
    </div>
  );
}
