import { combineReducers } from 'redux'
import authReducer from './auth/reducer'
import companyReducer from './company/reducer'
import profileReducer from './profile/reducer'
import jobsReducer from './job/reducer'
import applicationReducer from './application/reducer'
import chatreducer from './chat/reducer'
import notifications from './notifications/reducer'
import blog from './blog/reducer'
import event from './event/reducer'
import { UNAUTH_USER } from './auth/types'

const combinedReducer = combineReducers({
  application: applicationReducer,
  jobs: jobsReducer,
  company: companyReducer,
  profile: profileReducer,
  auth: authReducer,
  chat: chatreducer,
  notifications: notifications,
  blog: blog,
  event: event,
})

const rootReducer = (state, action) => {
  if (action.type === UNAUTH_USER) {
    return companyReducer({ auth: { authenticated: false } }, action)
  }

  return combinedReducer(state, action)
}

export default rootReducer
