import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import { getRecipe, toggleFavorite } from "../api/recipes";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getRecipe(id)
      .then(setRecipe)
      .catch((err) => setError(err.message || "Recipe not found."))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleFavorite() {
    try {
      await toggleFavorite(recipe.id);
      setRecipe((current) => ({ ...current, is_favorite: !current.is_favorite }));
    } catch (err) {
      setError(err.message || "Could not update favorite.");
    }
  }

  if (loading) {
    return <LoadingSpinner label="Opening recipe" />;
  }

  if (error || !recipe) {
    return <main className="page-shell"><EmptyState title="Recipe unavailable" message={error || "This recipe could not be loaded."} /></main>;
  }

  const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : String(recipe.ingredients || "").split("\n").filter(Boolean);
  const instructions = Array.isArray(recipe.instructions) ? recipe.instructions : String(recipe.instructions || "").split("\n").filter(Boolean);

  return (
    <main className="page-shell">
      <section className="section recipe-detail-grid">
        <div className="detail-image">
          {recipe.image || recipe.image_url ? <img src={recipe.image || recipe.image_url} alt={recipe.title} /> : <span>dish</span>}
        </div>
        <div className="detail-panel">
          <Link to="/recipes" className="eyebrow">Back to recipes</Link>
          <h1>{recipe.title}</h1>
          <p className="text-cocoa-500">{recipe.description || "A comforting recipe saved in your CookBuddy kitchen."}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="stat-pill">{recipe.cuisine || "Comfort"}</span>
            <span className="stat-pill">{recipe.cooking_time || 30} min</span>
            <button type="button" onClick={handleFavorite} className="stat-pill">
              {recipe.is_favorite ? "Saved" : "Save favorite"}
            </button>
          </div>
        </div>
      </section>

      <section className="section grid gap-6 md:grid-cols-2">
        <div className="content-card">
          <h2>Ingredients</h2>
          <ul className="mt-4 space-y-3 text-cocoa-600">
            {ingredients.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="content-card">
          <h2>Instructions</h2>
          <ol className="mt-4 space-y-3 text-cocoa-600">
            {instructions.map((step) => <li key={step}>{step}</li>)}
          </ol>
        </div>
      </section>
    </main>
  );
}

export default RecipeDetails;