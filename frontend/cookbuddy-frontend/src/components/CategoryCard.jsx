import {
  SunDoodle,
  SteamingBowlDoodle,
  PlateDoodle,
  CakeDoodle,
  LeafDoodle,
  ClockDoodle,
  ChefHatDoodle,
} from "./Doodles";

const iconMap = {
  breakfast: { icon: SunDoodle, bg: "bg-butter-500/20", text: "text-amber-600" },
  lunch: { icon: SteamingBowlDoodle, bg: "bg-pinky-500/20", text: "text-accent-600" },
  dinner: { icon: PlateDoodle, bg: "bg-sage-500/20", text: "text-sage-600" },
  dessert: { icon: CakeDoodle, bg: "bg-pinky-500/20", text: "text-pink-600" },
  desserts: { icon: CakeDoodle, bg: "bg-pinky-500/20", text: "text-pink-600" },
  healthy: { icon: LeafDoodle, bg: "bg-sage-500/20", text: "text-sage-600" },
  quick: { icon: ClockDoodle, bg: "bg-lightblue-500/20", text: "text-blue-600" },
};

function CategoryCard({ title, description, onClick, active }) {
  const normalized = title.toLowerCase();
  const config = iconMap[normalized] || { icon: ChefHatDoodle, bg: "bg-lavender-500/20", text: "text-purple-600" };
  const IconComponent = config.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`category-card border border-sage-200/60 rounded-2xl bg-white p-3.5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-sage-500 flex items-center gap-3.5 ${
        active ? "category-card-active border-sage-500 bg-sage-100/40" : ""
      }`}
    >
      <span className={`grid h-12 w-12 place-items-center rounded-2xl ${config.bg} ${config.text}`}>
        <IconComponent className="w-6 h-6" />
      </span>
      <span className="text-left font-heading">
        <span className="block font-semibold text-cocoa-900 text-sm">{title}</span>
        <span className="text-xs text-cocoa-500 font-body font-normal">{description}</span>
      </span>
    </button>
  );
}

export default CategoryCard;