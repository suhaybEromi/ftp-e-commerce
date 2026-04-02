import { useForm } from "react-hook-form";
import categoryLocale from "../locale/category";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect } from "react";
import {
  categoryDefaultValues,
  createCategorySchema,
  updateCategorySchema,
} from "../schema";
import ImageDragDrop from "../../../components/form/ImageDragDrop";

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
          <ImageDragDrop
            label={categoryLocale.fields.categoryImage}
            value={imageFile}
            error={errors?.categoryImage?.message}
            currentImage={isEdit ? initialValues?.previewImage : ""}
            onChange={file => {
              setValue("categoryImage", file, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
              });
            }}
          />
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
