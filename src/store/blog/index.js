import axios from 'axios'
import { API_URL } from '../API_URL'
import history from '../../utils/history'
import { GET_ALL_BLOG, BLOG_ERROR, GET_BLOG_DETAILS } from './types'

export const getAllBlogs = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/api/blog/listAllBlog`, data, {
      headers: { authorization: localStorage.getItem('token') },
    })
    dispatch({
      type: GET_ALL_BLOG,
      payload: response.data.data,
    })
  } catch (err) {
    dispatch({
      type: BLOG_ERROR,
      payload: err.response.data.error,
    })
  }
}
export const addBlog = (data, history) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/api/blog/addBlog`, data, {
      headers: { authorization: localStorage.getItem('token') },
    })

    history.push(`/admin/blog`)
  } catch (err) {
    dispatch({
      type: BLOG_ERROR,
      payload: err.response,
    })
    // history.push("/");
  }
}

export const blogImageUpload = (file) => async (dispatch) => {
  const data = new FormData()
  data.append('file', file[0])
  try {
    return await axios
      .post(`${API_URL}/api/blog/imageUpload`, data, {
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

export const blogDelete = (data) => async (dispatch) => {
  try {
    return await axios
      .post(`${API_URL}/api/blog/delete`, data, {
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
      .post(`${API_URL}/api/blog/fetchBlogDetails`, data, {
        headers: { authorization: localStorage.token },
      })
      .then((res) => {
        console.log('---', res?.data?.data)
        dispatch({
          type: GET_BLOG_DETAILS,
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

export const editBlog = (data, history) => async (dispatch) => {
  try {
    return await axios
      .post(`${API_URL}/api/blog/edit`, data, {
        headers: { authorization: localStorage.token },
      })
      .then((res) => {
        history.push(`/admin/blog`)
        return res.data
      })
      .catch((er) => {
        return er.response.data
      })
  } catch (err) {
    console.log(err)
  }
}

export const likeBlog = (id, data) => async (dispatch) => {
  try {
    return await axios
      .put(`${API_URL}/api/blog/${id}/like`, data, {
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
