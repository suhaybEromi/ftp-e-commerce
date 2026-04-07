import { useEffect, useMemo, useState } from "react";

export default function ImageDragDrop({
  value,
  onChange,
  error,
  label = "Upload image",
  accept = "image/png,image/jpeg,image/jpg,image/webp,image/jfif,image/gif",
  helperText = "PNG, JPG, JPEG, WEBP, JFIF, GIF",
  currentImage = "",
  currentImages = [],
  multiple = false,
  rounded = "rounded-3xl",
  previewClassName = "h-40 w-40 rounded-full object-contain border border-slate-700",
}) {
  const [dragActive, setDragActive] = useState(false);

  const allowedImages = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/jfif",
    "image/gif",
  ];

  const normalizedValue = useMemo(() => {
    if (multiple) {
      return Array.isArray(value) ? value : [];
    }
    return value instanceof File ? value : null;
  }, [value, multiple]);

  const previewUrls = useMemo(() => {
    if (multiple) {
      return normalizedValue.map(file => URL.createObjectURL(file));
    }

    if (normalizedValue instanceof File) {
      return [URL.createObjectURL(normalizedValue)];
    }

    return [];
  }, [normalizedValue, multiple]);

  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const handleFileSelect = files => {
    if (!files || files.length === 0) return;

    const validFiles = Array.from(files).filter(file =>
      allowedImages.includes(file.type),
    );

    if (multiple) {
      onChange(validFiles);
    } else {
      onChange(validFiles[0] || null);
    }
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

    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  const currentImagesList = multiple
    ? Array.isArray(currentImages)
      ? currentImages
      : []
    : currentImage
      ? [currentImage]
      : [];

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
              {multiple
                ? "Drag and drop images here"
                : "Drag and drop image here"}
            </p>
            <p className="mt-1 text-xs text-slate-400">or click to browse</p>
            <p className="mt-1 text-xs text-slate-400">{helperText}</p>
          </div>

          {multiple
            ? Array.isArray(normalizedValue) &&
              normalizedValue.length > 0 && (
                <p className="flex text-xs text-slate-300">
                  Selected:
                  <span className="ms-1 text-green-500">
                    {normalizedValue.length} file(s)
                  </span>
                </p>
              )
            : normalizedValue instanceof File && (
                <p className="flex text-xs text-slate-300">
                  Selected:
                  <span className="ms-1 text-green-500">
                    {normalizedValue.name}
                  </span>
                </p>
              )}
        </div>

        <input
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={e => {
            handleFileSelect(e.target.files);
          }}
        />
      </label>

      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}

      {/* New uploaded image previews */}
      {previewUrls.length > 0 && (
        <div className="my-4">
          <p className="mb-2 text-sm text-slate-400">
            {multiple ? "Selected images" : "Selected image"}
          </p>

          <div className="flex flex-wrap gap-3">
            {previewUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Preview ${index + 1}`}
                className={previewClassName}
              />
            ))}
          </div>
        </div>
      )}

      {/* Existing image previews for edit */}
      {previewUrls.length === 0 && currentImagesList.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-sm text-slate-400">
            {multiple ? "Current images" : "Current image"}
          </p>

          <div className="flex flex-wrap gap-3">
            {currentImagesList.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Current ${index + 1}`}
                className={previewClassName}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
