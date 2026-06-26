import { useNavigate } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import Hero from "../components/Hero";
import RecipeCard from "../components/RecipeCard";
import { SparklesDoodle, HeartDoodle, ChefHatDoodle } from "../components/Doodles";

const popularRecipes = [
  { id: "sample-1", title: "Sunny Veggie Noodles", cuisine: "Asian", cooking_time: 18, difficulty: "Easy" },
  { id: "sample-2", title: "Creamy Tomato Toast", cuisine: "Cafe", cooking_time: 12, difficulty: "Quick" },
  { id: "sample-3", title: "Minty Rice Bowl", cuisine: "Fresh", cooking_time: 25, difficulty: "Calm" },
];

const categories = [
  { title: "Breakfast", description: "Gentle starts" },
  { title: "Dinner", description: "Cozy plates" },
  { title: "Healthy", description: "Bright bowls" },
  { title: "Dessert", description: "Tiny treats" },
];

function Home() {
  const navigate = useNavigate();

  function handleSearch(query) {
    navigate(query ? `/recipes?q=${encodeURIComponent(query)}` : "/recipes");
  }

  const features = [
    {
      title: "Search smarter",
      copy: "Find recipes by craving, cuisine, or whatever is left in the fridge.",
      icon: SparklesDoodle,
    },
    {
      title: "Save favorites",
      copy: "Keep your repeat meals close, beautifully organized, and ready.",
      icon: HeartDoodle,
    },
    {
      title: "Create recipes",
      copy: "Add your own dishes with ingredients, steps, images, and timing.",
      icon: ChefHatDoodle,
    },
  ];

  return (
    <div className="bg-cream-50/20">
      <Hero onSearch={handleSearch} />

      <section className="section">
        <div className="section-heading font-heading">
          <span className="eyebrow">Popular picks</span>
          <h2 className="mt-2">Recipes people reach for first</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {popularRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      <section className="section bg-cream-100/40 border-y border-sage-200/20">
        <div className="section-heading font-heading">
          <span className="eyebrow">Categories</span>
          <h2 className="mt-2">Choose your cooking mood</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.title} {...category} onClick={() => navigate(`/recipes?category=${category.title}`)} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map(({ title, copy, icon: IconComponent }) => (
            <div key={title} className="feature-card flex flex-col items-start text-left">
              <div className="feature-icon">
                <IconComponent className="w-5 h-5 text-sage-500" />
              </div>
              <h3 className="font-heading font-semibold text-cocoa-900 mt-4 mb-2">{title}</h3>
              <p className="text-sm leading-relaxed text-cocoa-600 font-body">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section pb-20">
        <div className="cta-panel text-center">
          <span className="eyebrow mx-auto w-fit">Ready when you are</span>
          <h2 className="mt-4 font-heading font-bold text-cocoa-900">Build your personal recipe library today.</h2>
          <button type="button" onClick={() => navigate("/register")} className="btn btn-primary btn-lg mt-6 px-10 text-base shadow-md">
            Start cooking
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;