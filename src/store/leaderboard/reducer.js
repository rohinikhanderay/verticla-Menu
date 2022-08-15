import {
    GET_PROFILES
  } from "./types";
  
  const initialState = {
    loading: true
  };
  
  export default function leaderboardReducer(state = initialState, action) {
    switch (action.type) {
      case GET_PROFILES:
        return {
          ...state,
          leaderboard: action.payload,
          error: ""
        };
      default:
        return state;
    }
  }
  