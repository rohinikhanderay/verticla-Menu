import React, { useState, useEffect } from 'react'
import {
  BriefcaseIcon,
  DocumentDuplicateIcon,
  UserGroupIcon,
} from '@heroicons/react/solid'
import Navbar from '../../components/layouts/navbar'
import * as organizationActions from '../../store/company'
import * as profileActions from '../../store/profile'
import Spinner from '../../components/spinner'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { stripePayament } from '../../store/profile/index'
import { useLocation, useHistory } from 'react-router-dom'
import img_19 from '../../assets/images/2.gif'
import ModelComponent from '../admin/Components/modelComponent'
import { removeEmp } from '../../store/company/index'
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const CompanyDashboard = ({
  viewRecruiterOrganization,
  approveRole,
  getProfile,
  type,
  profile,
}) => {
  const [tab, setTab] = useState([
    { name: 'Jobs', current: false },
    { name: 'Applications', current: false },
    { name: 'Employees', current: false },
  ])
  const profileData = useSelector((state) => state.profile)
  const company = useSelector((state) => state.company)

  const dipatch = useDispatch()
  const history = useHistory()
  const search = useLocation().search
  const [changedRoles, setChangedRoles] = useState([])
  const [approveLoader, setApproveLoader] = useState()
  const [isShow, setIsShow] = useState(false)
  const [removeUser, setRemoveUSer] = useState('')
  console.log(type)

  const dispatch = useDispatch()
  const onTabClick = (index) => {
    const list = [
      { name: 'Jobs', current: false },
      { name: 'Applications', current: false },
      { name: 'Employees', current: false },
    ]
    list[index].current = true
    setTab(list)
  }

  useEffect(() => {
    if (type === 'apllication') {
      onTabClick(1)
    }
    if (type === 'jobs') {
      onTabClick(0)
    }

    if (type === 'employees') {
      onTabClick(2)
    }

    // if (
    //   history.location.pathname.split('/').length == 2 ||
    //   history.location.pathname.split('/')[2].length == 24
    // ) {
    //   onTabClick(0)
    // }
  }, [])
  useEffect(() => {
    if (
      new URLSearchParams(search).get('success') &&
      company &&
      company.orgDetails != null &&
      JSON.parse(localStorage.getItem('userApprovedData'))?.length !== 0
    ) {
      let data = JSON.parse(localStorage.getItem('userApprovedData'))

      if (data?.length === 0) return

      const res = data?.filter(
        (item) => item.employeeID == localStorage.getItem('selId'),
      )

      const body = {
        id: res && res[0]?.employeeID,
        role: res && res[0]?.tabValue,
      }

      approveRole(
        company && company.orgDetails?.data.organization._id,
        body,
      ).then((res) => {
        if (res?.data) {
          viewRecruiterOrganization()
        }
      })
    }
  }, [company.orgDetails])

  useEffect(() => {
    viewRecruiterOrganization()
    getProfile()
  }, [viewRecruiterOrganization, getProfile])

  const removeUsers = (rId, uId) => {
    dispatch(removeEmp({ recId: rId, uId: uId })).then((res) => {
      viewRecruiterOrganization()
    })
  }

  if (profile.loading) return <Spinner />

  const updateRoles = (id, tabValue) => {
    // ? Get current list of roles
    const list = changedRoles

    // ? Check if ID exists in array
    for (var i = 0; i < list.length; i++) {
      if (list[i].employeeID === id) {
        list[i].tabValue = tabValue
        setChangedRoles(list)
        return
      }
    }

    localStorage.setItem(
      'userApprovedData',
      JSON.stringify([...changedRoles, { employeeID: id, tabValue }]),
    )
    // ? Else push new item to array
    setChangedRoles([...changedRoles, { employeeID: id, tabValue }])
  }

  const submitRole = (id) => {
    if (!profileData?.profile?.userRef?.subscription) {
      history.push('/subscription')
    } else {
      localStorage.setItem('selId', id)
      localStorage.setItem(
        'userApprovedData',
        JSON.stringify([
          {
            employeeID: id,
            tabValue: 'user',
          },
        ]),
      )
      const sub = profile?.profile?.userRef?.subscription
      dispatch(
        stripePayament({
          customer_id: sub.customer_Id,
          productId: sub.plan_id,
          approve: true,
        }),
      ).then((res) => {
        //console.log(res)
        window.location.href = res.url
      })
    }
  }
  const showModel = (id, uId) => {
    setRemoveUSer({ rId: id, uId: uId })
    setIsShow(true)
  }
  const hideModel = () => {
    setRemoveUSer('')
    setIsShow(false)
  }
  const renderJobs = () => {
    return (
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              <table className="w-full table-fixed table-div divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Requisition Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Position
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Posted By
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Dated Posted
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Closing Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Number of Applicants
                    </th>

                    {/* <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">View</span>
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {company.orgDetails?.data.jobs.map((job, jobIdx) => (
                    <tr
                      key={job?._id}
                      className={jobIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      <td
                        className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap cursor-pointer"
                        onClick={() => {
                          // history.push(`/jobs/${job._id}`)
                          dispatch({type: 'JobDesc', jobId: job._id})
                        }}
                      >
                        {job?.requisitionNumber}
                      </td>
                      <td
                        className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap cursor-pointer"
                        onClick={() => {
                          // history.push(`/jobs/${job._id}`)
                          dispatch({type: 'JobDesc', jobId: job._id})
                        }}
                      >
                        {job.positionTitle}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {job.recruiter?.firstName} {job.recruiter?.lastName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {job?.location}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {new Date(job.postingDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {new Date(job.closingDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {job?.applications ? job?.applications?.length : 0}
                      </td>

                      {/* <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <Link
                          to={`/jobs/${job._id}`}
                          className="text-teal-600 hover:text-teal-900"
                        >
                          View
                        </Link>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderApplications = () => {
    return (
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Applicant
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Req. Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Position
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Date Applied
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Closing Date
                    </th>
                    {/* <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">View</span>
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {company.orgDetails?.data.applications.map((app, appIdx) => (
                    <tr
                      key={app._id}
                      className={`cursor-pointer ${
                        appIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td
                        className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap "
                        onClick={() => {
                          // history.push(`/profiles/${app.profile?._id}`)
                          dispatch({type: 'title', title: 'Profiles'})
                          dispatch({type: 'My Profile', profileId: app.profile?._id})
                        }}
                      >
                        {app.profile?.firstName} {app.profile?.lastName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap ">
                        {app.job?.requisitionNumber}
                      </td>
                      <td
                        className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                        onClick={() => {
                          // history.push(`/applications/${app._id}`)
                          dispatch({type: 'title', title: 'My Applications'})
                          dispatch({type: 'My Applications'})
                        }}
                      >
                        {app.job?.positionTitle}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {app.status}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {new Date(app.job.closingDate).toLocaleDateString()}
                      </td>
                      {/* <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <Link
                          to={`/applications/${app._id}`}
                          className="text-teal-600 hover:text-teal-900"
                        >
                          View
                        </Link>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderEmployees = () => {
    return (
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Approved
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Role
                    </th>
                    {profile.profile?.organizationRole === 'admin' && (
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Action
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {company.orgDetails?.data.employees.map(
                    (employee, appIdx) => (
                      <tr
                        key={employee._id}
                        className={appIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                          {employee.firstName} {employee.lastName}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {employee.title}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 capitalize whitespace-nowrap">
                          {employee.organizationApproved.toString() ===
                          'true' ? (
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                              <p className="ml-2">
                                {employee.organizationApproved.toString()}
                              </p>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                              <p className="ml-2">
                                {employee.organizationApproved.toString()}
                              </p>
                            </div>
                          )}
                        </td>
                        {profile.profile?.organizationRole !== 'admin' ? (
                          <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {employee.organizationRole}
                          </td>
                        ) : (
                          <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                            <select
                              id="location"
                              name="location"
                              className="block py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                              defaultValue={employee.organizationRole}
                              onChange={(e) =>
                                updateRoles(employee._id, e.target.value)
                              }
                            >
                              <option value="user">User</option>
                              <option value="admin">Admin</option>
                              {/* <option value="unapproved">
                                                                Unapproved
                                                            </option> */}
                            </select>
                          </td>
                        )}

                        {profile.profile?.organizationRole === 'admin' &&
                          employee.organizationRole != 'admin' && (
                            <td
                              onClick={() => {
                                if (
                                  employee.organizationApproved.toString() !=
                                  'true'
                                ) {
                                  setApproveLoader(appIdx)
                                  submitRole(employee._id)
                                }
                                //  console.log(approveLoader,appIdx,approveLoader==appIdx)
                              }}
                              className="px-6 py-4 text-sm text-teal-600 whitespace-nowrap"
                            >
                              <div className="flex">
                                <button
                                  type="button"
                                  style={{
                                    cursor:
                                      employee.organizationApproved.toString() ==
                                      'true'
                                        ? 'not-allowed'
                                        : '',
                                    opacity:
                                      employee.organizationApproved.toString() ==
                                      'true'
                                        ? '0.5'
                                        : '1',
                                  }}
                                  className="inline-flex justify-center px-4 py-2 ml-3 font-medium text-white bg-teal-600 border border-transparent rounded-md shadow-sm text-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                >
                                  Approve{' '}
                                </button>
                                <span>
                                  {' '}
                                  <img
                                    className="ml-3 mt-2 w-5 sm:w-7 h-5 "
                                    src={img_19}
                                    style={{
                                      display:
                                        approveLoader === appIdx
                                          ? 'block'
                                          : 'none',
                                    }}
                                  ></img>
                                </span>
                                {employee.organizationApproved.toString() ==
                                'false' ? (
                                  ''
                                ) : (
                                  <button
                                    type="button"
                                    className="inline-flex justify-center px-4 py-2 ml-3 font-medium text-white bg-teal-600 border border-transparent rounded-md shadow-sm text-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                    onClick={() => {
                                      if (employee?.jobCount != 0) {
                                        showModel(
                                          employee._id,
                                          employee?.userRef,
                                        )
                                      } else {
                                        removeUsers(
                                          employee._id,
                                          employee?.userRef,
                                        )
                                      }
                                    }}
                                  >
                                    Remove{' '}
                                  </button>
                                )}
                              </div>
                            </td>
                          )}
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-64 font-inter">
      {isShow ? (
        <ModelComponent
          isShow={isShow}
          hideModel={hideModel}
          removeEmployee={removeUser}
          activePage={''}
          type="WEB"
          devMeth={() => viewRecruiterOrganization()}
          orgId={company && company.orgDetails?.data.organization._id}
          employee={company && company.orgDetails?.data.employees}
        />
      ) : (
        ''
      )}
      <div className="px-4 bg-teal-600">
        <div className="items-center max-w-5xl py-12 mx-auto md:py-0 md:flex md:h-96">
          <div className="text-center md:w-1/2 text-teal-50 md:text-left">
            <p className="text-3xl font-baskerville">
              {company.orgDetails?.data.organization.name} Company Dashboard
            </p>
            <p className="mt-6 font-semibold tracking-wider">
              Welcome back, {profile?.profile.firstName}
            </p>
            <p className="mt-2 leading-relaxed">
              View your company details, see open jobs and applications, and
              manage your employees here.
            </p>
            <p className="mt-4">Nuleep Company Code:</p>
            <p className="inline-block px-4 py-2 mt-2 font-bold border rounded-md border-teal-50">
              {company.orgDetails?.data.organization.orgCode}
            </p>
            {/* {company.orgDetails?.data?.organization?.organizationRole ==
              'admin' && (
              <div>
                <p
                  onClick={() => {
                    history.push(
                      `/company/${company.orgDetails?.data.organization._id}/edit`,
                    )
                  }}
                  className="inline-flex px-4 py-2 mt-2 font-bold border rounded-md border-teal-50 items-center cursor-pointer"
                >
                  Edit company{' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="#fff"
                    className="ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 14.45v6.55h-16v-12h6.743l1.978-2h-10.721v16h20v-10.573l-2 2.023zm1.473-10.615l1.707 1.707-9.281 9.378-2.23.472.512-2.169 9.292-9.388zm-.008-2.835l-11.104 11.216-1.361 5.784 5.898-1.248 11.103-11.218-4.536-4.534z" />
                  </svg>
                </p>
              </div>
            )} */}
          </div>
          <div className="justify-between gap-4 text-teal-600 md:flex md:w-1/2 cursor-pointer">
            <div
              onClick={() => {
                onTabClick(0)
                // history.push('/company/jobs')
              }}
              className="flex items-center justify-between p-4 mt-4 bg-teal-100 rounded-md md:mt-0 md:items-start md:flex-col md:h-48 md:w-1/3"
            >
              <div>
                <p className="text-3xl font-baskerville">
                  {company.orgDetails?.jobCount}
                </p>
                <p>Open Jobs</p>
              </div>
              <BriefcaseIcon className="h-7 w-7" />
            </div>
            <div
              onClick={() => {
                onTabClick(1)
                // history.push('/company/apllication')
              }}
              className="flex items-center justify-between p-4 mt-2 bg-teal-100 rounded-md md:mt-0 md:items-start md:flex-col md:h-48 md:w-1/3 cursor-pointer"
            >
              <div>
                <p className="text-3xl font-baskerville">
                  {company.orgDetails?.applicationCount}
                </p>
                <p>Open Applications</p>
              </div>
              <DocumentDuplicateIcon className="h-7 w-7" />
            </div>
            <div
              onClick={() => {
                onTabClick(2)
                // history.push('/company/employees')
              }}
              className="flex items-center justify-between p-4 mt-2 bg-teal-100 rounded-md md:mt-0 md:items-start md:flex-col md:h-48 md:w-1/3 cursor-pointer"
            >
              <div>
                <p className="text-3xl font-baskerville">
                  {company.orgDetails?.employeeCount}
                </p>
                <p>Employee Count</p>
              </div>
              <UserGroupIcon className="h-7 w-7" />
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-5xl px-4 mx-auto mt-4">
        {/* <div className="sm:hidden">
                    <label htmlFor="tabs" className="sr-only">
                        Select a tab
                    </label>
                    <select
                        id="tabs"
                        name="tabs"
                        className="block w-full py-2 pl-3 pr-10 text-base border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                        defaultValue={tab.find((item) => item.current).name}
                    >
                        {tab.map((item) => (
                            <option key={item.name}>{item.name}</option>
                        ))}
                    </select>
                </div> */}
        <div className="block">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px space-x-8" aria-label="Tabs">
              {tab &&
                tab.map((item, index) => (
                  <div
                    key={item.name}
                    onClick={() => onTabClick(index)}
                    className={classNames(
                      item.current
                        ? 'border-teal-500 text-teal-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                      'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer',
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </div>
                ))}
            </nav>
          </div>
        </div>
        {tab && tab[0].current && <div className="mt-4">{renderJobs()}</div>}

        {tab && tab[1].current && (
          <div className="mt-4">{renderApplications()}</div>
        )}

        {tab && tab[2].current && (
          <div className="mt-4">{renderEmployees()}</div>
        )}
      </main>
    </div>
  )
}

const mapStateToProps = (state) => ({
  company: state.company,
  profile: state.profile,
})

export default connect(mapStateToProps, {
  ...profileActions,
  ...organizationActions,
})(CompanyDashboard)
