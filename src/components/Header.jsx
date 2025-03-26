import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  const { i18n } = useTranslation();
  const langRef = useRef(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Dark mode efekat
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        langRef.current,
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          delay: 2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: langRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, langRef);

    return () => ctx.revert();
  }, [i18n.language]);

  return (
    <header className="w-full h-[10vh] bg-white dark:bg-gray-900 flex justify-center items-center px-4 md:px-24 lg:px-48 xl:px-62 relative">
      {/* Krug u desnom gornjem kutu */}
      <div className="absolute right-0 top-0 z-0">
        <div className="w-[300px] h-[200px] bg-[#FF26B7] blur-[200px] rounded-r-t-[50%]"></div>
      </div>

      {/* Navigacijski kontejner */}
      <nav className="flex justify-between items-center w-full max-w-7xl z-10" ref={langRef}>
        {/* Jezični prekidači */}
        <div>
          <button
            onClick={() => changeLanguage('en')}
            className={`px-4 py-2 rounded-full text-sm transition ${
              i18n.language === 'en'
                ? 'text-pink-500 border border-pink-500'
                : 'text-gray-500 dark:text-gray-300'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => changeLanguage('hr')}
            className={`ml-2 px-4 py-2 rounded-full text-sm transition ${
              i18n.language === 'hr'
                ? 'text-pink-500 border border-pink-500'
                : 'text-gray-500 dark:text-gray-300'
            }`}
          >
            HR
          </button>
        </div>

        {/* Tema prekidač */}
        <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="p-2 rounded-full hover:border border-pink-500 dark:hover:bg-gray-800 transition-colors"
      >
        {theme === 'light' ? (
          <SunIcon className="w-6 h-6 text-[#FF26B7] dark:text-[#FF26B7]" />
        ) : (
          <MoonIcon className="w-6 h-6 text-[#FF26B7] dark:text-[#FF26B7]" />
        )}
      </button>
      </nav>
    </header>
  );
};

export default Header;
