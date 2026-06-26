function CategoryCard({ title, description, color = "bg-primary-100", onClick, active }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`category-card ${active ? "category-card-active" : ""}`}
    >
      <span className={`grid h-14 w-14 place-items-center rounded-3xl ${color} text-2xl shadow-inner-soft`}>{title.slice(0, 2)}</span>
      <span className="text-left">
        <span className="block font-black text-cocoa-900">{title}</span>
        <span className="text-sm text-cocoa-500">{description}</span>
      </span>
    </button>
  );
}

export default CategoryCard;