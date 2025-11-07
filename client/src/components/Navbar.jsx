import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import {
  FitnessIcon,
  ChartIcon,
  WeightLiftingIcon,
  FlowerIcon,
  CheckIcon,
  ErrorIcon,
  CloseIcon,
} from "./icons/Icons";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const NavLink = ({ to, icon: Icon, children, onClick, variant = "default", onNavigate }) => {
    const active = isActive(to);
    const Component = onClick ? "button" : Link;
    const props = onClick 
      ? { onClick } 
      : { 
          to, 
          onClick: () => {
            if (onNavigate) onNavigate();
          }
        };

    const getClassName = () => {
      if (variant === "primary") {
        return "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/30 hover:from-pink-600 hover:to-purple-600 hover:scale-105";
      }
      if (active) {
        return "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/30 scale-105";
      }
      return "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-pink-600 dark:hover:text-pink-400";
    };

    return (
      <Component {...props} className={getClassName()}>
        {Icon && <Icon className={`w-4 h-4 ${active || variant === "primary" ? "text-white" : ""}`} />}
        <span>{children}</span>
      </Component>
    );
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-80 transition group"
          >
            <div className="relative">
              <img
                src="/wallfit-logo.png"
                alt="W.ALLfit Logo"
                className="h-10 w-10 object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              W.ALLfit
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink to="/" icon={FitnessIcon}>
              Home
            </NavLink>

            {token ? (
              <>
                <NavLink to="/dashboard" icon={ChartIcon}>
                  Dashboard
                </NavLink>
                <NavLink to="/program" icon={WeightLiftingIcon}>
                  Programs
                </NavLink>
                <NavLink to="/community" icon={FlowerIcon}>
                  Community
                </NavLink>
                <NavLink to="/profile" icon={CheckIcon}>
                  Profile
                </NavLink>
                <NavLink
                  icon={ErrorIcon}
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                  }}
                >
                  Logout
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/login">
                  Login
                </NavLink>
                <NavLink to="/register">
                  Register
                </NavLink>
              </>
            )}

            <div className="ml-2 pl-2 border-l border-gray-200 dark:border-gray-700">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors"
            >
              {mobileMenuOpen ? (
                <CloseIcon className="w-6 h-6" />
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col gap-2">
              <NavLink to="/" icon={FitnessIcon} onNavigate={() => setMobileMenuOpen(false)}>
                Home
              </NavLink>

              {token ? (
                <>
                  <NavLink to="/dashboard" icon={ChartIcon} onNavigate={() => setMobileMenuOpen(false)}>
                    Dashboard
                  </NavLink>
                  <NavLink to="/program" icon={WeightLiftingIcon} onNavigate={() => setMobileMenuOpen(false)}>
                    Programs
                  </NavLink>
                  <NavLink to="/community" icon={FlowerIcon} onNavigate={() => setMobileMenuOpen(false)}>
                    Community
                  </NavLink>
                  <NavLink to="/profile" icon={CheckIcon} onNavigate={() => setMobileMenuOpen(false)}>
                    Profile
                  </NavLink>
                  <NavLink
                    icon={ErrorIcon}
                    onClick={() => {
                      localStorage.removeItem("token");
                      window.location.href = "/";
                      setMobileMenuOpen(false);
                    }}
                  >
                    Logout
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/login" icon={FitnessIcon} onNavigate={() => setMobileMenuOpen(false)}>
                    Login
                  </NavLink>
                  <NavLink to="/register" icon={CheckIcon} onNavigate={() => setMobileMenuOpen(false)}>
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}