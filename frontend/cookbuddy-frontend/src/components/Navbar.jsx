import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Recipes", to: "/recipes" },
  { label: "Favorites", to: "/favorites", protected: true },
  { label: "Add Recipe", to: "/add-recipe", protected: true },
  { label: "Profile", to: "/profile", protected: true },
];

function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-peach-200/70 bg-cream-50/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 rounded-full focus-ring">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-300 text-2xl shadow-soft">CB</span>
          <span>
            <span className="block text-lg font-black tracking-tight text-cocoa-900">CookBuddy AI</span>
            <span className="hidden text-xs font-semibold text-cocoa-500 sm:block">recipes with a little sparkle</span>
          </span>
        </Link>

        <div className="hidden items-center gap-2 rounded-full bg-white/75 p-1 shadow-soft md:flex">
          {navItems
            .filter((item) => !item.protected || isAuthenticated)
            .map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-pill ${isActive ? "nav-pill-active" : ""}`}>
                {item.label}
              </NavLink>
            ))}
        </div>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <button type="button" onClick={logout} className="btn btn-ghost">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary hidden sm:inline-flex">
                Join free
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;