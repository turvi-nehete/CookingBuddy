import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import RecipeCard from "../components/RecipeCard";
import { useAuth } from "../context/AuthContext";
import { getFavorites, getRecipes } from "../api/recipes";

function asList(data) {
  return Array.isArray(data) ? data : data?.results || [];
}

function Profile() {
  const { user } = useAuth();
  const [created, setCreated] = useState([]);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getRecipes(), getFavorites()])
      .then(([recipesData, favoritesData]) => {
        const recipes = asList(recipesData);
        setCreated(recipes.filter((recipe) => recipe.owner === user?.id || recipe.user === user?.id || recipe.created_by === user?.id).slice(0, 3));
        setFavoritesCount(asList(favoritesData).length);
      })
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return <LoadingSpinner label="Preparing profile" />;
  }

  return (
    <main className="page-shell">
      <section className="section profile-grid">
        <div className="profile-card glass-panel">
          <div className="avatar">{(user?.name || user?.username || user?.email || "U").slice(0, 1).toUpperCase()}</div>
          <h1>{user?.name || user?.username || "CookBuddy Chef"}</h1>
          <p>{user?.email}</p>
          <Link to="/add-recipe" className="btn btn-primary mt-6">Add recipe</Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="stat-card"><strong>{created.length}</strong><span>Recipes shown</span></div>
          <div className="stat-card"><strong>{favoritesCount}</strong><span>Favorites</span></div>
          <div className="stat-card"><strong>JWT</strong><span>Protected session</span></div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="section-heading">
          <p className="eyebrow">Your recipes</p>
          <h2>Recently created</h2>
        </div>
        {created.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {created.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
          </div>
        ) : (
          <div className="content-card text-center">
            <p className="text-cocoa-500">No created recipes were returned yet.</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default Profile;