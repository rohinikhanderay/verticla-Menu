import axios from "axios";
import {
    GET_PROFILES, GET_PROFILES_ERROR
} from "./types";

export const getProfiles = (setProfiles, fillLeaderboardItems, profileLimit) =>  async (dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_DISCORD_API_URL}/api/profiles/getProfiles`, {
            params: {
                limit : profileLimit
            }
        });
        dispatch({
            type: GET_PROFILES,
            payload: response.data,
        });
        setProfiles(response.data.data)
        fillLeaderboardItems()
    }
    catch (err) {
        dispatch({
            type: GET_PROFILES_ERROR,
            payload: err?.response?.data.error,
        })
    }
}

export const updateProfile = (data) => async (dispatch) => {
    try {
      return await axios
        .post(`${process.env.REACT_APP_DISCORD_API_URL}/api/profiles/editProfile`, data, {
        })
        .then((res) => {
          return res.data
        })
        .catch((er) => {
          return er.response.data
        })
    } catch (err) {
      dispatch({
        type: GET_PROFILES_ERROR,
        payload: err.response.data.error,
      })
    }
  }