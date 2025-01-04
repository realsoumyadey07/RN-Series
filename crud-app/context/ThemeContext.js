import React, { useState, createContext } from "react";

const RefreshContext = createContext(null);

export  function RefreshProvider ({children}) {
  const [refresh, setRefresh] = useState(false);
  return (
    <RefreshContext.Provider value={{refresh, setRefresh}}>
      {children}
    </RefreshContext.Provider>
  )
}

export const useTodo = () => useContext(TodoContext);