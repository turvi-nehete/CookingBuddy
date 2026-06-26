import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import RecipeCard from "../components/RecipeCard";
import { getFavorites, toggleFavorite } from "../api/recipes";

function asList(data) {
  return Array.isArray(data) ? data : data?.results || [];
}

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getFavorites()
      .then((data) => setFavorites(asList(data)))
      .catch((err) => setError(err.message || "Could not load favorites."))
      .finally(() => setLoading(false));
  }, []);

  async function handleFavorite(recipeId) {
    await toggleFavorite(recipeId);
    setFavorites((current) => current.filter((recipe) => recipe.id !== recipeId));
  }

  return (
    <main className="page-shell">
      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Saved recipes</p>
          <h1>Your favorite little meals.</h1>
        </div>

        {error ? <p className="error-banner">{error}</p> : null}
        {loading ? <LoadingSpinner label="Loading favorites" /> : null}

        {!loading && favorites.length === 0 ? (
          <EmptyState
            title="No favorites yet"
            message="Tap the heart on any recipe and it will appear here."
            action={<Link to="/recipes" className="btn btn-primary">Browse recipes</Link>}
          />
        ) : null}

        {!loading && favorites.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((recipe) => <RecipeCard key={recipe.id} recipe={{ ...recipe, is_favorite: true }} onFavorite={handleFavorite} />)}
          </div>
        ) : null}
      </section>
    </main>
  );
}

export default Favorites;