// import { Link } from "react-router-dom";
// import SearchBar from "./SearchBar";
// import { WhiskDoodle, SteamingBowlDoodle, MushroomDoodle, CarrotDoodle, SparklesDoodle, HeartDoodle, LeafDoodle } from "./Doodles";
// import heroImage from "../assets/hero-note.png";

// function Hero({ onSearch }) {
//   return (
//     <section className="relative overflow-hidden bg-cream-50 px-6 py-16 sm:px-8 lg:py-24">
//       {/* Decorative Pastel Doodles floating in background */}
//       <LeafDoodle className="doodle text-sage-300 w-12 h-12 left-10 top-12 rotate-[-15deg] doodle-float hidden md:block" style={{ animationDelay: "0.5s" }} />
//       <MushroomDoodle className="doodle text-pinky-500 w-10 h-10 right-16 top-16 rotate-[12deg] doodle-float hidden md:block" style={{ animationDelay: "1s" }} />
//       <CarrotDoodle className="doodle text-butter-500 w-12 h-12 left-[45%] bottom-8 rotate-[25deg] doodle-float hidden lg:block" style={{ animationDelay: "1.5s" }} />
//       <SparklesDoodle className="doodle text-lavender-500 w-8 h-8 right-[40%] top-10 rotate-[-5deg] doodle-float hidden md:block" />

//       <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
//         <div className="text-left z-10">
//           <span className="eyebrow flex items-center gap-1.5">
//             <SparklesDoodle className="w-3.5 h-3.5" /> AI-powered kitchen calm
//           </span>
//           <h1 className="mt-4 max-w-4xl text-5xl font-bold leading-tight tracking-tight text-cocoa-900 sm:text-6xl lg:text-7xl font-heading">
//             Find, Cook, Love <span className="relative inline-block text-accent-500">Repeat <HeartDoodle className="absolute -right-10 -top-3 w-8 h-8 text-accent-500 fill-accent-500/20 rotate-[15deg] floaty" /></span>
//           </h1>
//           <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cocoa-600">
//             Discover delicious recipes made for you. Search, save, and create recipes in a soft visual journal designed for peaceful cooking.
//           </p>

//           <div className="mt-8 max-w-2xl">
//             <SearchBar onSearch={onSearch} placeholder="Search pasta, breakfast bowls, desserts..." />
//           </div>

//           <div className="mt-8 flex flex-wrap gap-4">
//             <Link to="/recipes" className="btn btn-primary btn-lg px-8 text-base">
//               Explore recipes
//             </Link>
//             <Link to="/add-recipe" className="btn btn-secondary btn-lg px-8 text-base">
//               Add your first dish
//             </Link>
//           </div>
//         </div>

//         <div className="relative mx-auto w-full max-w-md lg:max-w-lg z-10">
//           {/* Aesthetic doodle sketch display */}
//           <div className="illustration-card bg-white border border-sage-200/60 rounded-[3rem] p-10 shadow-soft flex flex-col items-center justify-center min-h-[26rem] relative">
//             <div className="absolute top-8 left-8 bg-pinky-100 text-cocoa-800 text-xs px-3 py-1.5 rounded-full border border-pinky-200/80 rotate-[-8deg] font-heading font-medium">
//               cozy & simple
//             </div>
//             <div className="absolute bottom-8 right-8 bg-butter-100 text-cocoa-800 text-xs px-3 py-1.5 rounded-full border border-butter-200/80 rotate-[6deg] font-heading font-medium">
//               saved ❤️
//             </div>

//             {/* Chef hat floating above the whisk */}
//             <WhiskDoodle className="w-24 h-24 text-sage-500 doodle-float" />
//             <SteamingBowlDoodle className="w-28 h-28 text-cocoa-900 mt-2" />

//             <div className="mt-6 text-center">
//               <span className="font-heading font-semibold text-cocoa-900 block text-lg">Your Happy Kitchen Space</span>
//               <span className="text-cocoa-500 text-sm">Where good cravings become reality</span>
//             </div>

//             {/* Food doodles floating inside the card */}
//             <LeafDoodle className="w-6 h-6 text-sage-300 absolute right-16 top-16 rotate-12" />
//             <MushroomDoodle className="w-7 h-7 text-cocoa-400 absolute left-14 bottom-16 -rotate-12" />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Hero;


import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import {
  SparklesDoodle,
  HeartDoodle,
} from "./Doodles";
import heroImage from "../assets/hero-note.png";

function Hero({ onSearch }) {
  return (
    <section className="relative overflow-hidden bg-cream-50 px-6 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left Side */}
        <div className="text-left z-10">
          <span className="eyebrow flex items-center gap-2">
            <SparklesDoodle className="w-3.5 h-3.5" />
            AI-powered kitchen calm
          </span>

          <h1 className="mt-4 max-w-4xl text-5xl font-bold leading-tight tracking-tight text-cocoa-900 sm:text-6xl lg:text-7xl font-heading">
            Find, Cook, Love{" "}
            <span className="relative inline-block text-accent-500">
              Repeat
              <HeartDoodle
                fill="currentColor"
                className="absolute -right-10 -top-3 w-8 h-8 text-accent-500 rotate-[15deg]"
              />
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cocoa-600">
            Discover delicious recipes made for you. Search, save, and create
            recipes in a soft visual journal designed for peaceful cooking.
          </p>

          <div className="mt-8 max-w-2xl">
            <SearchBar
              onSearch={onSearch}
              placeholder="Search pasta, breakfast bowls, desserts..."
            />
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/recipes"
              className="btn btn-primary btn-lg px-8 text-base"
            >
              Explore recipes
            </Link>

            <Link
              to="/add-recipe"
              className="btn btn-secondary btn-lg px-8 text-base"
            >
              Add your first dish
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative mx-auto w-full max-w-xl z-10">
          {/* Little scrapbook labels */}
          {/* <div className="absolute -top-5 left-6 z-20 rounded-full border border-sage-200 bg-white px-4 py-2 text-xs font-heading shadow-sm rotate-[-6deg]">
            cozy & simple 🌿
          </div> */}

          {/* <div className="absolute -bottom-5 right-8 z-20 rounded-full border border-pinky-200 bg-white px-4 py-2 text-xs font-heading shadow-sm rotate-[5deg]">
            made with ❤️
          </div> */}

          {/* Notebook Image */}
          <div className="overflow-hidden rounded-[2.75rem] border border-sage-200/60 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <img
              src={heroImage}
              alt="CookBuddy inspiration"
              className="w-full object-cover"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;