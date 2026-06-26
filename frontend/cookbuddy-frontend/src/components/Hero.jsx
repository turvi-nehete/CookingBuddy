import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function Hero({ onSearch }) {
  return (
    <section className="relative overflow-hidden bg-hero px-4 py-14 sm:px-6 lg:px-8">
      <div className="doodle doodle-one" />
      <div className="doodle doodle-two" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="text-left">
          <p className="eyebrow">AI-powered kitchen calm</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black leading-tight tracking-tight text-cocoa-950 sm:text-6xl lg:text-7xl">
            Turn hungry ideas into happy little recipes.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-cocoa-600">
            Search, save, and create recipes in a soft workspace designed for real cooking days, not spreadsheet energy.
          </p>

          <div className="mt-8 max-w-2xl">
            <SearchBar onSearch={onSearch} placeholder="Search pasta, paneer, brunch bowls..." />
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/recipes" className="btn btn-primary btn-lg">
              Explore recipes
            </Link>
            <Link to="/add-recipe" className="btn btn-secondary btn-lg">
              Add your first dish
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div className="illustration-card floaty">
            <div className="pan-face">:)</div>
            <div className="steam steam-a" />
            <div className="steam steam-b" />
            <div className="plate">
              <span className="food-dot bg-accent-500" />
              <span className="food-dot bg-mint-400" />
              <span className="food-dot bg-sky-300" />
              <span className="noodle-line" />
            </div>
            <div className="tiny-card top-8 left-4 rotate-[-8deg]">20 min</div>
            <div className="tiny-card bottom-8 right-1 rotate-[7deg]">saved</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;