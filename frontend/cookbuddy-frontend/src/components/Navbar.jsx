import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ChefHatDoodle } from "./Doodles";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Recipes", to: "/recipes" },
  { label: "Saved", to: "/favorites", protected: true },
  { label: "Add Recipe", to: "/add-recipe", protected: true },
  { label: "Profile", to: "/profile", protected: true },
];

function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-sage-200/55 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
        <Link to="/" className="flex items-center gap-2 rounded-full focus-ring group">
          <ChefHatDoodle className="w-8 h-8 text-sage-500 transition duration-300 group-hover:rotate-[-8deg] group-hover:scale-105" />
          <span className="block text-xl font-bold tracking-tight text-cocoa-900 font-heading">
            CookingBuddy
          </span>
        </Link>

        <div className="hidden items-center gap-1.5 rounded-2xl bg-sage-100/50 p-1 md:flex">
          {navItems
            .filter((item) => !item.protected || isAuthenticated)
            .map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `nav-pill ${isActive ? "nav-pill-active bg-white shadow-sm" : ""}`
                }
              >
                {item.label}
              </NavLink>
            ))}
        </div>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <button
              type="button"
              onClick={logout}
              className="btn btn-ghost hover:text-accent-600 font-heading text-sm"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost font-heading text-sm">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary hidden sm:inline-flex text-sm px-5 py-2">
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