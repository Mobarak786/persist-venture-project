import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiHome2Line,
  RiCalendarEventLine,
  RiInformationLine,
  RiMenu3Line,
  RiCommunityLine,
  RiCloseLine,
  RiSunLine,
  RiMoonLine,
} from "react-icons/ri";
import { useDarkMode } from "../hooks/useDarkMode";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isDark, toggle } = useDarkMode();

  const navigationItems = [
    { path: "/", label: "Home", icon: RiHome2Line },
    { path: "/events", label: "Events", icon: RiCalendarEventLine },
    { path: "/about", label: "About", icon: RiInformationLine },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-background-light dark:bg-gray-700 shadow-md relative z-50 transition-colors duration-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <RiCommunityLine className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-400 dark:to-primary-600 bg-clip-text text-transparent">
              Comni
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 ${
                  isActive(path)
                    ? "text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400"
                    : "text-text-light-primary dark:text-text-dark-primary hover:text-primary-600 dark:hover:text-primary-400"
                }`}
              >
                {label}
              </Link>
            ))}

            <button
              onClick={toggle}
              className="p-2 rounded-full text-text-light-primary dark:text-text-dark-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={
                isDark ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {isDark ? (
                <RiSunLine className="w-5 h-5" />
              ) : (
                <RiMoonLine className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggle}
              className="p-2 rounded-full text-text-light-primary dark:text-text-dark-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={
                isDark ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {isDark ? (
                <RiSunLine className="w-5 h-5" />
              ) : (
                <RiMoonLine className="w-5 h-5" />
              )}
            </button>
            <button
              className="p-2 rounded-md text-text-light-primary dark:text-text-dark-primary hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <RiCloseLine className="w-6 h-6" />
              ) : (
                <RiMenu3Line className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-64 bg-background-light dark:bg-background-dark shadow-xl md:hidden"
          >
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-md text-text-light-primary dark:text-text-dark-primary hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Close menu"
              >
                <RiCloseLine className="w-6 h-6" />
              </button>
            </div>
            <div className="px-4 pb-6">
              {navigationItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg mb-2 transition-colors duration-200 ${
                    isActive(path)
                      ? "bg-primary-50 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400"
                      : "text-text-light-primary dark:text-text-dark-primary hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
