import axios from 'axios'
import { API_URL } from '../API_URL'
import {
  VIEW_JOBS,
  VIEW_JOB,
  GET_RECRUITER_JOBS,
  JOB_ERROR,
  SET_LOADING,
  SET_SKILL_BASE_JOB,
  ZIP_REC_JOB,
  SET_JOB_TITLE_BASE_JOB,
} from './types'

export const viewJob = (id, history) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/api/jobs/${id}`)
    dispatch({
      type: VIEW_JOB,
      payload: response.data.data,
    })
    return response.data.data
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: err.response.data.error,
    })
    history.push(`/dashboard`)
  }
}

export const getZipRecJobs = (data, search, limit, page) => async (
  dispatch,
) => {
  let params = {
    days_ago: 14,
    jobs_per_page: limit,
    page: page,
    api_key: process.env.REACT_APP_ZIPSEARCH_API_KEY,
  }
  if (search != '') {
    params.search = search
  }
  if (data?.location) {
    params.location = data.location
  }

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_ZIPSEARCH_API_URL}`,
      { params },
    )

    dispatch({
      type: ZIP_REC_JOB,
      payload: { data: response.data?.jobs },
    })
  } catch (err) {
    console.log(err)
    // dispatch({
    //   type: JOB_ERROR,
    //   payload: err.response.data.error,
    // });
    // history.push(`/dashboard`);
  }
}

export const getAllRecruiterJobs = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/api/jobs/recruiter/all`, {
      headers: { authorization: localStorage.getItem('token') },
    })
    dispatch({
      type: GET_RECRUITER_JOBS,
      payload: response.data.data,
    })
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: err?.response?.data?.error,
    })
  }
}

export const viewJobs = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/api/jobs`, data)
    dispatch({
      type: VIEW_JOBS,
      payload: response.data.data,
    })
    return response.data.data
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: err.response.data.error,
    })
  }
}
export const getRecommandedJobjobTitle = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/api/jobs`, data)
    dispatch({
      type: SET_JOB_TITLE_BASE_JOB,
      payload: response.data.data,
    })
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: err?.response?.data.error,
    })
  }
}

export const getRecommandedJob = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/api/jobs`, data)
    dispatch({
      type: SET_SKILL_BASE_JOB,
      payload: response.data.data,
    })
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: err?.response?.data.error,
    })
  }
}

export const createJob = (body, history) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/api/jobs/create`, body, {
      headers: { authorization: localStorage.getItem('token') },
    })
    history.push(`/jobs/${response.data.data._id}`)
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: err.response.data.error,
    })
  }
}

export const editJob = (body, id, history) => async (dispatch) => {
  try {
    await axios.put(`${API_URL}/api/jobs/${id}`, body, {
      headers: { authorization: localStorage.getItem('token') },
    })
    history.push(`/jobs/${id}`)
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: err.response.data.error,
    })
  }
}

export const deleteJob = (id, history) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/api/jobs/${id}`, {
      headers: { authorization: localStorage.getItem('token') },
    })
    history.push(`/dashboard`)
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: err.response.data.error,
    })
  }
}

export const setLoading = () => (dispatch) => {
  dispatch({
    type: SET_LOADING,
  })
}

// export const trasnferJobs = (data) => async (dispatch) => {
//   try {
//     return await axios
//       .post(`${API_URL}/api/jobs/transfer`, data, {
//         headers: {
//           authorization: localStorage.token,
//         },
//       })
//       .catch((er) => {
//         return er.response.data
//       })
//   } catch (err) {
//     console.log(err)
//     // dispatch({
//     //   type: PROFILE_ERROR,
//     //   payload: err.response.data.error,
//     // })
//   }
// }

export const TrasnferJobs = (data) => async (dispatch) => {
  try {
    return await axios
      .post(`${API_URL}/api/jobs/transfer`, data, {
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
