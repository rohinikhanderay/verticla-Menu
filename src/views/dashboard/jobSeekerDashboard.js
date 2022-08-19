import React, { useEffect } from 'react'
// import { Transition } from '@headlessui/react';
import Navbar from '../../components/layouts/navbar'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as applicationActions from '../../store/application'
import * as profileActions from '../../store/profile'
import BetaSignage from '../../components/layouts/betaSignage'
// import { ArrowCircleRightIcon } from '@heroicons/react/outline';

const JobSeekerDashboard = ({
  getProfileApplications,
  getProfile,
  application,
  profile,
  loginVal,
}) => {
  useEffect(() => {
    getProfileApplications()
    getProfile()
  }, [getProfileApplications, getProfile])

  const firstThreeApplications = application.applications.slice(0, 3)

  return (
    <div className="pb-48">
      {/* <Navbar /> */}

      <div className="max-w-5xl px-2 mx-auto sm:px-4 lg:px-8 font-inter">
        <div className="h-40 px-10 pt-12 mt-12 bg-yellow-200 rounded-md shadow-lg md:h-64">
          <p className="text-3xl font-bold text-gray-700 md:text-4xl font-baskerville">
            Hello {profile.profile?.firstName}
          </p>
          <p className="mt-2 text-gray-700">
            {loginVal
              ? `Welcome!`
              : `Welcome to Nuleep! Check out our jobs and courses. `}
          </p>
        </div>
        <div className="items-center hidden h-64 mx-6 bg-white rounded-md shadow-lg md:flex -mt-28 ">
          <div className="ml-8 md:w-1/4">
            <p className="text-sm text-gray-500">Your newest applications</p>
            <p className="mt-1 text-3xl font-bold text-teal-700">
              View your Applications
            </p>
            <div className="flex items-center mt-4">
              <Link to="/applications" className="text-teal-700 ">
                View all
              </Link>
              <svg
                className="w-4 h-4 ml-2 text-teal-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </div>
          </div>
          <div className="hidden w-3/4 gap-4 mx-4 my-2 md:flex">
            {firstThreeApplications.length === 0 ? (
              <div className="text-gray-700">
                <p>No applications created yet.</p>
                <p className="mt-1">
                  Check out some open positions{' '}
                  <Link className="text-teal-600 underline" to="/jobs">
                    here.
                  </Link>
                </p>
              </div>
            ) : (
              firstThreeApplications.map((app) => {
                return (
                  <Link
                    to={`/applications/${app._id}`}
                    className="flex flex-col justify-between w-full h-56 p-4 rounded-md shadow "
                  >
                    <p className="font-bold tracking-wider text-teal-600">
                      {app.job?.organization ? app.job?.organization.name : ''}
                    </p>

                    <div>
                      <p className="mt-1 text-lg leading-tight text-gray-700 font-baskerville">
                        {app.job?.positionTitle}
                      </p>
                      <p className="mt-2 text-xs text-teal-800">
                        Applied on{' '}
                        {new Date(app.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="inline-block px-4 py-1 mt-2 text-xs text-green-800 bg-green-100 rounded-full">
                        Submitted
                      </p>
                    </div>
                  </Link>
                )
              })
            )}
            {/* <div className="w-full h-56 p-4 rounded-md shadow ">
                            <p className="text-teal-600 text-md font-baskerville">
                                Nuleep
                            </p>
                            <p>Position Title</p>
                            <p>Applied On: 08/21/21</p>
                            <p>Submitted</p>
                        </div>
                        <div className="w-full h-56 p-4 rounded-md shadow ">
                            <p className="text-teal-600 text-md font-baskerville">
                                Very Long title for a Company
                            </p>
                            <p className="text-lg text-gray-600">
                                Chicken Parm Sandwich Maker Extraordinare
                            </p>
                            <p>Applied On: 08/21/21</p>
                            <p>Submitted</p>
                        </div>
                        <div className="w-full h-56 p-4 rounded-md shadow ">
                            <p className="text-teal-600 text-md font-baskerville">
                                Nuleep
                            </p>
                            <p>Position Title</p>
                            <p>Applied On: 08/21/21</p>
                            <p>Submitted</p>
                        </div> */}
          </div>
        </div>

        {/* Action Items */}
        <div className="grid gap-4 mt-8 text-white grid-cols-2 sm:grid-cols-1">
          <Link
            to="/jobs"
            className="relative h-48 p-6 overflow-hidden bg-red-400 rounded-md shadow-md"
          >
            <div className="flex flex-col content-between">
              <p className="w-48 text-3xl font-bold font-baskerville">
                Discover New Jobs
              </p>
              <div className="flex items-center mt-4">
                <p className="">All Jobs</p>
                <svg
                  className="w-4 h-4 ml-2 "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </div>
            </div>
            <svg
              className="absolute top-0 right-0 -mt-12 -mr-20"
              width="302"
              height="302"
              viewBox="0 0 302 302"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.3"
                d="M143.084 127.905L143.179 127.85M249.022 123.178C220.866 139.434 192.71 155.737 163.318 172.659C133.007 190.159 107.498 204.887 77.6135 222.141L249.022 123.178ZM161.521 81.5806L150.525 62.5352C147.609 57.4841 142.805 53.7983 137.172 52.2887C131.538 50.7791 125.535 51.5694 120.484 54.4857L82.3932 76.4774C77.342 79.3937 73.6563 84.1971 72.1467 89.8309C70.6371 95.4647 71.4274 101.467 74.3437 106.519L85.3395 125.564L161.521 81.5806ZM133.742 275.375L267.06 198.404C272.111 195.488 275.797 190.685 277.307 185.051C278.816 179.417 278.026 173.414 275.11 168.363L220.13 73.1363C217.214 68.0852 212.411 64.3994 206.777 62.8898C201.143 61.3803 195.14 62.1705 190.089 65.0868L56.7715 142.058C51.7203 144.974 48.0345 149.777 46.525 155.411C45.0154 161.045 45.8057 167.048 48.7219 172.099L103.701 267.326C106.617 272.377 111.421 276.063 117.055 277.572C122.689 279.082 128.691 278.292 133.742 275.375Z"
                stroke="white"
                strokeWidth="22"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <Link
            to="/applications"
            className="relative h-48 p-6 overflow-hidden bg-yellow-400 rounded-md shadow-md"
          >
            <div className="flex flex-col content-between">
              <p className="w-48 text-3xl font-bold font-baskerville">
                View My Applications
              </p>
              <div className="flex items-center mt-4">
                <p className="">All Applications</p>
                <svg
                  className="w-4 h-4 ml-2 "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </div>
            </div>
            <svg
              className="absolute top-0 right-0 -mt-12 -mr-20"
              width="280"
              height="301"
              viewBox="0 0 280 301"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.3"
                d="M108.262 167.034L171.669 133.273L108.262 167.034ZM130.925 209.597L194.332 175.835L130.925 209.597ZM243.796 217.784L138.118 274.053C132.513 277.038 125.943 277.658 119.854 275.778C113.765 273.897 108.657 269.67 105.651 264.026L26.3314 115.058C23.3261 109.414 22.6707 102.815 24.5093 96.7138C26.348 90.6123 30.53 85.5077 36.1355 82.523L95.167 51.091C97.9698 49.5993 101.254 49.2898 104.298 50.2304L192.186 77.3742C195.231 78.3139 197.785 80.4269 199.288 83.2484L253.6 185.249C256.605 190.893 257.26 197.492 255.422 203.593C253.583 209.695 249.401 214.799 243.796 217.784Z"
                stroke="white"
                strokeWidth="22"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <Link
            to={`/profiles/${profile.profile._id}`}
            className="relative h-48 p-6 overflow-hidden bg-teal-300 rounded-md shadow-md"
          >
            <div className="flex flex-col content-between">
              <p className="w-48 text-3xl font-bold font-baskerville">
                View My Profile
              </p>
              <div className="flex items-center mt-4">
                <p className="">My Profile</p>
                <svg
                  className="w-4 h-4 ml-2 "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </div>
            </div>
            <svg
              className="absolute top-0 right-0 -mt-12 -mr-20"
              width="299"
              height="298"
              viewBox="0 0 299 298"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.3"
                d="M91.7544 239.433C111.449 218.476 136.25 202.952 163.734 194.376C192.226 185.438 221.305 184.477 248.552 190.246C248.552 190.246 210.28 179.777 164.596 194.107C118.913 208.438 91.7544 239.433 91.7544 239.433ZM176.573 115.587C179.404 124.613 178.518 134.399 174.108 142.792C169.698 151.186 162.126 157.499 153.058 160.344C143.99 163.189 134.169 162.331 125.755 157.96C117.341 153.59 111.023 146.064 108.192 137.038C105.361 128.012 106.248 118.226 110.657 109.833C115.067 101.439 122.639 95.1256 131.707 92.281C140.775 89.4365 150.596 90.2938 159.01 94.6646C167.424 99.0353 173.742 106.561 176.573 115.587ZM252.071 116.824C256.277 130.231 257.789 144.339 256.52 158.343C255.251 172.347 251.226 185.972 244.675 198.44C238.124 210.908 229.176 221.975 218.341 231.01C207.506 240.044 194.996 246.869 181.526 251.095C168.056 255.32 153.89 256.864 139.836 255.637C125.782 254.41 112.115 250.437 99.6169 243.944C87.1183 237.452 76.0323 228.567 66.9919 217.797C57.9516 207.027 51.1339 194.584 46.9281 181.177C38.4341 154.099 41.0946 124.741 54.3243 99.5606C67.554 74.3799 90.2693 55.4394 117.473 46.9057C144.677 38.372 174.14 40.9442 199.382 54.0564C224.624 67.1686 243.577 89.7467 252.071 116.824Z"
                stroke="white"
                strokeWidth="23"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <Link
            to={`/skill/${profile.profile._id}`}
            className="relative h-48 p-6 overflow-hidden bg-teal-300 rounded-md shadow-md"
          >
            <div className="flex flex-col content-between">
              <p className="w-48 text-3xl font-bold font-baskerville">
                Education & Skills
              </p>
              <div className="flex items-center mt-4">
                <p className="">Courses</p>
                <svg
                  className="w-4 h-4 ml-2 "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </div>
            </div>

            <svg
              className="absolute top-0 right-0 -mr-20"
              width="266"
              height="218"
              viewBox="0 0 266 218"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.3"
                d="M194 207H255V182.5C254.999 174.863 252.629 167.415 248.218 161.193C243.808 154.97 237.576 150.282 230.39 147.78C223.203 145.279 215.419 145.087 208.119 147.232C200.819 149.378 194.366 153.754 189.657 159.752L194 207ZM194 207H72H194ZM194 207V182.5C194 174.464 192.463 166.783 189.657 159.752L194 207ZM72 207H11V182.5C11.0006 174.863 13.3709 167.415 17.7815 161.193C22.1921 154.97 28.4239 150.282 35.6105 147.78C42.797 145.279 50.5814 145.087 57.8814 147.232C65.1814 149.378 71.6344 153.754 76.3432 159.752L72 207ZM72 207V182.5C72 174.464 73.5372 166.783 76.3432 159.752L72 207ZM76.3432 159.752C80.8737 148.383 88.6926 138.638 98.7912 131.774C108.89 124.91 120.805 121.241 133 121.241C145.195 121.241 157.11 124.91 167.209 131.774C177.307 138.638 185.126 148.383 189.657 159.752H76.3432ZM169.6 47.75C169.6 57.4967 165.744 66.8442 158.88 73.7362C152.016 80.6281 142.707 84.5 133 84.5C123.293 84.5 113.984 80.6281 107.12 73.7362C100.256 66.8442 96.4 57.4967 96.4 47.75C96.4 38.0033 100.256 28.6558 107.12 21.7638C113.984 14.8719 123.293 11 133 11C142.707 11 152.016 14.8719 158.88 21.7638C165.744 28.6558 169.6 38.0033 169.6 47.75V47.75ZM242.8 84.5C242.8 90.9978 240.229 97.2295 235.653 101.824C231.078 106.419 224.871 109 218.4 109C211.929 109 205.722 106.419 201.147 101.824C196.571 97.2295 194 90.9978 194 84.5C194 78.0022 196.571 71.7705 201.147 67.1759C205.722 62.5812 211.929 60 218.4 60C224.871 60 231.078 62.5812 235.653 67.1759C240.229 71.7705 242.8 78.0022 242.8 84.5ZM72 84.5C72 90.9978 69.4293 97.2295 64.8534 101.824C60.2775 106.419 54.0713 109 47.6 109C41.1287 109 34.9225 106.419 30.3466 101.824C25.7707 97.2295 23.2 90.9978 23.2 84.5C23.2 78.0022 25.7707 71.7705 30.3466 67.1759C34.9225 62.5812 41.1287 60 47.6 60C54.0713 60 60.2775 62.5812 64.8534 67.1759C69.4293 71.7705 72 78.0022 72 84.5Z"
                stroke="white"
                strokeWidth="22"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>{' '}
          <Link
            to={`/blogs`}
            className="relative h-48 p-6 overflow-hidden bg-teal-300 rounded-md shadow-md"
          >
            <div className="flex flex-col content-between">
              <p className="w-48 text-3xl font-bold font-baskerville">
                Discover New Blogs
              </p>
              <div className="flex items-center mt-4">
                <p className="">All Blogs</p>
                <svg
                  className="w-4 h-4 ml-2 "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </div>
            </div>

            <svg
              className="absolute top-0 right-0 -mr-20"
              width="266"
              height="218"
              viewBox="0 0 266 218"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.3"
                d="M194 207H255V182.5C254.999 174.863 252.629 167.415 248.218 161.193C243.808 154.97 237.576 150.282 230.39 147.78C223.203 145.279 215.419 145.087 208.119 147.232C200.819 149.378 194.366 153.754 189.657 159.752L194 207ZM194 207H72H194ZM194 207V182.5C194 174.464 192.463 166.783 189.657 159.752L194 207ZM72 207H11V182.5C11.0006 174.863 13.3709 167.415 17.7815 161.193C22.1921 154.97 28.4239 150.282 35.6105 147.78C42.797 145.279 50.5814 145.087 57.8814 147.232C65.1814 149.378 71.6344 153.754 76.3432 159.752L72 207ZM72 207V182.5C72 174.464 73.5372 166.783 76.3432 159.752L72 207ZM76.3432 159.752C80.8737 148.383 88.6926 138.638 98.7912 131.774C108.89 124.91 120.805 121.241 133 121.241C145.195 121.241 157.11 124.91 167.209 131.774C177.307 138.638 185.126 148.383 189.657 159.752H76.3432ZM169.6 47.75C169.6 57.4967 165.744 66.8442 158.88 73.7362C152.016 80.6281 142.707 84.5 133 84.5C123.293 84.5 113.984 80.6281 107.12 73.7362C100.256 66.8442 96.4 57.4967 96.4 47.75C96.4 38.0033 100.256 28.6558 107.12 21.7638C113.984 14.8719 123.293 11 133 11C142.707 11 152.016 14.8719 158.88 21.7638C165.744 28.6558 169.6 38.0033 169.6 47.75V47.75ZM242.8 84.5C242.8 90.9978 240.229 97.2295 235.653 101.824C231.078 106.419 224.871 109 218.4 109C211.929 109 205.722 106.419 201.147 101.824C196.571 97.2295 194 90.9978 194 84.5C194 78.0022 196.571 71.7705 201.147 67.1759C205.722 62.5812 211.929 60 218.4 60C224.871 60 231.078 62.5812 235.653 67.1759C240.229 71.7705 242.8 78.0022 242.8 84.5ZM72 84.5C72 90.9978 69.4293 97.2295 64.8534 101.824C60.2775 106.419 54.0713 109 47.6 109C41.1287 109 34.9225 106.419 30.3466 101.824C25.7707 97.2295 23.2 90.9978 23.2 84.5C23.2 78.0022 25.7707 71.7705 30.3466 67.1759C34.9225 62.5812 41.1287 60 47.6 60C54.0713 60 60.2775 62.5812 64.8534 67.1759C69.4293 71.7705 72 78.0022 72 84.5Z"
                stroke="white"
                strokeWidth="22"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>{' '}
        </div>
      </div>
      {/* / Action Items */}
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
})(JobSeekerDashboard)
