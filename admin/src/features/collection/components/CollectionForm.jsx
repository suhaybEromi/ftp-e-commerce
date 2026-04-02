import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  collectionDefaultValues,
  createCollectionSchema,
  updateCollectionSchema,
} from "../schema";
import collectionLocale from "../locale/collection";
import ImageDragDrop from "../../../components/form/ImageDragDrop";

export default function CollectionForm({
  initialValues,
  subCategories = [],
  onSubmit,
  loading,
  isEdit = false,
  onCancelEdit,
  activeLang,
}) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      isEdit ? updateCollectionSchema : createCollectionSchema,
    ),
    defaultValues: initialValues || collectionDefaultValues,
  });

  useEffect(() => {
    reset(
      initialValues || {
        ...collectionDefaultValues,
        collectionImage: undefined,
      },
    );
  }, [initialValues, reset]);

  const imageFile = watch("collectionImage");

  const isRTL = activeLang === "ar" || activeLang === "ku";

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div dir={isRTL ? "rtl" : "ltr"} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              {collectionLocale.fields.subCategory}
            </label>

            <select
              {...register("subCategory")}
              className="w-full rounded-3xl border border-slate-700 bg-slate-800 px-2 py-2
            text-white outline-0 transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700"
            >
              <option value={""}>Select sub category</option>
              {subCategories.map(subCategory => (
                <option key={subCategory._id} value={subCategory._id}>
                  {subCategory.name?.en}
                </option>
              ))}
            </select>

            {errors?.subCategory?.message && (
              <p className="mt-2 text-sm text-red-400">
                {errors.subCategory.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              {collectionLocale.fields.nameEn}
            </label>
            <input
              {...register("name.en")}
              type="text"
              className={`w-full rounded-3xl border border-slate-700 bg-slate-800 px-4 py-3 text-white
              outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700
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
              {collectionLocale.fields.nameAr}
            </label>
            <input
              {...register("name.ar")}
              type="text"
              className={`w-full rounded-3xl border border-slate-700 bg-slate-800 px-4 py-3 text-white
              outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700
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
              {collectionLocale.fields.nameKu}
            </label>
            <input
              {...register("name.ku")}
              type="text"
              className={`w-full rounded-3xl border border-slate-700 bg-slate-800 px-4 py-3 text-white
              outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-700
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
              label={collectionLocale.fields.collectionImage}
              value={imageFile}
              error={errors?.collectionImage?.message}
              currentImage={isEdit ? initialValues?.previewImage : ""}
              onChange={file => {
                setValue("collectionImage", file, {
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
                {collectionLocale.fields.isActive}
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
                  ? collectionLocale.actions.update
                  : collectionLocale.actions.create}
            </button>

            {isEdit && (
              <button
                type="button"
                onClick={onCancelEdit}
                className="rounded-2xl border border-slate-700 bg-slate-800 px-5 py-3
                text-sm font-medium text-white transition hover:bg-slate-700"
              >
                {collectionLocale.actions.cancel}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
