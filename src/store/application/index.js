import axios from 'axios';
import { API_URL } from '../API_URL';
import {
    GET_PROFILE_APPLICATIONS,
    GET_RECRUITER_APPLICATIONS,
    GET_ALL_JOB_APPLICATIONS,
    VIEW_APPLICATION,
    APPLICATION_ERROR,
} from './types';

export const getProfileApplications = () => async (dispatch) => {
    try {
        const response = await axios.get(
            `${API_URL}/api/applications/jobSeeker/all`,
            {
                headers: { authorization: localStorage.token },
            }
        );
        dispatch({
            type: GET_PROFILE_APPLICATIONS,
            payload: response.data.data,
        });
    } catch (err) {
        dispatch({
            type: APPLICATION_ERROR,
            payload: err?.response?.data?.error,
        });
    }
};

export const getRecruiterApplications = () => async (dispatch) => {
    try {
        const response = await axios.get(
            `${API_URL}/api/applications/recruiter/all`,
            {
                headers: { authorization: localStorage.token },
            }
        );
        dispatch({
            type: GET_RECRUITER_APPLICATIONS,
            payload: response.data.data,
        });
    } catch (err) {
        dispatch({
            type: APPLICATION_ERROR,
            payload: err.response.data.error,
        });
    }
};

export const createApplication = (body, id, history) => async (dispatch) => {
    try {
        await axios.post(
            `${API_URL}/api/applications/job/${id}`,
            { ...body },
            { headers: { authorization: localStorage.token } }
        );
        history.push(`/jobs/${id}`);
    } catch (err) {
        dispatch({
            type: APPLICATION_ERROR,
            payload: err.response.data.error,
        });
    }
};

export const getIndividualApplication = (id, history) => async (dispatch) => {
    try {
        const response = await axios.get(`${API_URL}/api/applications/${id}`, {
            headers: { authorization: localStorage.token },
        });

        dispatch({
            type: VIEW_APPLICATION,
            payload: response.data.data,
        });
    } catch (err) {
        dispatch({
            type: APPLICATION_ERROR,
            payload: err,
        });
        // history.push(`/dashboard`);
    }
};

export const getAllJobApplications = (id, history) => async (dispatch) => {
    try {
        const response = await axios.get(
            `${API_URL}/api/applications/job/${id}`,
            {
                headers: { authorization: localStorage.token },
            }
        );
        dispatch({
            type: GET_ALL_JOB_APPLICATIONS,
            payload: response.data.data,
        });
    } catch (err) {
        // dispatch({
        //     type: APPLICATION_ERROR,
        //     payload: err,
        // });
        // history.push(`/dashboard`);
    }
};
