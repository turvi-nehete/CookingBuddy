import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
import { getRecipes, searchRecipes, toggleFavorite } from "../api/recipes";

const categories = ["All", "Breakfast", "Dinner", "Healthy", "Dessert", "Indian", "Italian"];

function asList(data) {
  return Array.isArray(data) ? data : data?.results || [];
}

function Recipes() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [recipes, setRecipes] = useState([]);
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const filteredRecipes = useMemo(() => {
    if (activeCategory === "All") {
      return recipes;
    }

    return recipes.filter((recipe) => recipe.cuisine?.toLowerCase() === activeCategory.toLowerCase() || recipe.category?.toLowerCase() === activeCategory.toLowerCase());
  }, [activeCategory, recipes]);

  useEffect(() => {
    let isMounted = true;

    async function loadRecipes() {
      const query = searchParams.get("q");
      setLoading(true);
      setError("");

      try {
        const data = query ? await searchRecipes(query) : await getRecipes();
        if (isMounted) {
          setRecipes(asList(data));
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Could not load recipes.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadRecipes();

    return () => {
      isMounted = false;
    };
  }, [searchParams]);

  function handleSearch(query) {
    setSearchParams(query ? { q: query } : {});
    setActiveCategory("All");
  }

  async function handleFavorite(recipeId) {
    try {
      await toggleFavorite(recipeId);
      setRecipes((current) => current.map((recipe) => (recipe.id === recipeId ? { ...recipe, is_favorite: !recipe.is_favorite } : recipe)));
    } catch (err) {
      setError(err.message || "Could not update favorite.");
    }
  }

  return (
    <main className="page-shell bg-cream-50/30">
      <section className="section pt-10">
        <div className="section-heading font-heading">
          <span className="eyebrow">Recipe library</span>
          <h1 className="mt-2 font-bold text-cocoa-900">Find something lovely to cook.</h1>
        </div>
        <SearchBar onSearch={handleSearch} placeholder="Search by ingredient, title, or cuisine" />
      </section>

      <section className="section pt-0">
        <div className="flex gap-3.5 overflow-x-auto pb-4 pt-1 select-none scrollbar-none">
          {categories.map((category) => (
            <CategoryCard
              key={category}
              title={category}
              description={category === "All" ? "Everything" : `${category} mood`}
              active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            />
          ))}
        </div>

        {error ? <p className="error-banner mt-6">{error}</p> : null}
        {loading ? <LoadingSpinner label="Loading recipes" /> : null}

        {!loading && filteredRecipes.length === 0 ? (
          <div className="mt-10">
            <EmptyState title="No recipes found" message="Try another search or add a new recipe to your kitchen." />
          </div>
        ) : null}

        {!loading && filteredRecipes.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} onFavorite={handleFavorite} />
            ))}
          </div>
        ) : null}
      </section>
    </main>
  );
}

export default Recipes;