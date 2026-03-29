export default function LanguageTabs({ activeLang, setActiveLang }) {
  const langs = [
    { key: "en", label: "En" },
    { key: "ar", label: "Ar" },
    { key: "ku", label: "Ku" },
  ];

  return (
    <div className="mb-8 flex gap-2">
      {langs.map(lang => (
        <button
          key={lang.key}
          type="button"
          onClick={() => setActiveLang(lang.key)}
          className={`cursor-pointer w-full rounded-2xl px-4 py-2 font-medium transition ${
            activeLang === lang.key
              ? "border-slate-500 bg-slate-700 text-white opacity-100"
              : "border-slate-800 bg-slate-800/70 text-slate-300 opacity-40 hover:opacity-80"
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
