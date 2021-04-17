import { State } from "../interfaces/Data";
import { createContext, useReducer } from "react";
import { AppReducer } from "./AppReducer";

// Initial State
const initialState: State = {
  error: null,
  loading: false,
  aqiArchive: {},
  addEntry: () => {},
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const addEntry = (lastMessage: any, timeStamp: number) => {
    dispatch({ type: "UPDATE_ARCHIVE", payload: { lastMessage, timeStamp } });
  };

  return (
    <GlobalContext.Provider
      value={{
        error: state.error,
        loading: state.loading,
        aqiArchive: state.aqiArchive,
        addEntry,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
