function EmptyState({ title = "Nothing here yet", message = "Start exploring and your saved items will appear here.", action }) {
  return (
    <div className="mx-auto max-w-xl rounded-[2rem] border border-dashed border-peach-300 bg-white/80 p-8 text-center shadow-soft">
      <div className="mx-auto mb-5 grid h-28 w-28 place-items-center rounded-[2rem] bg-gradient-to-br from-primary-100 to-sky-100 text-5xl">bowl</div>
      <h2 className="text-2xl font-black text-cocoa-900">{title}</h2>
      <p className="mt-3 text-cocoa-500">{message}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

export default EmptyState;