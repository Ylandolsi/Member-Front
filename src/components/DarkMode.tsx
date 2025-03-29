import { useState, useEffect } from 'react';
import { MdDarkMode } from 'react-icons/md';
import { LuSun } from 'react-icons/lu';

export function ModeToggle() {
  const getSavedTheme = (): 'dark' | 'light' => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === null || savedTheme === undefined) {
      localStorage.setItem('theme', 'light');
      return 'light';
    }
    return savedTheme as 'dark' | 'light';
  };

  const [theme, setTheme] = useState<'dark' | 'light'>(getSavedTheme);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <div onClick={toggleTheme} className="cursor-pointer ">
      <MdDarkMode
        style={{
          display: theme === 'dark' ? 'none' : 'block',
          width: 20,
          height: 20,
        }}
      />
      <LuSun
        style={{
          display: theme === 'dark' ? 'block' : 'none',
          width: 20,
          height: 20,
        }}
      />
    </div>
  );
}
