import {
  GET_ALL_CHAT_MESSAGES,
  GET_ALL_NEW_CHAT_MESSAGES,
  SOCKET_CONNECT,
} from './types'

const initialState = {
  messages: [],
  loading: true,
  error: {},
  socket: [],
}

export default function applicationReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CHAT_MESSAGES:
      return {
        ...state,
        error: '',
        messages: action.payload,
        loading: false,
      }
    case SOCKET_CONNECT:
      return {
        ...state,
        error: '',
        socket: action.payload,
        loading: false,
      }
    case GET_ALL_NEW_CHAT_MESSAGES:
      let a = [...state.messages.data, action.payload]

      return {
        ...state,
        error: '',
        messages: a,
        loading: false,
      }

    default:
      return state
  }
}
