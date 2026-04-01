import { useForm } from "react-hook-form";
import categoryLocale from "../locale/category";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect } from "react";
import {
  categoryDefaultValues,
  createCategorySchema,
  updateCategorySchema,
} from "../schema";

const CategoryForm = ({
  initialValues,
  onSubmit,
  loading,
  isEdit = false,
  onCancelEdit,
  activeLang,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isEdit ? updateCategorySchema : createCategorySchema),
    defaultValues: initialValues || categoryDefaultValues,
  });

  useEffect(() => {
    reset(
      initialValues || { ...categoryDefaultValues, categoryImage: undefined },
    );
  }, [initialValues, reset]);

  const imageFile = watch("categoryImage");

  const previewUrl =
    imageFile instanceof File ? URL.createObjectURL(imageFile) : null;

  const isRTL = activeLang === "ar" || activeLang === "ku";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl rounded-3xl p-2 shadow-xl"
    >
      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            {categoryLocale.fields.nameEn}
          </label>

          <input
            {...register("name.en")}
            className={`w-full rounded-3xl border border-slate-700 bg-slate-800
            px-4 py-3 text-white placeholder:text-slate-500 outline-none transition
            focus:border-slate-500 focus:ring-2 focus:ring-slate-700 
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
            className={`mb-2 block text-sm font-medium text-slate-300
            ${isRTL ? "text-left" : "text-right"}`}
          >
            {categoryLocale.fields.nameAr}
          </label>
          <input
            {...register("name.ar")}
            className={`w-full rounded-3xl border border-slate-700 bg-slate-800
            px-4 py-3 text-white placeholder:text-slate-500 outline-none transition
            focus:border-slate-500 focus:ring-2 focus:ring-slate-700
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
            className={`mb-2 block text-sm font-medium text-slate-300
          ${isRTL ? "text-left" : "text-right"}`}
          >
            {categoryLocale.fields.nameKu}
          </label>
          <input
            {...register("name.ku")}
            className={`w-full rounded-3xl border border-slate-700 bg-slate-800 px-4
            py-3 text-white placeholder:text-slate-500 outline-none transition
            focus:border-slate-500 focus:ring-2 focus:ring-slate-700
            ${isRTL ? "text-left" : "text-right"}`}
          />
          {errors?.name?.ku?.message && (
            <p className="mt-2 text-sm text-red-400">
              {errors.name.ku.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            {categoryLocale.fields.categoryImage}
          </label>

          <label
            className="block cursor-pointer rounded-3xl border-2 border-dashed
            border-slate-600 bg-slate-800/60 p-8 text-center transition hover:border-slate-500"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-700/70">
                <svg
                  className="h-5 w-5 text-slate-300"
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
                  Upload brand logo
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  PNG, JPG, JPEG, WEBP
                </p>
              </div>

              {imageFile instanceof File && (
                <p className="flex text-xs text-slate-300">
                  Selected:
                  <span className="text-green-500 ms-1">{imageFile.name}</span>
                </p>
              )}
            </div>

            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp,image/jfif"
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0];
                setValue("categoryImage", file, { shouldValidate: true });
              }}
            />
          </label>

          {errors?.categoryImage?.message && (
            <p className="mt-2 text-sm text-red-400">
              {errors.categoryImage.message}
            </p>
          )}

          {/* NOTE If upload image display image(for add). */}
          {previewUrl && (
            <div className="my-4">
              <img
                src={previewUrl}
                className="w-45 h-45 object-contain border rounded-full border-slate-700"
              />
            </div>
          )}

          {/* NOTE If upload image display image(for edit). */}
          {isEdit && initialValues?.previewImage && !imageFile && (
            <div className="mt-4">
              <p className="mb-2 text-sm text-slate-400">Current image</p>
              <img
                src={initialValues.previewImage}
                alt="Category preview"
                className="w-40 h-40 object-contain border rounded-full border-slate-700"
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between rounded-3xl border border-slate-800 bg-slate-950 px-4 py-4">
          <div>
            <label className="block text-sm font-medium text-white">
              {categoryLocale.fields.isActive}
            </label>
            <p className="mt-1 text-xs text-slate-400">Enable this brand</p>
          </div>

          <input
            {...register("isActive")}
            type="checkbox"
            className="h-5 w-5 accent-white"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer rounded-2xl bg-white px-5 py-3 text-sm font-medium
            text-slate-900 transition hover:bg-slate-200 disabled:cursor-not-allowed
            disabled:opacity-60"
          >
            {loading
              ? "Saving"
              : isEdit
                ? categoryLocale.actions.update
                : categoryLocale.actions.create}
          </button>

          {isEdit && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="rounded-2xl border border-slate-700 bg-slate-800 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              {categoryLocale.actions.cancel}
            </button>
          )}
        </div>
      </div>
    </form>
  );
};
export default CategoryForm;
