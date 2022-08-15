import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as applicationActions from '../../store/application'
import * as profileActions from '../../store/profile'
import Navbar from '../../components/layouts/navbar'
import { Redirect } from 'react-router-dom'
import Spinner from '../../components/spinner'
import { HomeIcon, PaperClipIcon } from '@heroicons/react/solid'
import parse from 'html-react-parser'

const Application = ({
  match,
  getProfile,
  history,
  application,
  profile,
  getIndividualApplication,
}) => {
  useEffect(() => {
    getProfile()
    getIndividualApplication(match.params.id, history)
  }, [getProfile, getIndividualApplication, match.params.id, history])
  useEffect(() => {
    getProfile()
  }, [])
  if (application.loading || !application.selectedApplication?.job) {
    return <Spinner />
  }

  if (
    profile.profile?._id !== application?.selectedApplication.profile._id &&
    profile.profile?.organization._id !==
      application.selectedApplication?.job.organization
  ) {
    return <Redirect to="/dashboard" />
  }

  let breadcrumbs = []

  if (profile?.profile.type === 'jobSeeker') {
    breadcrumbs = [
      { name: 'Applications', href: '/applications', current: false },
      {
        name: `${application.selectedApplication.job.positionTitle}`,
        href: '#',
        current: false,
      },
    ]
  }

  if (profile?.profile.type === 'recruiter') {
    breadcrumbs = [
      { name: 'My Jobs', href: '/applications', current: false },
      {
        name: `${application.selectedApplication.job.positionTitle}`,
        href: `/jobs/${application.selectedApplication.job._id}/view`,
        current: false,
      },
      {
        name: `${application?.selectedApplication.profile.firstName} ${application?.selectedApplication.profile.lastName}`,
        href: '#',
        current: true,
      },
    ]
  }
  // const stringToHTML = function (str) {
  //   var parser = new DOMParser()
  //   var doc = parser.parseFromString(str, 'text/html').body

  //   setTimeout(() => {
  //     if (document.getElementsByClassName('textPrintClass')) {
  //       document.getElementsByClassName('textPrintClass')[0].innerHTML =
  //         doc.innerHTML
  //     }
  //   }, 200)
  // }
  return (
    <div>
      <Navbar />
      <div className="relative z-0 min-h-screen bg-gray-100">
        <div className="mt-2 bg-white">
          <ol className="flex items-center px-8 py-4 mx-auto space-x-4 border-t max-w-7xl">
            <li>
              <div>
                <Link to="/" className="text-gray-400 hover:text-gray-500">
                  <HomeIcon
                    className="flex-shrink-0 w-5 h-5"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Home</span>
                </Link>
              </div>
            </li>
            {breadcrumbs.map((item) => (
              <li key={item.name}>
                <div className="flex items-center">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                  </svg>
                  <a
                    href={item.href}
                    className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <main className="py-10">
          {/* Page header */}
          <div className="max-w-3xl px-4 mx-auto sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
            <div className="flex items-center space-x-5">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full">
                    <p className="p-2 text-4xl font-bold text-center text-blue-900">
                      {application?.selectedApplication?.profile.firstName[0]}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {application?.selectedApplication.profile.firstName}{' '}
                  {application?.selectedApplication.profile.lastName}
                </h1>
                <p className="text-sm font-medium text-gray-500">
                  Applied for{' '}
                  <Link
                    to={`/jobs/${application?.selectedApplication.job._id}`}
                    className="text-gray-900"
                  >
                    {application.selectedApplication.job.positionTitle}
                  </Link>{' '}
                  on{' '}
                  <time dateTime="2020-08-25">
                    {new Date(
                      application?.selectedApplication.createdAt,
                    ).toLocaleDateString()}
                  </time>
                </p>
              </div>
            </div>
          </div>

          <div className="grid max-w-3xl gap-6 mx-auto mt-8 sm:px-6 lg:max-w-7xl">
            <div>
              {/* Description list*/}
              <section aria-labelledby="applicant-information-title">
                <div className="bg-white shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h2
                      id="applicant-information-title"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Applicant Information
                    </h2>
                    <p className="max-w-2xl mt-1 text-sm text-gray-500">
                      Personal details and application.
                    </p>
                  </div>
                  <div className="px-4 py-5 border-t border-gray-200 sm:px-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Application for
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {application.selectedApplication?.job.positionTitle}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Email address
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {application.selectedApplication?.profile.email}
                        </dd>
                      </div>
                      {application.selectedApplication?.coverLetter && (
                        <div className="col-span-2">
                          <dt className="text-sm font-medium text-gray-500">
                            Cover Letter
                          </dt>
                          <p className="mt-1 text-sm text-gray-900 textPrintClass">
                            {parse(
                              application.selectedApplication?.coverLetter,
                            )}
                            {/* {stringToHTML(
                              application.selectedApplication?.coverLetter,
                            )} */}
                          </p>
                        </div>
                      )}
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">
                          Applicant Skills
                        </dt>
                        <div className="mt-2">
                          {application.selectedApplication &&
                            [
                              ...application?.selectedApplication?.skills,
                              ...application?.selectedApplication?.profile
                                ?.skills,
                            ].map((skill, index) => (
                              <p className="inline px-2 py-1 mr-1 text-green-800 bg-green-100 rounded-full">
                                {skill}
                              </p>
                            ))}
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">
                          Attachments
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          <ul className="border border-gray-200 divide-y divide-gray-200 rounded-md">
                            {application.selectedApplication.profile.resume.map(
                              (attachment) => (
                                <li
                                  key={attachment.name}
                                  className="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                                >
                                  <div className="flex items-center flex-1 w-0">
                                    <PaperClipIcon
                                      className="flex-shrink-0 w-5 h-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                    <span className="flex-1 w-0 ml-2 truncate">
                                      {attachment.fileName}
                                    </span>
                                  </div>
                                  <div className="flex-shrink-0 ml-4">
                                    <a
                                      href={attachment.fullUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="font-medium text-blue-600 hover:text-blue-500"
                                    >
                                      View
                                    </a>
                                  </div>
                                </li>
                              ),
                            )}
                          </ul>
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <Link
                      to={`/profiles/${application.selectedApplication?.profile._id}`}
                      className="block px-4 py-4 text-sm font-medium text-center text-gray-500 bg-gray-50 hover:text-gray-700 sm:rounded-b-lg"
                    >
                      View full profile
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  application: state.application,
  profile: state.profile,
})

export default connect(mapStateToProps, {
  ...applicationActions,
  ...profileActions,
})(Application)
