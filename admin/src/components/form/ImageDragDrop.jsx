import { useEffect, useMemo, useState } from "react";

export default function ImageDragDrop({
  value,
  onChange,
  error,
  label = "Upload image",
  accept = "image/png,image/jpeg,image/jpg,image/webp,image/jfif",
  helperText = "PNG, JPG, JPEG, WEBP, JFIF",
  currentImage = "",
  rounded = "rounded-3xl",
  previewClassName = "h-40 w-40 rounded-full object-contain border border-slate-700",
}) {
  const [dragActive, setDragActive] = useState(false);

  const previewUrl = useMemo(() => {
    if (value instanceof File) {
      return URL.createObjectURL(value);
    }
    return null;
  }, [value]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const allowedImages = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/jfif",
  ];

  const handleFileSelect = file => {
    if (!file) return;
    if (!allowedImages.includes(file.type)) return;
    onChange(file);
  };

  const handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = e => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    handleFileSelect(file);
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>
      <label
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`block cursor-pointer border-2 border-dashed bg-slate-800/60 p-8 text-center transition
        ${rounded} ${
          dragActive
            ? "border-green-500 bg-slate-800"
            : "border-slate-600 hover:border-slate-500"
        }`}
      >
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
              Drag and drop image here
            </p>
            <p className="mt-1 text-xs text-slate-400">or click to browse</p>
            <p className="mt-1 text-xs text-slate-400">{helperText}</p>
          </div>

          {value instanceof File && (
            <p className="flex text-xs text-slate-300">
              Selected:
              <span className="ms-1 text-green-500">{value.name}</span>
            </p>
          )}
        </div>

        <input
          type="file"
          accept={accept}
          className="hidden"
          onChange={e => {
            const file = e.target.files?.[0];
            handleFileSelect(file);
          }}
        />
      </label>
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}

      {/* NOTE If upload image display image(for add). */}
      {previewUrl && (
        <div className="my-4">
          <img src={previewUrl} alt="Preview" className={previewClassName} />
        </div>
      )}

      {/* NOTE If upload image display image(for edit). */}
      {!previewUrl && currentImage && (
        <div className="mt-4">
          <p className="mb-2 text-sm text-slate-400">Current image</p>
          <img src={currentImage} alt="Current" className={previewClassName} />
        </div>
      )}
    </div>
  );
}
