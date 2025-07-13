import React, { useEffect, useState, createContext, useContext } from 'react';
interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export const ThemeProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [theme, setTheme] = useState(() => {
    // Try to get theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });
  useEffect(() => {
    // Update localStorage and apply theme
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  return <ThemeContext.Provider value={{
    theme,
    toggleTheme
  }}>
      {children}
    </ThemeContext.Provider>;
};
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};