import { GET_ALL_BLOG, GET_BLOG_DETAILS } from './types'

const initialState = {
  blog: [],
  blogDetails: [],
  loading: true,
  error: {},
}

export default function applicationReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_BLOG:
      return {
        ...state,
        error: '',
        blog: action.payload,
        loading: false,
      }
    case GET_BLOG_DETAILS:
      return {
        ...state,
        error: '',
        blogDetails: action.payload,
        loading: false,
      }

    default:
      return state
  }
}
