import React, { useEffect } from 'react'
import Navbar from '../../components/layouts/navbar'
import { connect } from 'react-redux'
import * as profileActions from '../../store/profile'
import * as applicationActions from '../../store/application'
import * as jobActions from '../../store/job'
import BetaSignage from '../../components/layouts/betaSignage'
import {
  BadgeCheckIcon,
  ClockIcon,
  UsersIcon,
  BeakerIcon,
} from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { stripeBillingPortal } from '../../store/profile/index'
import { useHistory, useLocation } from 'react-router-dom'
import { getProfile } from '../../store/profile/index'
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const RecruiterDashboard = ({
  profile,
  application,
  jobs,
  getRecruiterApplications,
  getAllRecruiterJobs,
  loading,
}) => {
  useEffect(() => {
    getRecruiterApplications()
    getAllRecruiterJobs()
  }, [getRecruiterApplications, getAllRecruiterJobs])

  const search = useLocation().search
  const dispatch = useDispatch()
  const profileData = useSelector((state) => state.profile)
  const history = useHistory()
  useEffect(() => {
    if (new URLSearchParams(search).get('success')) {
      dispatch(getProfile())
    }
  }, [])

  if (
    !profileData?.profile?.userRef?.subscription &&
    profileData?.profile?.organizationRole === 'admin'
  ) {
    history.push('/subscription')
  }
  const editInfo = async () => {
    await dispatch(
      stripeBillingPortal({
        customerid: profileData?.profile?.userRef?.subscription?.customer_Id,
      }),
    ).then((data) => {
      window.location.href = data.url
    })
  }

  const actions = [
    {
      icon: ClockIcon,
      name: 'Post a new Job',
      href: '/jobs/new',
      iconForeground: 'text-teal-700',
      iconBackground: 'bg-teal-50',
      description: 'Post a new job',
      disabled: false,
    },
    {
      icon: BadgeCheckIcon,
      name: 'View Applications',
      href: '/applications',
      iconForeground: 'text-purple-700',
      iconBackground: 'bg-purple-50',
      description: 'View applications for all posted positions',
      disabled: false,
    },
    {
      icon: UsersIcon,
      name: 'View Company Profile',
      href: `/companyProfile/${
        profileData && profileData?.profile?.organization?._id
      }`,
      iconForeground: 'text-sky-700',
      iconBackground: 'bg-sky-50',
      description: 'View and manage your company page',
      disabled: false,
    },
    {
      icon: BeakerIcon,
      name: 'Nuleep Labs',
      href: '#',
      iconForeground: 'text-yellow-700',
      iconBackground: 'bg-yellow-50',
      description: 'Coming Soon!',
      disabled: true,
    },
    {
      icon: BeakerIcon,
      name: 'Billing Portal',
      href: 'javascript:void(0)',
      iconForeground: 'text-yellow-700',
      iconBackground: 'bg-yellow-50',
      description: 'View and manage your billing information',
      disabled: false,
    },
    {
      icon: BeakerIcon,
      name: 'Blog',
      href: '/blogs',
      iconForeground: 'text-yellow-700',
      iconBackground: 'bg-yellow-50',
      description: 'View blogs.',
      disabled: false,
    },
  ]
  return (
    <div>

      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <main className="pb-8 pb-48 mt-8">
          {profile?.profile.organizationRole === 'unapproved' ? (
            <p className="mt-24 text-2xl text-center text-gray-500">
              Awaiting Organization Approval
            </p>
          ) : (
            <div className="">
              <h1 className="sr-only">Profile</h1>
              <div
                style={{ display: loading ? 'block' : 'none' }}
                className="border mb-6 py-12 sm:py-6 border-gray-300 rounded-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="80"
                  height="80"
                  viewBox="0 0 24 24"
                  className="m-auto"
                  fill="#0F9488"
                >
                  <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.25 8.891l-1.421-1.409-6.105 6.218-3.078-2.937-1.396 1.436 4.5 4.319 7.5-7.627z" />
                </svg>
              </div>
              {/* Main 3 column grid */}
              <div className="grid items-start grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
                {/* Left column */}
                <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                  {/* Welcome panel */}

                  <section aria-labelledby="profile-overview-title">
                    <div className="overflow-hidden bg-white rounded-lg shadow">
                      <h2 className="sr-only" id="profile-overview-title">
                        Profile Overview
                      </h2>
                      <div className="p-6 bg-white">
                        <div className="sm:flex sm:items-center sm:justify-between">
                          <div className="sm:flex sm:justify-center sm:w-full sm:space-x-5">
                            <div className="flex-shrink-0">
                              <div className="flex items-center justify-center w-20 h-20 text-3xl bg-blue-100 rounded-full">
                                <p className="p-2 font-bold text-center text-blue-800 font-nunito">
                                  {profile?.profile.firstName.charAt(0)}
                                </p>
                              </div>
                            </div>

                            <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                              <p className="text-sm font-medium text-gray-600">
                                Welcome,
                              </p>
                              <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                                {profile?.profile.firstName}
                              </p>
                              <p className="text-sm font-medium text-gray-600">
                                {profile?.profile.title} of{' '}
                                {profile?.profile.organization &&
                                  profile?.profile.organization.name}
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-center mt-5 sm:mt-0">
                            {/* <Link
                                                        to={`/profiles/${profile.profile?._id}`}
                                                        className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                                                    >
                                                        View profile
                                                    </Link> */}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 border-t border-gray-200 divide-y divide-gray-200 bg-gray-50 sm:grid-cols-2 sm:divide-y-0 sm:divide-x">
                        <div className="px-6 py-5 text-sm font-medium text-center grid-row-3">
                          {/* <span className="text-gray-900">
                            {application.recruiterApplications?.length}
                          </span>{" "}
                          <span className="text-gray-600">
                            Open Application(s)
                          </span> */}

                          <Link
                            className="text-gray-600"
                            to={`company/apllication`}
                          >
                            {application.recruiterApplications?.length} Open
                            Application(s)
                          </Link>
                        </div>
                        <div className="px-6 py-5 text-sm font-medium text-center grid-row-3">
                          {/* <span className="text-gray-900">
                            {jobs.recruiterJobs?.length}
                          </span>{" "}
                          <span className="text-gray-600">Job(s) Posted</span> */}
                          <Link className="text-gray-600" to={`company/jobs`}>
                            {jobs.recruiterJobs?.length} Job(s) Posted
                          </Link>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Actions panel */}
                  <section aria-labelledby="quick-links-title">
                    <div className="overflow-hidden bg-gray-200 divide-y divide-gray-200 rounded-lg shadow  lg:divide-y-0 md:grid md:grid-cols-2 lg:gap-y-0.5">
                      <h2 className="sr-only" id="quick-links-title">
                        Quick links
                      </h2>
                      {actions.map((action, actionIdx) => (
                        <div
                          key={action.name}
                          className={classNames(
                            actionIdx === 0
                              ? 'rounded-tl-lg sm:rounded-tr-none'
                              : '',
                            actionIdx === 1 ? '' : '',
                            actionIdx === actions.length - 2 ? '' : '',
                            actionIdx === actions.length - 1
                              ? 'rounded-br-lg sm:rounded-bl-none'
                              : '',
                            'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500 border',
                          )}
                          onClick={() => {
                            if (actionIdx === 4) {
                              editInfo()
                            }
                          }}
                        >
                          <div>
                            <span
                              className={classNames(
                                action.iconBackground,
                                action.iconForeground,
                                'rounded-lg inline-flex p-3 ring-4 ring-white',
                              )}
                            >
                              <action.icon
                                className="w-6 h-6"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                          <div className="mt-8">
                            <h3 className="text-lg font-medium">
                              <Link
                                to={action.href}
                                className="focus:outline-none"
                              >
                                {/* Extend touch target to entire panel */}
                                <span
                                  className="absolute inset-0"
                                  aria-hidden="true"
                                />
                                {action.name}
                              </Link>
                            </h3>
                            <p className="mt-2 text-sm text-gray-500">
                              {action.description}
                            </p>
                          </div>
                          <span
                            className="absolute text-gray-300 pointer-events-none top-6 right-6 group-hover:text-gray-400"
                            aria-hidden="true"
                          >
                            <svg
                              className="w-6 h-6"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                            </svg>
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                {/* Right column */}
                <div className="grid grid-cols-1 gap-4">
                  {/* Announcements */}
                  <section aria-labelledby="announcements-title">
                    <div className="overflow-hidden bg-white rounded-lg shadow">
                      <div className="p-6">
                        <h2
                          className="text-base font-medium text-gray-900"
                          id="announcements-title"
                        >
                          Announcements
                        </h2>
                        <p className="my-12 text-center text-gray-300">
                          No new announcements
                        </p>
                        {/* <div className="mt-6">
                                                <a
                                                    href="/"
                                                    className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                                                >
                                                    View all
                                                </a>
                                            </div> */}
                      </div>
                    </div>
                  </section>

                  {/* Recent Hires */}
                  <section aria-labelledby="recent-hires-title">
                    <div className="overflow-hidden bg-white rounded-lg shadow">
                      <div className="p-6">
                        <h2
                          className="text-base font-medium text-gray-900"
                          id="recent-hires-title"
                        >
                          Recent Applications
                        </h2>
                        <div className="flow-root mt-6">
                          <ul className="-my-5 divide-y divide-gray-200">
                            {application.recruiterApplications
                              ?.slice(0, 3)
                              .map((app) => (
                                <li key={app._id} className="py-4">
                                  <div className="flex items-center space-x-4">
                                    <div className="flex items-center justify-center w-10 h-10 text-lg bg-blue-100 rounded-full">
                                      <p className="p-2 font-bold text-center text-blue-800 font-nunito">
                                        {app.profile.firstName[0]}
                                      </p>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-gray-900 truncate">
                                        {app.profile.firstName}{' '}
                                        {app.profile.lastName}
                                      </p>
                                      <p className="text-sm text-gray-500 truncate">
                                        {app.job.positionTitle}
                                      </p>
                                    </div>
                                    <div>
                                      <Link
                                        to={`applications/${app._id}`}
                                        className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                                      >
                                        View
                                      </Link>
                                    </div>
                                  </div>
                                </li>
                              ))}
                          </ul>
                        </div>
                        <div className="mt-6">
                          <Link
                            to="/applications"
                            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                          >
                            View More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  application: state.application,
  jobs: state.jobs,
})

export default connect(mapStateToProps, {
  ...applicationActions,
  ...profileActions,
  ...jobActions,
})(RecruiterDashboard)
