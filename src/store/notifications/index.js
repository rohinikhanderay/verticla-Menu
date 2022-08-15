import axios from 'axios'
import { API_URL } from '../API_URL'
import {
  GET_ALL_NEW_CHAT_NOTIFICATIONS,
  GET_ALL_CHAT_NOTIFICATIONS,
  GET_ALL_ORG_NOTIFICATIONS,
} from './types'

export const getNotification = (data) => async (dispatch) => {
  try {
    return await axios
      .post(`${API_URL}/api/notifications/getNotifications`, data, {
        headers: { authorization: localStorage.token },
      })
      .then((res) => {
        dispatch({
          type: GET_ALL_CHAT_NOTIFICATIONS,
          payload: res?.data?.data?.data,
        })
        return res.data
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

export const getOrgNotification = (data) => async (dispatch) => {
  try {
    return await axios
      .post(`${API_URL}/api/notifications/getNotifications`, data, {
        headers: { authorization: localStorage.token },
      })
      .then((res) => {
        dispatch({
          type: GET_ALL_ORG_NOTIFICATIONS,
          payload: res?.data?.data?.data,
        })
        return res.data
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
export const addNotification = (data) => async (dispatch) => {
  try {
    return await axios
      .post(`${API_URL}/api/notifications/addNotification`, data, {
        headers: { authorization: localStorage.token },
      })
      .then((res) => {
        dispatch({
          type: GET_ALL_NEW_CHAT_NOTIFICATIONS,
          payload: res?.data?.data,
        })
        return res?.data
      })
      .catch((er) => {
        return er.response?.data
      })
  } catch (err) {
    console.log(err)
  }
}

export const readNotification = (data) => async (dispatch) => {
  try {
    return await axios
      .post(`${API_URL}/api/notifications/readNotification`, data, {
        headers: { authorization: localStorage.token },
      })
      .then((res) => {
        if (res) {
          data.isRead = false
          if (data.notificationType == 'CHAT') {
            dispatch(getNotification(data))
          } else {
            delete data._id
            dispatch(getOrgNotification(data))
          }
        }
        //       dispatch({
        //   type: GET_ALL_CHAT_NOTIFICATIONS,
        //   payload:res?.data?.data?.data,
        // });
        return res.data
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
