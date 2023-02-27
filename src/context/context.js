import { useState, createContext, useContext } from 'react';

const AppContext = createContext(false);

const AppProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const setDark = (bool) => {
    if (bool) {
      setIsDarkMode(true);
    }else {
      setIsDarkMode(false);
    }
  }

  return (
    <AppContext.Provider
      value={{
        isDarkMode,
        setDark
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
