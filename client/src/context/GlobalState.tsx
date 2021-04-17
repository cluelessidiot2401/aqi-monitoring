import { State } from "../interfaces/Data";
import { createContext, useReducer } from "react";
import { AppReducer } from "./AppReducer";

// Initial State
const initialState: State = {
  error: null,
  loading: false,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }: { children: any }) => {
  const [state] = useReducer(AppReducer, initialState);

  return (
    <GlobalContext.Provider
      value={{
        error: state.error,
        loading: state.loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
