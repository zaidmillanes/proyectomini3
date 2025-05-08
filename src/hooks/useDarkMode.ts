import { useLocalStorage } from './useLocalStorage';
import { useEffect } from 'react';

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>('darkMode', 
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };
  
  return {
    isDarkMode,
    toggleDarkMode
  };
};