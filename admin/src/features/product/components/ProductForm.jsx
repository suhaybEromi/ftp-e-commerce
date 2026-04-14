import { useEffect, useState } from "react";
import productLocale from "../locale/product";
import ImageDragDrop from "../../../components/form/ImageDragDrop";
import { useFieldArray, useForm } from "react-hook-form";
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
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isEdit ? updateProductSchema : createProductSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
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

  const [keywords, setKeywords] = useState(defaultValues.keyword || []);
  const [input, setInput] = useState("");

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
          className="grid grid-cols-1 gap-5 md:grid-cols-2 space-y-4"
        >
          {/* Item Code */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">
                  {productLocale.fields.itemCode}
                </label>
                <input
                  {...register("itemCode")}
                  type="text"
                  placeholder="Item Code"
                  className={`w-full rounded-3xl border border-slate-700 placeholder:text-slate-600 bg-slate-800 px-3 py-2 text-white outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                />
                {errors?.itemCode?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.itemCode.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">
                  {productLocale.fields.nameEn}
                </label>
                <input
                  {...register("name.en")}
                  type="text"
                  placeholder="English"
                  className={`w-full rounded-3xl border border-slate-700 placeholder:text-slate-600 bg-slate-800 px-3 py-2 text-white outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                />
                {errors?.name?.en?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.name.en.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className={`mb-1 block text-sm font-medium text-slate-300 ${
                    isRTL ? "text-left" : "text-right"
                  }`}
                >
                  {productLocale.fields.nameAr}
                </label>
                <input
                  {...register("name.ar")}
                  type="text"
                  placeholder="عربي"
                  className={`w-full rounded-3xl border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none placeholder:text-slate-500 transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700 ${
                    isRTL ? "text-left" : "text-right"
                  }`}
                />
                {errors?.name?.ar?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.name.ar.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className={`mb-1 block text-sm font-medium text-slate-300 ${
                    isRTL ? "text-left" : "text-right"
                  }`}
                >
                  {productLocale.fields.nameKu}
                </label>
                <input
                  {...register("name.ku")}
                  type="text"
                  placeholder="کوردی"
                  className={`w-full rounded-3xl border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder:text-slate-500 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700 ${
                    isRTL ? "text-left" : "text-right"
                  }`}
                />
                {errors?.name?.ku?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.name.ku.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Name */}
          {/* <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">
                  {productLocale.fields.nameEn}
                </label>
                <input
                  {...register("name.en")}
                  type="text"
                  placeholder="English"
                  className={`w-full rounded-3xl border border-slate-700 placeholder:text-slate-600 bg-slate-800 px-3 py-2 text-white outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                />
                {errors?.name?.en?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.name.en.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className={`mb-1 block text-sm font-medium text-slate-300 ${
                    isRTL ? "text-left" : "text-right"
                  }`}
                >
                  {productLocale.fields.nameAr}
                </label>
                <input
                  {...register("name.ar")}
                  type="text"
                  placeholder="عربي"
                  className={`w-full rounded-3xl border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none placeholder:text-slate-500 transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700 ${
                    isRTL ? "text-left" : "text-right"
                  }`}
                />
                {errors?.name?.ar?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.name.ar.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className={`mb-1 block text-sm font-medium text-slate-300 ${
                    isRTL ? "text-left" : "text-right"
                  }`}
                >
                  {productLocale.fields.nameKu}
                </label>
                <input
                  {...register("name.ku")}
                  type="text"
                  placeholder="کوردی"
                  className={`w-full rounded-3xl border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder:text-slate-500 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700 ${
                    isRTL ? "text-left" : "text-right"
                  }`}
                />
                {errors?.name?.ku?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.name.ku.message}
                  </p>
                )}
              </div>
            </div>
          </div> */}

          {/* Description */}
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
                  className={`w-full resize-none rounded-3xl border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder:text-slate-500 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                />
                {errors?.description?.en?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.description.en.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className={`mb-1 block text-sm font-medium text-slate-300 ${
                    isRTL ? "text-left" : "text-right"
                  }`}
                >
                  {productLocale.fields.descriptionAr}
                </label>
                <textarea
                  {...register("description.ar")}
                  rows={7}
                  placeholder="عربي"
                  className={`w-full resize-none rounded-3xl border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder:text-slate-500 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700 ${
                    isRTL ? "text-left" : "text-right"
                  }`}
                />
                {errors?.description?.ar?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.description.ar.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className={`mb-1 block text-sm font-medium text-slate-300 ${
                    isRTL ? "text-left" : "text-right"
                  }`}
                >
                  {productLocale.fields.descriptionKu}
                </label>
                <textarea
                  {...register("description.ku")}
                  rows={7}
                  placeholder="کوردی"
                  className={`w-full resize-none rounded-3xl border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder:text-slate-500 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700 ${
                    isRTL ? "text-left" : "text-right"
                  }`}
                />
                {errors?.description?.ku?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.description.ku.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Selects */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
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

          {/* Price */}
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
                  className={`w-full rounded-3xl border border-slate-700 placeholder:text-slate-600 bg-slate-800 px-3 py-2 text-white outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                />
                {errors?.price?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className={`mb-1 block text-sm font-medium text-slate-300 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {productLocale.fields.discountPrice}
                </label>
                <input
                  {...register("discountPrice")}
                  type="number"
                  placeholder="Discount Price"
                  className={`w-full rounded-3xl border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none placeholder:text-slate-500 transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                />
                {errors?.discountPrice?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.discountPrice.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Keywords + Active */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <label
                  className={`mb-1 block text-sm font-medium text-slate-300 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
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
                    className={`flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 outline-none ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  />
                </div>
                {errors?.keyword?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.keyword.message}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between rounded-3xl border border-slate-800 bg-slate-950 px-4 py-2 mt-4.5">
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

          {/* Warranty */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">
                  {productLocale.fields.warranty.duration}
                </label>
                <input
                  {...register("warranty.duration")}
                  type="number"
                  placeholder="Duration"
                  className={`w-full rounded-3xl border border-slate-700 placeholder:text-slate-600 bg-slate-800
                  px-3 py-2 text-white outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700
                  ${isRTL ? "text-right" : "text-left"}`}
                />
                {errors?.warranty?.duration?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.warranty.duration.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  {productLocale.fields.warranty.value}
                </label>
                <select
                  {...register("warranty.unit")}
                  className="w-full rounded-3xl border border-slate-700 bg-slate-800 px-4 py-2 text-white outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700"
                >
                  <option value="">Select Warranty</option>
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                  <option value="years">Years</option>
                </select>
                {errors?.warranty?.unit?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.warranty.unit.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-300">
                  {productLocale.fields.warranty.description}
                </label>
                <textarea
                  {...register("warranty.description")}
                  rows={4}
                  placeholder="Description"
                  className={`w-full resize-none rounded-3xl border border-slate-700 bg-slate-800
                  px-3 py-2 text-white placeholder:text-slate-500 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700
                  ${isRTL ? "text-right" : "text-left"}`}
                />
                {errors?.warranty?.description?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.warranty.description.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Variants */}
          <div className="md:col-span-2">
            {fields.map((field, index) => {
              const variantStockStatus = watch(`variants.${index}.stockStatus`);
              const variantImages = watch(`variants.${index}.images`);
              const existingImages =
                watch(`variants.${index}.existingImages`) || [];

              return (
                <div
                  key={field.id}
                  className="mb-5 rounded-3xl border border-slate-800 bg-slate-900/50 p-5 shadow-sm"
                >
                  <div className="mb-5 flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <h4 className="text-base font-semibold text-white">
                        Option {index + 1}
                      </h4>
                      <p className="mt-1 text-sm text-slate-400">
                        Configure {productLocale.fields.color} ,
                        {productLocale.fields.stockStatus} ,
                        {productLocale.fields.productImage}
                      </p>
                    </div>

                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="inline-flex items-center rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/20"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-slate-300">
                        {productLocale.fields.color}
                      </label>
                      <input
                        {...register(`variants.${index}.color.en`)}
                        type="text"
                        placeholder="Color"
                        className="w-full rounded-2xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-white"
                      />
                      {errors?.variants?.[index]?.color?.en?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.variants[index].color.en.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300">
                        {productLocale.fields.stockStatus}
                      </label>
                      <select
                        {...register(`variants.${index}.stockStatus`)}
                        className="w-full rounded-2xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-white"
                      >
                        <option value="">Select stock</option>
                        <option value="in_stock">In Stock</option>
                        <option value="out_of_stock">Out of Stock</option>
                      </select>
                      {errors?.variants?.[index]?.stockStatus?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.variants[index].stockStatus.message}
                        </p>
                      )}
                    </div>

                    {variantStockStatus === "in_stock" && (
                      <div>
                        <label className="block text-sm font-medium text-slate-300">
                          {productLocale.fields.stockQuantity}
                        </label>
                        <input
                          {...register(`variants.${index}.stockQuantity`)}
                          type="number"
                          placeholder="Stock Quantity"
                          className="w-full rounded-2xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-white"
                        />
                        {errors?.variants?.[index]?.stockQuantity?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.variants[index].stockQuantity.message}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="md:col-span-2 rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
                      <ImageDragDrop
                        label={`Variant ${index + 1} Images`}
                        value={variantImages || []}
                        currentImages={(existingImages || []).map(
                          img =>
                            `${import.meta.env.VITE_API_URL_IMG}${img.url}`,
                        )}
                        multiple
                        onChange={files =>
                          setValue(`variants.${index}.images`, files || [], {
                            shouldValidate: true,
                            shouldDirty: true,
                          })
                        }
                        error={
                          errors?.variants?.[index]?.images?.message ||
                          errors?.variants?.[index]?.images?.[0]?.message
                        }
                        previewClassName="h-28 w-28 rounded-xl object-cover border border-slate-700"
                      />
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="flex items-center justify-end rounded-3xl px-5 py-4">
              <button
                type="button"
                onClick={() =>
                  append({
                    color: { en: "", ar: "", ku: "" },
                    stockStatus: "in_stock",
                    stockQuantity: "",
                    images: [],
                    existingImages: [],
                  })
                }
                className="cursor-pointer inline-flex items-center rounded-2xl bg-white
                px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
              >
                Add Option
              </button>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 flex gap-3 my-5">
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
      </form>
    </div>
  );
}
