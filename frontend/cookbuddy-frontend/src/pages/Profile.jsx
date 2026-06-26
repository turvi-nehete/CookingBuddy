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
    <main className="page-shell bg-cream-50/30">
      <section className="section profile-grid">
        <div className="profile-card bg-white border border-sage-200/50 flex flex-col items-center text-center p-8">
          <div className="avatar select-none">{(user?.name || user?.username || user?.email || "U").slice(0, 1).toUpperCase()}</div>
          <h1 className="mt-4 font-heading font-semibold text-cocoa-900">{user?.name || user?.username || "CookBuddy Chef"}</h1>
          <p className="text-sm text-cocoa-500 mt-1 font-body">{user?.email}</p>
          <Link to="/add-recipe" className="btn btn-primary mt-6 w-full justify-center shadow-sm">Add recipe</Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 font-heading">
          <div className="stat-card border border-sage-200/50 bg-white p-6 rounded-2xl">
            <strong>{created.length}</strong>
            <span className="text-cocoa-500 text-sm font-semibold">Recipes shown</span>
          </div>
          <div className="stat-card border border-sage-200/50 bg-white p-6 rounded-2xl">
            <strong>{favoritesCount}</strong>
            <span className="text-cocoa-500 text-sm font-semibold">Favorites</span>
          </div>
          <div className="stat-card border border-sage-200/50 bg-white p-6 rounded-2xl">
            <strong className="text-sage-500">JWT</strong>
            <span className="text-cocoa-500 text-sm font-semibold">Secure session</span>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="section-heading font-heading">
          <span className="eyebrow">Your recipes</span>
          <h2 className="mt-2 text-cocoa-900">Recently created</h2>
        </div>
        {created.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {created.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
          </div>
        ) : (
          <div className="content-card border border-sage-200/50 bg-white text-center p-10 rounded-2xl">
            <p className="text-cocoa-500 font-body">No created recipes found. Get started by writing a new one!</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default Profile;