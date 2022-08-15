import axios from 'axios'
import { API_URL } from '../API_URL'
import history from '../../utils/history'
import {
  GET_ALL_EVENT,
  GET_EVENT_DETAILS,
  EVENT_ERROR,
  GET_SEEKAR_EVENTS,
} from './types'

export const getAdminAllEvent = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/event/adminListAllEvent`,
      data,
      {
        headers: { authorization: localStorage.getItem('token') },
      },
    )
    dispatch({
      type: GET_ALL_EVENT,
      payload: response.data.data,
    })
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: err.response.data.error,
    })
  }
}

export const getJobSeekarAllEvent = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/event/jobSeekerListAllEvent`,
      data,
      {
        headers: { authorization: localStorage.getItem('token') },
      },
    )
    dispatch({
      type: GET_SEEKAR_EVENTS,
      payload: response.data.data,
    })
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: err?.response?.data.error,
    })
  }
}
export const addEvent = (data, history) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/api/event/addEvent`, data, {
      headers: { authorization: localStorage.getItem('token') },
    })

    history.push(`/admin/event`)
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: err.response,
    })
    // history.push("/");
  }
}

export const eventImageUpload = (file) => async (dispatch) => {
  const data = new FormData()
  data.append('file', file[0])
  try {
    return await axios
      .post(`${API_URL}/api/event/imageUpload`, data, {
        headers: { authorization: localStorage.token },
      })
      .then((res) => {
        // dispatch({
        //   type: GET_ALL_ORG_NOTIFICATIONS,
        //   payload: res?.data?.data?.data,
        // })
        return res.data
      })
      .catch((er) => {
        return er.response.data
      })
  } catch (err) {
    console.log(err)
  }
}

export const eventDelete = (data) => async (dispatch) => {
  try {
    return await axios
      .post(`${API_URL}/api/event/delete`, data, {
        headers: { authorization: localStorage.token },
      })
      .then((res) => {
        return res
      })
      .catch((er) => {
        return er.response.data
      })
  } catch (err) {
    console.log(err)
  }
}
export const fetchDetails = (data) => async (dispatch) => {
  try {
    return await axios
      .post(`${API_URL}/api/event/eventFetch`, data, {
        headers: { authorization: localStorage.token },
      })
      .then((res) => {
        dispatch({
          type: GET_EVENT_DETAILS,
          payload: res?.data?.data,
        })
        return res.data
      })
      .catch((er) => {
        return er?.response?.data
      })
  } catch (err) {
    console.log(err)
  }
}

export const getEventTags = (data) => async (dispatch) => {
  try {
    return await axios
      .post(`${API_URL}/api/event/getEventTags`, data, {
        headers: { authorization: localStorage.token },
      })
      .then((res) => {
        // dispatch({
        //   type: GET_EVENT_DETAILS,
        //   payload: res?.data?.data,
        // })
        return res.data
      })
      .catch((er) => {
        return er?.response?.data
      })
  } catch (err) {
    console.log(err)
  }
}

export const editEvent = (data, history) => async (dispatch) => {
  try {
    return await axios
      .post(`${API_URL}/api/event/edit`, data, {
        headers: { authorization: localStorage.token },
      })
      .then((res) => {
        history.push(`/admin/event`)
        return res.data
      })
      .catch((er) => {
        return er.response.data
      })
  } catch (err) {
    console.log(err)
  }
}

export const EventRegister = (data, history) => async (dispatch) => {
  try {
    return await axios
      .post(`${API_URL}/api/event/eventUserRegister`, data, {
        headers: { authorization: localStorage.token },
      })
      .then((res) => {
        //history.push(`/event/${data.eventId}`)
        return res.data
      })
      .catch((er) => {
        return er.response.data
      })
  } catch (err) {
    console.log(err)
  }
}

export const EventUnRegister = (data, history) => async (dispatch) => {
  try {
    return await axios
      .post(`${API_URL}/api/event/eventUserUnRegister`, data, {
        headers: { authorization: localStorage.token },
      })
      .then((res) => {
        //history.push(`/event/${data.eventId}`)
        return res.data
      })
      .catch((er) => {
        return er.response.data
      })
  } catch (err) {
    console.log(err)
  }
}

export const eventRegisterStripePayment = (data, history) => async (
  dispatch,
) => {
  try {
    return await axios
      .post(`${API_URL}/api/event/eventCheckout`, data, {
        headers: { authorization: localStorage.token },
      })
      .then((res) => {
        //history.push(`/event/${data.eventId}`)
        return res.data
      })
      .catch((er) => {
        return er.response.data
      })
  } catch (err) {
    console.log(err)
  }
}
export const eventRefund = (data, history) => async (dispatch) => {
  try {
    return await axios
      .post(`${API_URL}/api/event/eventRefund`, data, {
        headers: { authorization: localStorage.token },
      })
      .then((res) => {
        //history.push(`/event/${data.eventId}`)
        return res.data
      })
      .catch((er) => {
        return er.response.data
      })
  } catch (err) {
    console.log(err)
  }
}
