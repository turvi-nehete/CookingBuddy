import { Link } from "react-router-dom";
import { HeartDoodle } from "./Doodles";

function RecipeCard({ recipe, onFavorite }) {
  const id = recipe.id || recipe.recipe_id;
  const title = recipe.title || recipe.name || "Untitled recipe";
  const image = recipe.image || recipe.image_url;
  const cuisine = recipe.cuisine || "Comfort";
  const cookingTime = recipe.cooking_time || recipe.cookingTime || recipe.time || "30";
  const difficulty = recipe.difficulty || "Easy";

  // Map categories/cuisines to custom Ghibli-inspired pastel colors
  const tagColorClass =
    cuisine.toLowerCase() === "asian" || cuisine.toLowerCase() === "indian"
      ? "bg-sage-100 text-sage-600"
      : cuisine.toLowerCase() === "cafe" || cuisine.toLowerCase() === "fresh"
      ? "bg-pinky-100 text-accent-600"
      : "bg-lavender-500/20 text-purple-600";

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-sage-200/50 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-cream-50 via-sage-100 to-pinky-100">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center text-5xl opacity-40 font-heading select-none text-cocoa-400">
            yum!
          </div>
        )}
        <button
          type="button"
          onClick={() => onFavorite?.(id)}
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 shadow-sm transition hover:scale-105 active:scale-95 focus:outline-none"
          aria-label={`Favorite ${title}`}
        >
          <HeartDoodle
              fill={(recipe.is_favorite || recipe.favorite) ? "currentColor" : "none"}
              className={`w-5 h-5 transition-all duration-200 ${
               recipe.is_favorite || recipe.favorite
                ? "text-red-500 scale-110"
                : "text-cocoa-400 hover:text-red-400"
           }`}
         />
        </button>
      </div>

      <div className="space-y-4 p-6 text-left">
        <div className="space-y-1.5">
          <span className={`inline-block rounded-lg px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider font-heading ${tagColorClass}`}>
            {cuisine}
          </span>
          <h3 className="line-clamp-2 text-lg font-bold text-cocoa-900 font-heading leading-snug">
            {title}
          </h3>
        </div>

        <div className="flex items-center justify-between text-xs font-semibold text-cocoa-500 font-heading">
          <span className="rounded-full bg-butter-500/20 text-amber-700 px-3 py-1">
            {cookingTime} min
          </span>
          <span className="rounded-full bg-lightblue-500/20 text-blue-700 px-3 py-1">
            {difficulty}
          </span>
        </div>

        <Link
          to={`/recipes/${id}`}
          className="btn btn-secondary w-full justify-center text-sm py-2 rounded-xl"
        >
          View recipe
        </Link>
      </div>
    </article>
  );
}

export default RecipeCard;