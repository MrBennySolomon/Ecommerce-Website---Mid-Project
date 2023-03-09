import { useState, createContext, useContext } from 'react';
import Model      from '../MVC/Model';
import Controller from '../MVC/Controller';
import constants from '../utils/constants';

const AppContext = createContext([]);

const AppProvider = ({ children }) => {
  const model = new Model();
  const controller = new Controller(model);

  const [isError, setIsError]   = useState(false);
  const [isLoading, setIsLoading]   = useState(true);

  const [count, setCount]       = useState(0);
  const [total, setTotal]       = useState(0);
  const [arrayIds, setArrayIds] = useState([]);
  const [showEditFields, setShowEditFields] = useState(false);

  const updateCount          = (operation)      => {
    operation === constants.PLUS ? setCount(count + 1) : setCount(count - 1);
  }

  const updateTotal          = (operation, num) => {
    operation === constants.PLUS ? setTotal(total + num) : setTotal(total - num);
  }

  const updateArrayIds       = (arr)            => {
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
        controller,
        isError,
        setIsError,
        isLoading,
        setIsLoading,
        showEditFields,
        setShowEditFields
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = ()              => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };