function LoadingSpinner({ label = "Loading" }) {
  return (
    <div className="grid min-h-[45vh] place-items-center px-4 text-center">
      <div>
        <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-primary-100 border-t-accent-500" />
        <p className="mt-4 font-bold text-cocoa-600">{label}...</p>
      </div>
    </div>
  );
}

export default LoadingSpinner;