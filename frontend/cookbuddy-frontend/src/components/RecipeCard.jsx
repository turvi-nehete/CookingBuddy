import { Link } from "react-router-dom";

function RecipeCard({ recipe, onFavorite }) {
  const id = recipe.id || recipe.recipe_id;
  const title = recipe.title || recipe.name || "Untitled recipe";
  const image = recipe.image || recipe.image_url;
  const cuisine = recipe.cuisine || "Comfort";
  const cookingTime = recipe.cooking_time || recipe.cookingTime || recipe.time || "30";

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-peach-200 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-primary-100 via-cream-100 to-mint-100">
        {image ? (
          <img src={image} alt={title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="grid h-full place-items-center text-6xl">meal</div>
        )}
        <button
          type="button"
          onClick={() => onFavorite?.(id)}
          className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-xl shadow-soft transition hover:scale-105"
          aria-label={`Favorite ${title}`}
        >
          {recipe.is_favorite || recipe.favorite ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="space-y-4 p-5 text-left">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-accent-600">{cuisine}</p>
          <h3 className="mt-1 line-clamp-2 text-xl font-black text-cocoa-900">{title}</h3>
        </div>

        <div className="flex items-center justify-between text-sm font-semibold text-cocoa-500">
          <span className="rounded-full bg-cream-100 px-3 py-1">{cookingTime} min</span>
          <span>{recipe.difficulty || "Easy"}</span>
        </div>

        <Link to={`/recipes/${id}`} className="btn btn-secondary w-full justify-center">
          View recipe
        </Link>
      </div>
    </article>
  );
}

export default RecipeCard;