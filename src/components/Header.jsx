import React from 'react';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <header className="w-full h-[10vh] bg-transparent flex justify-center items-center px-4 md:px-24 lg:px-48 xl:px-62 relative">
      {/* krug u desnom gornjem kutu */}
      <div className="absolute right-0 top-0 z-0">
        <div className="w-[300px] h-[200px] bg-[#FF26B7] blur-[200px] rounded-r-t-[50%]"></div>
      </div>

      <nav className="flex justify-start items-center w-full max-w-7xl z-10">
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
      </nav>
    </header>
  );
};

export default Header;
