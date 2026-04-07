import { useEffect, useState } from "react";
import productLocale from "../locale/product";
import ImageDragDrop from "../../../components/form/ImageDragDrop";
import { useForm } from "react-hook-form";
import {
  createProductSchema,
  productDefaultValues,
  updateProductSchema,
} from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ProductForm({
  initialValues,
  collections = [],
  brands = [],
  onSubmit,
  loading,
  isEdit = false,
  onCancelEdit,
  activeLang,
}) {
  const defaultValues = productDefaultValues(initialValues);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isEdit ? updateProductSchema : createProductSchema),
    defaultValues,
  });

  useEffect(() => {
    register("keyword");
  }, [register]);

  useEffect(() => {
    const values = productDefaultValues(initialValues);
    reset(values);
    setKeywords(values.keyword || []);
  }, [initialValues, reset]);

  const isRTL = activeLang === "ar" || activeLang === "ku";
  const stockStatus = watch("stockStatus");
  const productImage = watch("productImage");
  const existingImages = watch("existingImages");

  const [keywords, setKeywords] = useState(defaultValues.keyword || []);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (stockStatus === "out_of_stock") {
      setValue("stockQuantity", 0, {
        shouldValidate: false,
        shouldDirty: true,
      });
    }

    if (stockStatus === "") {
      setValue("stockQuantity", "", {
        shouldValidate: false,
        shouldDirty: false,
      });
    }
  }, [stockStatus, setValue]);

  const addKeyword = async () => {
    const value = input.trim().toLowerCase();
    if (!value || keywords.includes(value)) return;

    const updated = [...keywords, value];

    setKeywords(updated);
    setInput("");

    setValue("keyword", updated, {
      shouldValidate: true,
      shouldDirty: true,
    });

    await trigger("keyword");
  };

  const removeKeyword = async item => {
    const updated = keywords.filter(k => k !== item);

    setKeywords(updated);

    setValue("keyword", updated, {
      shouldValidate: true,
      shouldDirty: true,
    });

    await trigger("keyword");
  };

  const handleKeyDown = e => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addKeyword();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          dir={isRTL ? "rtl" : "ltr"}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 space-y-5"
        >
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">
                  {productLocale.fields.itemCode}
                </label>
                <input
                  {...register("itemCode")}
                  type="text"
                  placeholder="Item Code"
                  className={`w-full rounded-3xl border border-slate-700 placeholder:text-slate-600 bg-slate-800 px-3 py-2 text-white outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700
                  ${isRTL ? "text-right" : "text-left"}`}
                />
                {errors?.itemCode?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.itemCode.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className={`mb-1 block text-sm font-medium text-slate-300
                  ${isRTL ? "text-right" : "text-left"}`}
                >
                  {productLocale.fields.color}
                </label>
                <input
                  {...register("color.en")}
                  type="text"
                  placeholder="Color"
                  className={`w-full rounded-3xl border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder:text-slate-500 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700
                  ${isRTL ? "text-right" : "text-left"}`}
                />
                {errors?.color?.en?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.color.en.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">
                  {productLocale.fields.nameEn}
                </label>
                <input
                  {...register("name.en")}
                  type="text"
                  placeholder="English"
                  className={`w-full rounded-3xl border border-slate-700 placeholder:text-slate-600 bg-slate-800 px-3 py-2 text-white outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700
                  ${isRTL ? "text-right" : "text-left"}`}
                />
                {errors?.name?.en?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.name.en.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className={`mb-1 block text-sm font-medium text-slate-300
                  ${isRTL ? "text-left" : "text-right"}`}
                >
                  {productLocale.fields.nameAr}
                </label>
                <input
                  {...register("name.ar")}
                  type="text"
                  placeholder="عربي"
                  className={`w-full rounded-3xl border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none placeholder:text-slate-500 transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700
                  ${isRTL ? "text-left" : "text-right"}`}
                />
                {errors?.name?.ar?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.name.ar.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className={`mb-1 block text-sm font-medium text-slate-300
                  ${isRTL ? "text-left" : "text-right"}`}
                >
                  {productLocale.fields.nameKu}
                </label>
                <input
                  {...register("name.ku")}
                  type="text"
                  placeholder="کوردی"
                  className={`w-full rounded-3xl border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder:text-slate-500 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700
                  ${isRTL ? "text-left" : "text-right"}`}
                />
                {errors?.name?.ku?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.name.ku.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">
                  {productLocale.fields.descriptionEn}
                </label>
                <textarea
                  {...register("description.en")}
                  rows={7}
                  placeholder="English"
                  className={`w-full resize-none rounded-3xl border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder:text-slate-500 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700
                  ${isRTL ? "text-right" : "text-left"}`}
                />
                {errors?.description?.en?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.description.en.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className={`mb-1 block text-sm font-medium text-slate-300
                  ${isRTL ? "text-left" : "text-right"}`}
                >
                  {productLocale.fields.descriptionAr}
                </label>
                <textarea
                  {...register("description.ar")}
                  rows={7}
                  placeholder="عربي"
                  className={`w-full resize-none rounded-3xl border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder:text-slate-500 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700
                  ${isRTL ? "text-left" : "text-right"}`}
                />
                {errors?.description?.ar?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.description.ar.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className={`mb-1 block text-sm font-medium text-slate-300
                  ${isRTL ? "text-left" : "text-right"}`}
                >
                  {productLocale.fields.descriptionKu}
                </label>
                <textarea
                  {...register("description.ku")}
                  rows={7}
                  placeholder="کوردی"
                  className={`w-full resize-none rounded-3xl border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder:text-slate-500 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700
                  ${isRTL ? "text-left" : "text-right"}`}
                />
                {errors?.description?.ku?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.description.ku.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  {productLocale.fields.collectionName}
                </label>
                <select
                  {...register("collectionName")}
                  className="w-full rounded-3xl border border-slate-700 bg-slate-800 px-4 py-2 text-white outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700"
                >
                  <option value="">Select collection</option>
                  {collections.map(collection => (
                    <option key={collection._id} value={collection._id}>
                      {collection.name?.en}
                    </option>
                  ))}
                </select>
                {errors?.collectionName?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.collectionName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  {productLocale.fields.brand}
                </label>
                <select
                  {...register("brand")}
                  className="w-full rounded-3xl border border-slate-700 bg-slate-800 px-4 py-2 text-white outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700"
                >
                  <option value="">Select brand</option>
                  {brands.map(brand => (
                    <option key={brand._id} value={brand._id}>
                      {brand.name?.en}
                    </option>
                  ))}
                </select>
                {errors?.brand?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.brand.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  {productLocale.fields.stock}
                </label>
                <select
                  {...register("stockStatus")}
                  className="w-full rounded-3xl border border-slate-700 bg-slate-800 px-4 py-2 text-white outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700"
                >
                  <option value="">Select stock</option>
                  <option value="in_stock">In Stock</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
                {errors?.stockStatus?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.stockStatus.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  {productLocale.fields.size}
                </label>
                <select
                  {...register("size")}
                  className="w-full rounded-3xl border border-slate-700 bg-slate-800 px-4 py-2 text-white outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700"
                >
                  <option value="">Select size</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
                {errors?.size?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.size.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {stockStatus === "in_stock" && (
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">
                {productLocale.fields.stockQuantity}
              </label>
              <input
                {...register("stockQuantity")}
                type="number"
                placeholder="Stock Quantity"
                className={`w-full rounded-3xl border border-slate-700 placeholder:text-slate-600 bg-slate-800 px-3 py-2 text-white outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700
                ${isRTL ? "text-right" : "text-left"}`}
              />
              {errors?.stockQuantity?.message && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.stockQuantity.message}
                </p>
              )}
            </div>
          )}

          <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">
                  {productLocale.fields.price}
                </label>
                <input
                  {...register("price")}
                  type="number"
                  placeholder="Price"
                  className={`w-full rounded-3xl border border-slate-700 placeholder:text-slate-600 bg-slate-800 px-3 py-2 text-white outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700
                  ${isRTL ? "text-right" : "text-left"}`}
                />
                {errors?.price?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className={`mb-1 block text-sm font-medium text-slate-300
                  ${isRTL ? "text-right" : "text-left"}`}
                >
                  {productLocale.fields.discountPrice}
                </label>
                <input
                  {...register("discountPrice")}
                  type="number"
                  placeholder="Discount Price"
                  className={`w-full rounded-3xl border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none placeholder:text-slate-500 transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700
                  ${isRTL ? "text-right" : "text-left"}`}
                />
                {errors?.discountPrice?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.discountPrice.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className={`mb-1 block text-sm font-medium text-slate-300
                  ${isRTL ? "text-right" : "text-left"}`}
                >
                  {productLocale.fields.keywords}
                </label>
                <div className="flex flex-wrap items-center gap-2 rounded-3xl border border-slate-700 bg-slate-800 px-3 py-3 focus-within:border-slate-500 focus-within:ring-2 focus-within:ring-slate-700">
                  {keywords.map(item => (
                    <span
                      key={item}
                      className="flex items-center gap-1 rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-200"
                    >
                      {item}
                      <button type="button" onClick={() => removeKeyword(item)}>
                        ✕
                      </button>
                    </span>
                  ))}

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
                {errors?.keyword?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.keyword.message}
                  </p>
                )}
              </div>

              <div>
                <div
                  className="flex items-center justify-between rounded-3xl
                  border border-slate-800 bg-slate-950 px-4 py-2 mt-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-white">
                      {productLocale.fields.isActive}
                    </label>
                    <p className="mt-1 text-xs text-slate-400">
                      Enable this product
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    {...register("isActive")}
                    className="h-5 w-5 accent-white"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <ImageDragDrop
              label={productLocale.fields.productImage}
              value={productImage?.[0] || null}
              currentImage={
                isEdit && initialValues?.existingImages?.[0]?.url
                  ? `${import.meta.env.VITE_API_URL_IMG}${initialValues.existingImages[0].url}`
                  : ""
              }
              onChange={file =>
                setValue("productImage", file ? [file] : [], {
                  shouldValidate: true,
                })
              }
              error={
                errors?.productImage?.message ||
                errors?.productImage?.[0]?.message
              }
            />
          </div>

          <div className="md:col-span-2 flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer bg-gray-100 text-black px-5 py-3 rounded-2xl"
            >
              {loading
                ? "Saving..."
                : isEdit
                  ? productLocale.actions.update
                  : productLocale.actions.create}
            </button>

            {isEdit && (
              <button
                type="button"
                onClick={onCancelEdit}
                className="cursor-pointer rounded-2xl bg-slate-800 hover:bg-slate-900 px-5 py-2 text-white"
              >
                {productLocale.actions.cancel}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
