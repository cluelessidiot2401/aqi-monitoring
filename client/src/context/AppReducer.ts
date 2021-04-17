import { State } from "../interfaces/Data";

type ActionType =
  | {
      type: "TRANSACTION_ERROR";
      payload: any;
    }
  | {
      type: "UPDATE_ARCHIVE";
      payload: { lastMessage: any; timeStamp: number };
    };

export const AppReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "TRANSACTION_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "UPDATE_ARCHIVE":
      const DATA_LIMIT = 20;
      let data = JSON.parse(action.payload.lastMessage);
      let archive = state.aqiArchive;

      data.forEach((entry: any) => {
        if (!archive[entry.city]) archive[entry.city] = [];
        archive[entry.city].push({
          aqi: entry.aqi,
          time: action.payload.timeStamp,
        });
      });

      for (let city in archive) {
        if (archive[city].length > DATA_LIMIT) {
          archive[city].splice(0, archive[city].length - DATA_LIMIT);
        }
      }

      return {
        ...state,
        aqiArchive: archive,
      };
    default:
      return state;
  }
};
