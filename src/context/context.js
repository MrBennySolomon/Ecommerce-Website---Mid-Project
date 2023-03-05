import { useState, createContext, useContext } from 'react';
import Model      from '../MVC/Model';
import Controller from '../MVC/Controller';

const AppContext = createContext([]);

const AppProvider = ({ children }) => {
  const model = new Model();
  const controller = new Controller(model);

  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [arrayIds, setArrayIds] = useState([]);

  const updateCount = (operation) => {
    operation === '+' ? setCount(count + 1) : setCount(count - 1);
  }

  const updateTotal = (operation, num) => {
    operation === '+' ? setTotal(total + num) : setTotal(total - num);
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
        updateArrayIds,
        controller

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