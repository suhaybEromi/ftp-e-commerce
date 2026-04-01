import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  collectionDefaultValues,
  createCollectionSchema,
  updateCollectionSchema,
} from "../schema";
import collectionLocale from "../locale/collection";

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

  const previewUrl =
    imageFile instanceof File ? URL.createObjectURL(imageFile) : null;

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
                {errors.name.en.enmessage}
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
                {errors.name.ar.enmessage}
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
                {errors.name.ku.enmessage}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              {collectionLocale?.fields?.collectionImage}
            </label>
            <label className="block cursor-pointer rounded-3xl border-2 border-dashed border-slate-600 bg-slate-800/60 p-8 text-center transition hover:border-slate-500">
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
                    Upload collection image
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    PNG, JPG up to 5MB
                  </p>
                </div>

                {imageFile instanceof File && (
                  <p className="flex text-xs text-slate-300">
                    Selected:
                    <span className="text-green-500 ms-1">
                      {imageFile.name}
                    </span>
                  </p>
                )}
              </div>

              <input
                type="file"
                className="hidden"
                onChange={e => {
                  const file = e.target.files?.[0];
                  setValue("collectionImage", file, { shouldValidate: true });
                }}
              />
            </label>

            {errors?.collectionImage?.message && (
              <p className="mt-2 text-sm text-red-400">
                {errors.collectionImage.message}
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
                  alt="Sub Category preview"
                  className="w-40 h-40 object-contain border rounded-full border-slate-700"
                />
              </div>
            )}
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
