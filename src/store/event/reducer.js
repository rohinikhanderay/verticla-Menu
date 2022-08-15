import { GET_ALL_EVENT, GET_EVENT_DETAILS, GET_SEEKAR_EVENTS } from './types'

const initialState = {
  event: [],
  seekarEvents: [],
  loading: true,
  error: {},
}

export default function applicationReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_EVENT:
      return {
        ...state,
        error: '',
        event: action.payload,
        loading: false,
      }
    case GET_EVENT_DETAILS:
      return {
        ...state,
        error: '',
        blogDetails: action.payload,
        loading: false,
      }
    case GET_SEEKAR_EVENTS:
      return {
        ...state,
        error: '',
        seekarEvents: action.payload,
        loading: false,
      }

    default:
      return state
  }
}
