import axios from 'axios'
import { API_URL } from '../API_URL'
import {
  SUBMIT_PROFILE,
  GET_PROFILE,
  VIEW_PROFILE,
  PROFILE_ERROR,
  GET_IMAGES,
  GET_INTEREST_IMAGES,
  UPDATE_RESUME_SUCCESS,
  VIEW_TRENDING_SKILL,
  VIEW_SUGGESTION_SKILL,
  VIEW_RECOMMANDED_SKILL,
  GET_CANDIDATES,
} from './types'
import { UNAUTH_USER } from '../auth/types'
import { createOrganization, joinOrganization } from '../company'
import { profileStatus } from '../auth'

export const getProfile = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/api/profiles`, {
      headers: { authorization: localStorage.token },
    })
    localStorage.setItem('uuid', response.data.data._id)
    localStorage.setItem('profile', JSON.stringify(response.data.data))
    dispatch({
      type: GET_PROFILE,
      payload: response.data.data,
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err,
    })
  }
}
export const getImages = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/api/profiles/images`, data, {
      headers: { authorization: localStorage.token },
    })

    dispatch({
      type: GET_IMAGES,
      payload: response.data.result,
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err,
    })
  }
}
export const profileJoinchat = (data) => async (dispatch) => {
  try {
    return await axios
      .post(`${API_URL}/api/profiles/contactJoinChat`, data, {
        headers: { authorization: localStorage.token },
      })
      .then((res) => {
        return res.data
      })
  } catch (err) {
    console.log(err)
  }
}

export const getInterestImages = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/api/profiles/images`, data, {
      headers: { authorization: localStorage.token },
    })

    dispatch({
      type: GET_INTEREST_IMAGES,
      payload: response.data.result,
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err,
    })
  }
}

export const viewProfile = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/api/profiles/${id}`)

    dispatch({
      type: VIEW_PROFILE,
      payload: response.data.data,
    })
    return response.data.data
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err?.response?.data?.error,
    })
  }
}

export const createProfile = (
  results,
  history,
  resume,
  organization,
  orgCode,
  organizationOperation,
) => async (dispatch) => {
  try {
    const res = await axios
      .post(`${API_URL}/api/profiles`, results, {
        headers: {
          authorization: localStorage.token,
        },
      })
      .then((ress) => {
        dispatch({ type: SUBMIT_PROFILE })
        dispatch(
          profileStatus({
            id: ress.data.data.userRef,
            data: { isProfile: true },
          }),
        )
        if (results.role === 'jobSeeker') {
          resume && dispatch(uploadResume(resume))
          localStorage.clear();

          setTimeout(() => {
            history.push('/signin')
            dispatch({ type: UNAUTH_USER })
          }, 3000)
        }

        if (results.role === 'recruiter') {
          if (orgCode) {
            dispatch(joinOrganization(orgCode))
          }
          if (organizationOperation === 'create') {
            dispatch(createOrganization(organization, history))
          }
        }
      })
    // console.log(res.data.data.userRef.)
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err?.response?.data.error,
    })
  }
}

export const uploadResume = (file) => async (dispatch) => {
  const data = new FormData()
  data.append('file', file[0])
  try {
    await axios.post(`${API_URL}/api/profiles/resume`, data, {
      headers: {
        authorization: localStorage.token,
      },
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response.data.error,
    })
  }
}
export const updateResume = (file) => async (dispatch) => {
  const data = new FormData()
  data.append('file', file[0])
  try {
    return await axios
      .post(`${API_URL}/api/profiles/resume`, data, {
        headers: {
          authorization: localStorage.token,
        },
      })
      .then((res) => {
        return res.data
      })
      .catch((er) => {
        return er.response.data
      })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response.data.error,
    })
  }
}

export const updateProfile = (file) => async (dispatch) => {
  try {
    return await axios
      .post(`${API_URL}/api/profiles/profileImg`, file, {
        headers: {
          authorization: localStorage.token,
        },
      })
      .then((res) => {
        return res.data
      })
      .catch((er) => {
        return er.response.data
      })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response.data.error,
    })
  }
}
export const updateProfileHeaderImage = (file) => async (dispatch) => {
  try {
    return await axios
      .post(`${API_URL}/api/profiles/headerImg`, file, {
        headers: {
          authorization: localStorage.token,
        },
      })
      .then((res) => {
        return res.data
      })
      .catch((er) => {
        return er.response.data
      })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response.data.error,
    })
  }
}
export const uploadProjectImages = (file) => async (dispatch) => {
  try {
    const data = await axios.post(`${API_URL}/api/profiles/projectImg`, file, {
      headers: {
        authorization: localStorage.token,
      },
    })
    return data
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response.data.error,
    })
  }
}
export const updateUserDetails = (data) => async (dispatch) => {
  try {
    return await axios.put(`${API_URL}/api/profiles`, data, {
      headers: {
        authorization: localStorage.token,
      },
    }).then((res) => {
      return res.data
    })
    .catch((er) => {
      return er.response.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response.data.error,
    })
  }
}
export const emailVerifyUpdate = (data) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${API_URL}/api/users/verifyEmailStatus`,
      data,
      {
        headers: {
          // authorization: localStorage.token,
        },
      },
    )
    return res
  } catch (err) {
    // dispatch({
    //   type: PROFILE_ERROR,
    //   payload: err.response.data.error,
    // });
  }
}

export const sendVerifyEmailUpdate = (data) => async (dispatch) => {
  try {
    await axios.put(`${API_URL}/api/profiles/verifyEmailStatus`, data, {
      headers: {
        // authorization: localStorage.token,
      },
    })
  } catch (err) {
    // dispatch({
    //   type: PROFILE_ERROR,
    //   payload: err.response.data.error,
    // });
  }
}
export const sendVerifyEmail = (data) => async (dispatch) => {
  try {
    await axios.post(`${API_URL}/api/users/verifyEmailSend`, data, {
      headers: {
        // authorization: localStorage.token,
      },
    })
  } catch (err) {
    // dispatch({
    //   type: PROFILE_ERROR,
    //   payload: err.response.data.error,
    // });
  }
}

export const deleteResume = (data) => async (dispatch) => {
  try {
    return await axios
      .delete(`${API_URL}/api/profiles/resume`, {
        headers: {
          authorization: localStorage.token,
        },
        data,
      })
      .then((res) => {
        return res.data
      })
      .catch((er) => {
        return er.response.data
      })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response.data.error,
    })
  }
}
export const stripePayament = (data) => async (dispatch) => {
  try {
    return await axios
      .post(`${API_URL}/api/users/stripe/checkout`, data)
      .then((res) => {
        return res.data
      })
      .catch((er) => {
        return er.response.data
      })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err?.response?.data.error,
    })
  }
}
export const stripeBillingPortal = (data) => async (dispatch) => {
  try {
    return await axios
      .post(`${API_URL}/api/users/stripe/billing-portal`, data)
      .then((res) => {
        return res.data
      })
      .catch((er) => {
        return er.response.data
      })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err?.response?.data.error,
    })
  }
}
export const fileToTextConvert = (file) => async (dispatch) => {
  const data = new FormData()
  data.append('file', file[0])
  try {
    return await axios
      .post(`${API_URL}/api/profiles/fileTotext`, data)
      .then((res) => {
        return res.data
      })
      .catch((er) => {
        return er.response.data
      })
  } catch (err) {
    // dispatch({
    //   type: PROFILE_ERROR,
    //   payload: err?.response?.data.error,
    // });
  }
}

export const listUdemySkillTrending = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/profiles/udemy/courses/trending/?page=${data.page}&size=${data.size}`,
    )

    dispatch({
      type: VIEW_TRENDING_SKILL,
      payload: response.data.results,
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err?.response?.data?.error,
    })
  }
}

export const listUdemySuggestion = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/profiles/udemy/courses/?page=${data.page}&size=${data.size}&search=${data.search}`,
    )

    dispatch({
      type: VIEW_SUGGESTION_SKILL,
      payload: response.data.results,
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err?.response?.data?.error,
    })
  }
}
export const recommandedCourses = (data) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/profiles/udemy/courses/?page=${data.page}&size=${data.size}&search=${data.search}`,
    )

    dispatch({
      type: VIEW_RECOMMANDED_SKILL,
      payload: response.data.results,
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err?.response?.data?.error,
    })
  }
}
export const searchCandidate = (data) => async (dispatch) => {
  try {
    return await axios
      .post(`${API_URL}/api/profiles/search/candidates`, data, {
        headers: {
          authorization: localStorage.token,
        },
      })
      .then((res) => {
        dispatch({
          type: GET_CANDIDATES,
          payload: res.data,
        })
        return res.data
      })
      .catch((er) => {
        return er.response.data
      })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err?.response?.data.error,
    })
  }
}