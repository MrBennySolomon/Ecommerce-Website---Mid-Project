import { useState, createContext, useContext } from 'react';

const AppContext = createContext([]);

const AppProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [arrayIds, setArrayIds] = useState([]);

  const updateCount = () => {
    setCount(count + 1);
  }

  const updateTotal = (num) => {
    setTotal(total + num);
  }

  const updateArrayIds = (arr) => {
    setArrayIds(arr)
  }

  return (
    <AppContext.Provider
      value={{
        count,
        total,
        arrayIds,
        updateCount,
        updateTotal,
        updateArrayIds

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