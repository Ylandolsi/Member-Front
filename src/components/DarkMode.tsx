import { useState, useEffect } from 'react';
import { MdDarkMode } from 'react-icons/md';
import { LuSun } from 'react-icons/lu';

export function ModeToggle() {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
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
