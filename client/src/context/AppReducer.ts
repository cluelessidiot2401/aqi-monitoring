import { State } from "../interfaces/Data";

type ActionType = {
  type: "TRANSACTION_ERROR";
  payload: any;
};

export const AppReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "TRANSACTION_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
