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

const initialState = {
  loading: true,
  allJobs: [],
  selectedJob: {},
  recruiterJobs: [],
  error: '',
  recommandedJob: null,
  recommandedTitleJob: null,
}

export default function companyReducer(state = initialState, action) {
  switch (action.type) {
    case VIEW_JOBS:
      return {
        ...state,
        error: '',
        allJobs: action.payload,
        loading: false,
      }
    case VIEW_JOB:
      return {
        ...state,
        error: '',
        selectedJob: action.payload,
        loading: false,
      }
    case ZIP_REC_JOB:
      let a = [...state.allJobs.data, ...action.payload.data]

      return {
        ...state,
        error: '',
        allJobs: { data: a, total: a.length },
        loading: false,
      }
    case GET_RECRUITER_JOBS:
      return {
        ...state,
        error: '',
        recruiterJobs: action.payload,
        loading: false,
      }
    case SET_SKILL_BASE_JOB:
      return {
        ...state,
        error: '',
        recommandedJob: action.payload,
        loading: false,
      }
    case SET_JOB_TITLE_BASE_JOB:
      return {
        ...state,
        error: '',
        recommandedTitleJob: action.payload,
        loading: false,
      }
    case JOB_ERROR:
      return { ...state, error: action.payload, loading: false }
    case SET_LOADING:
      return { ...state, loading: true }
    default:
      return state
  }
}
