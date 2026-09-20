import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

function ThemeNavbar() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <aside
      aria-label="Theme Toggle Navigation"
      className="fixed top-5 z-50 mt-7 right-4 sm:right-10 lg:right-16 h-[64px] rounded-xl bg-app-glass border border-app-main flex items-center justify-center px-4 shadow-sm dark:shadow-2xl backdrop-blur-md transition-all duration-300"
    >
      {/* Single Sliding Theme Toggle Switch */}
      <button
        type="button"
        onClick={toggleTheme}
        className="relative inline-flex h-8 w-15 shrink-0 cursor-pointer rounded-full p-1 transition-colors duration-300 ease-in-out focus:outline-none select-none bg-slate-200/80 dark:bg-slate-800/90 border border-app-main shadow-inner"
        title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        aria-checked={isDarkMode}
        role="switch"
      >
        {/* Sliding Thumb with Sun / Moon Icon */}
        <span
          className={`pointer-events-none flex h-6 w-6 items-center justify-center rounded-full shadow-sm transform transition-transform duration-300 ease-in-out ${
            isDarkMode
              ? 'translate-x-7 bg-[#0a0d12] border border-slate-700'
              : 'translate-x-0 bg-white border border-slate-200'
          }`}
        >
          {isDarkMode ? (
            <FaMoon className="text-[11px] text-amber-300 transition-transform duration-300" />
          ) : (
            <FaSun className="text-[12px] text-amber-500 transition-transform duration-300" />
          )}
        </span>
      </button>
    </aside>
  );
}

export default ThemeNavbar;
