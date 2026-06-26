function Footer() {
  return (
    <footer className="border-t border-peach-200 bg-white/70">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 text-sm text-cocoa-500 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-lg font-black text-cocoa-900">CookBuddy AI</p>
          <p className="mt-2 max-w-md">A cozy recipe workspace for planning, saving, and sharing meals with less friction.</p>
        </div>
        <div>
          <p className="font-bold text-cocoa-800">Explore</p>
          <p className="mt-2">Recipes · Favorites · Add Recipe</p>
        </div>
        <div>
          <p className="font-bold text-cocoa-800">Made for</p>
          <p className="mt-2">Home cooks, busy students, and internship-ready portfolios.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;