import axios from 'axios'
import { API_URL } from '../API_URL'
import { GET_ALL_CHAT_MESSAGES, SOCKET_CONNECT } from './types'
import { connection } from '../../views/chat/conncetion'

export const getMessage = (data) => async (dispatch) => {
  try {
    return await axios
      .post(`${API_URL}/api/chat/getMessages`, data, {
        headers: { authorization: localStorage.token },
      })
      .then((res) => {
        //       dispatch({
        //   type: GET_ALL_CHAT_MESSAGES,
        //   payload:res.data,
        // });
        return res.data.data
      })
      .catch((er) => {
        return er.response.data
      })
  } catch (err) {
    console.log(err)
    //  dispatch({
    //    type: PROFILE_ERROR,
    //    payload: err?.response?.data.error,
    //  });
  }
}
export const addMessage = (data) => async (dispatch) => {
  try {
    return await axios
      .post(`${API_URL}/api/chat/addMessages`, data, {
        headers: { authorization: localStorage.token },
      })
      .then((res) => {
        return res.data
      })
      .catch((er) => {
        return er.response.data
      })
  } catch (err) {
    console.log(err)
  }
}
export const socketEstablish = () => async (dispatch) => {
  try {
    await dispatch({
      type: SOCKET_CONNECT,
      payload: connection(),
    })
  } catch (err) {
    console.log(err)
  }
}
