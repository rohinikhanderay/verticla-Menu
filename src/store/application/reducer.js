import {
    APPLICATION_ERROR,
    GET_PROFILE_APPLICATIONS,
    GET_RECRUITER_APPLICATIONS,
    VIEW_APPLICATION,
    GET_ALL_JOB_APPLICATIONS,
} from './types';

const initialState = {
    applications: [],
    recruiterApplications: [],
    selectedApplication: [],
    jobApplications: [],
    loading: true,
    error: {},
};

export default function applicationReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PROFILE_APPLICATIONS:
            return {
                ...state,
                error: '',
                applications: action.payload,
                loading: false,
            };
        case GET_RECRUITER_APPLICATIONS:
            return {
                ...state,
                error: '',
                recruiterApplications: action.payload,
                loading: false,
            };
        case VIEW_APPLICATION:
            return {
                ...state,
                selectedApplication: action.payload,
                loading: false,
            };
        case APPLICATION_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case GET_ALL_JOB_APPLICATIONS:
            return {
                ...state,
                jobApplications: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}
