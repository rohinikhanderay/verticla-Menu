import axios from 'axios'
import { API_URL } from '../API_URL'
import history from '../../utils/history'
import {
  VIEW_COMPANY,
  VALIDATE_COMPANY,
  VALIDATE_COMPANY_ERROR,
  COMPANY_ERROR,
  RECRUITER_ORG_DETAILS,
  APPROVE_ROLE,
  ADMIN_COMPANY_LIST,
  ADMIN_JOB_LIST,
  ADMIN_EMPLOYEE_LIST,
} from './types'

export const viewRecruiterOrganization = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/api/organizations/`, {
      headers: { authorization: localStorage.getItem('token') },
    })
    dispatch({
      type: RECRUITER_ORG_DETAILS,
      payload: response.data,
    })
  } catch (error) {
    history.push('/')
  }
}
export const adminGetallCompanies = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/api/admin/companies`, data, {
      headers: { authorization: localStorage.getItem('token') },
    })
    dispatch({
      type: ADMIN_COMPANY_LIST,
      payload: response.data.data,
    })
  } catch (err) {
    dispatch({
      type: COMPANY_ERROR,
      payload: err.response.data.error,
    })
    // history.push("/");
  }
}
export const adminGetAllJobs = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/admin/company/jobs`,
      data,
      {
        headers: { authorization: localStorage.getItem('token') },
      },
    )
    dispatch({
      type: ADMIN_JOB_LIST,
      payload: response.data.data,
    })
  } catch (err) {
    dispatch({
      type: COMPANY_ERROR,
      payload: err.response.data.error,
    })
    // history.push("/");
  }
}

export const removeEmp = (data) => async (dispatch) => {
  try {
    return await axios
      .post(`${API_URL}/api/users/removeEmployee`, data, {
        headers: { authorization: localStorage.token },
      })
      .then((res) => {
        return res?.data
      })
      .catch((er) => {
        return er.response.data
      })
  } catch (err) {
    console.log(err)
  }
}
export const adminGetAllEmployee = (data) => async (dispatch) => {
  try {
    return await axios
      .post(`${API_URL}/api/admin/company/employees`, data, {
        headers: { authorization: localStorage.token },
      })
      .then((res) => {
        //   console.log(res?.data?.data)
        //history.push(`/event/${data.eventId}`)
        return res?.data?.data
      })
      .catch((er) => {
        return er.response.data
      })
  } catch (err) {
    console.log(err)
  }
}
export const adminAddJob = (data, history) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/api/admin/add/job`, data, {
      headers: { authorization: localStorage.getItem('token') },
    })
    // dispatch({
    //   type:ADMIN_EMPLOYEE_LIST ,
    //   payload: response.data.data,
    // });
    history.push(`/admin/organization/${data.orgid}/jobs`)
  } catch (err) {
    dispatch({
      type: COMPANY_ERROR,
      payload: err.response.data.error,
    })
    // history.push("/");
  }
}
export const adminViewCompany = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/api/admin/company`, data, {
      headers: { authorization: localStorage.getItem('token') },
    })
    return response.data
    // dispatch({
    //   type:ADMIN_EMPLOYEE_LIST ,
    //   payload: response.data.data,
    // });
    //history.push(`/admin/${data.orgid}/jobs`)
  } catch (err) {
    dispatch({
      type: COMPANY_ERROR,
      payload: err.response.data.error,
    })
    // history.push("/");
  }
}
export const adminAddCompany = (data, history) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/admin/create/company`,
      data,
      {
        headers: { authorization: localStorage.getItem('token') },
      },
    )
    // dispatch({
    //   type:ADMIN_EMPLOYEE_LIST ,
    //   payload: response.data.data,
    // });
    history.push({ pathname: `/admin/organization`, state: { status: true } })
  } catch (err) {
    dispatch({
      type: COMPANY_ERROR,
      payload: err.response.data.error,
    })
    // history.push("/");
  }
}
export const adminEditCompany = (data, id, history) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/admin/edit/company`,
      { ...data, orgid: id },
      {
        headers: { authorization: localStorage.getItem('token') },
      },
    )
    // dispatch({
    //   type:ADMIN_EMPLOYEE_LIST ,
    //   payload: response.data.data,
    // });
    history.push({ pathname: `/admin/organization`, state: { status: true } })
  } catch (err) {
    dispatch({
      type: COMPANY_ERROR,
      payload: err.response.data.error,
    })
    // history.push("/");
  }
}
export const adminEditJob = (data, history) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/api/admin/edit/job`, data, {
      headers: { authorization: localStorage.getItem('token') },
    })
    // dispatch({
    //   type:ADMIN_EMPLOYEE_LIST ,
    //   payload: response.data.data,
    // });

    history.push(
      `/admin/organization/${response?.data?.data?.organization}/jobs`,
    )
  } catch (err) {
    dispatch({
      type: COMPANY_ERROR,
      payload: err.response?.data?.error,
    })
    // history.push("/");
  }
}
export const adminSendOwnerShip = (data, history) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/admin/transfer_ownership`,
      data,
      {
        headers: { authorization: localStorage.getItem('token') },
      },
    )

    // dispatch({
    //   type:ADMIN_EMPLOYEE_LIST ,
    //   payload: response.data.data,
    // });

    history.push(`/admin/organization`)
  } catch (err) {
    dispatch({
      type: COMPANY_ERROR,
      payload: err.response?.data?.error,
    })
    // history.push("/");
  }
}
export const adminDeleteJob = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/api/admin/delete/job`, data, {
      headers: { authorization: localStorage.getItem('token') },
    })
    return response
    // dispatch({
    //   type:ADMIN_EMPLOYEE_LIST ,
    //   payload: response.data.data,
    // });
  } catch (err) {
    dispatch({
      type: COMPANY_ERROR,
      payload: err.response.data.error,
    })
    // history.push("/");
  }
}
export const updateCompanyProfile = (data) => async (dispatch) => {
  try {
    let data1 = await axios.post(
      `${API_URL}/api/organizations/orgimage`,
      data,
      {
        headers: {
          authorization: localStorage.token,
        },
      },
    )
    return data1.data
  } catch (err) {
    dispatch({
      type: COMPANY_ERROR,
      payload: err.response.data.error,
    })
  }
}
export const deleteCompanyImage = (data) => async (dispatch) => {
  try {
    let data1 = await axios.post(
      `${API_URL}/api/organizations/orgimageRemove`,
      data,
      {
        headers: {
          authorization: localStorage.token,
        },
      },
    )
    return data1.data
  } catch (err) {
    dispatch({
      type: COMPANY_ERROR,
      payload: err.response.data.error,
    })
  }
}
export const getAllCompanies = () => async (dispatch) => {
  try {
    let data2 = await axios.get(
      `${API_URL}/api/organizations/all`,

      {
        headers: {
          authorization: localStorage.token,
        },
      },
    )

    return data2.data.data
  } catch (err) {
    dispatch({
      type: COMPANY_ERROR,
      payload: err.response.data.error,
    })
  }
}
export const viewOrganization = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/api/organizations/${id}`)
    dispatch({
      type: VIEW_COMPANY,
      payload: response.data.data,
    })
    return response
  } catch (err) {
    dispatch({
      type: COMPANY_ERROR,
      payload: err.response.data.error,
    })
  }
}

export const createOrganization = (body, history) => async (dispatch) => {
  try {
    await axios.post(`${API_URL}/api/organizations`, body, {
      headers: { authorization: localStorage.getItem('token') },
    })
    //  history.push(`/dashboard`);
  } catch (err) {
    dispatch({
      type: COMPANY_ERROR,
      payload: err.response.data.error,
    })
  }
}

export const editOrganization = (body, id, history) => async (dispatch) => {
  try {
    await axios.put(`${API_URL}/api/organizations/${id}`, body, {
      headers: { authorization: localStorage.getItem('token') },
    })
    history.push(`/company/${id}`)
  } catch (err) {
    dispatch({
      type: COMPANY_ERROR,
      payload: err.response.data.error,
    })
  }
}

export const validateOrganization = (body) => async (dispatch) => {
  try {
    await axios.post(`${API_URL}/api/organizations/validate`, body)
    dispatch({
      type: VALIDATE_COMPANY,
    })
  } catch (error) {
    dispatch({
      type: VALIDATE_COMPANY_ERROR,
    })
  }
}

export const joinOrganization = (orgCode) => async (dispatch) => {
  let orgId = localStorage.getItem('orgId')
  try {
    await axios.post(
      `${API_URL}/api/organizations/join`,
      { orgCode, orgId },
      {
        headers: { authorization: localStorage.getItem('token') },
      },
    )
  } catch (err) {
    dispatch({
      type: COMPANY_ERROR,
      payload: err.response.data.error,
    })
  }
}

export const approveRole = (orgID, body) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${API_URL}/api/organizations/${orgID}/approve`,
      { ...body },
      {
        headers: { authorization: localStorage.getItem('token') },
      },
    )

    localStorage.setItem('userApprovedData', JSON.stringify([]))
    dispatch({
      type: APPROVE_ROLE,
    })
    return res
  } catch (err) {
    dispatch({
      type: COMPANY_ERROR,
      payload: err.response.data.error,
    })
  }
}

export const editCompanyData = (body, orgID) => async (dispatch) => {
  try {
    await axios.put(
      `${API_URL}/api/organizations/${orgID}`,
      { ...body },
      {
        headers: { authorization: localStorage.getItem('token') },
      },
    )
    dispatch({
      type: APPROVE_ROLE,
    })
  } catch (err) {
    dispatch({
      type: COMPANY_ERROR,
      payload: err.response.data.error,
    })
  }
}
