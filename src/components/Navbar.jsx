import React, { useEffect, useState } from 'react';
import { MoonIcon, SunIcon  } from '@heroicons/react/24/solid';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);


  useEffect(() => {
    const savedTheme = localStorage.getItem('isDarkMode');
    if (savedTheme === 'true') {
      document.body.classList.add('dark-theme');
      setIsDarkMode(true);
    } else {
      document.body.classList.remove('dark-theme');
      setIsDarkMode(false);
    }

    const handleThemeChange = () => {
      document.body.classList.toggle('dark-theme');
      setIsDarkMode((prevMode) => {
        const newMode = !prevMode;
        localStorage.setItem('isDarkMode', newMode);
        return newMode;
      });
    };

    const moon = document.querySelector('.moon');
    if (moon) {
      moon.addEventListener('click', handleThemeChange);
    }

    // Cleanup the event listener on component unmount
    return () => {
      if (moon) {
        moon.removeEventListener('click', handleThemeChange);
      }
    };
  }, []);

  return (
    <div className="shadow py-6 px-11 flex justify-between items-center sm:flex-col sm:items-start sm:gap-3">
    <h1 className="text-xl font-black">Where in the world?</h1>
    <div className="flex items-center cursor-pointer moon">
      {isDarkMode ? (
        <>
          <SunIcon className="w-5 sm:w-4" />
          <p className="font-bold ml-2">Light Mode</p>
        </>
      ) : (
        <>
          <MoonIcon className="w-5 sm:w-4" />
          <p className="font-bold ml-2">Dark Mode</p>
        </>
      )}
    </div>
  </div>
);
};

export default Navbar;
