import { useNavigate } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import Hero from "../components/Hero";
import RecipeCard from "../components/RecipeCard";

const popularRecipes = [
  { id: "sample-1", title: "Sunny Veggie Noodles", cuisine: "Asian", cooking_time: 18, difficulty: "Easy" },
  { id: "sample-2", title: "Creamy Tomato Toast", cuisine: "Cafe", cooking_time: 12, difficulty: "Quick" },
  { id: "sample-3", title: "Minty Rice Bowl", cuisine: "Fresh", cooking_time: 25, difficulty: "Calm" },
];

const categories = [
  { title: "Breakfast", description: "Gentle starts", color: "bg-primary-100" },
  { title: "Dinner", description: "Cozy plates", color: "bg-sky-100" },
  { title: "Healthy", description: "Bright bowls", color: "bg-mint-100" },
  { title: "Dessert", description: "Tiny treats", color: "bg-yellow-100" },
];

function Home() {
  const navigate = useNavigate();

  function handleSearch(query) {
    navigate(query ? `/recipes?q=${encodeURIComponent(query)}` : "/recipes");
  }

  return (
    <>
      <Hero onSearch={handleSearch} />

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Popular picks</p>
          <h2>Recipes people reach for first</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {popularRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      <section className="section bg-white/60">
        <div className="section-heading">
          <p className="eyebrow">Categories</p>
          <h2>Choose your cooking mood</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.title} {...category} onClick={() => navigate(`/recipes?category=${category.title}`)} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Search smarter", "Find recipes by craving, cuisine, or whatever is left in the fridge."],
            ["Save favorites", "Keep your repeat meals close, beautifully organized, and ready."],
            ["Create recipes", "Add your own dishes with ingredients, steps, images, and timing."],
          ].map(([title, copy]) => (
            <div key={title} className="feature-card">
              <div className="feature-icon">{title.slice(0, 1)}</div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section pb-16">
        <div className="cta-panel">
          <p className="eyebrow">Ready when you are</p>
          <h2>Build your personal recipe library today.</h2>
          <button type="button" onClick={() => navigate("/register")} className="btn btn-primary btn-lg mt-6">
            Start cooking
          </button>
        </div>
      </section>
    </>
  );
}

export default Home;