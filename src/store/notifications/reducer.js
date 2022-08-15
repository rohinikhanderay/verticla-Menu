import {
  GET_ALL_NEW_CHAT_NOTIFICATIONS,
  GET_ALL_CHAT_NOTIFICATIONS,
  GET_ALL_ORG_NOTIFICATIONS,
} from './types'

const initialState = {
  notifications: [],
  loading: true,
  orgNotifications: [],
  error: {},
}

export default function applicationReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CHAT_NOTIFICATIONS:
      return {
        ...state,
        error: '',
        notifications: action.payload,
        loading: false,
      }
    case GET_ALL_NEW_CHAT_NOTIFICATIONS:
      let a = [...state.notifications, action.payload]

      return {
        ...state,
        error: '',
        notifications: a,
        loading: false,
      }
    case GET_ALL_ORG_NOTIFICATIONS:
      return {
        ...state,
        error: '',
        orgNotifications: action.payload,
        loading: false,
      }

    default:
      return state
  }
}
