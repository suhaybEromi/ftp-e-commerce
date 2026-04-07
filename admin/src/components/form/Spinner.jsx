export default function Spinner() {
  return (
    <div className="flex min-h-75 items-center justify-center">
      <div className="flex min-h-75 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-500" />
      </div>
    </div>
  );
}
