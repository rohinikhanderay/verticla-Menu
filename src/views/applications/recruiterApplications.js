import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as jobActions from '../../store/job'
import * as applicationActions from '../../store/application'
import noJobsImg from '../../assets/images/No-Jobs.png'
import {
  CalendarIcon,
  LocationMarkerIcon,
  UsersIcon,
} from '@heroicons/react/solid'
import {useDispatch} from 'react-redux'

const RecruiterApplicationContainer = ({
  getAllRecruiterJobs,
  getRecruiterApplications,
  jobs,
  application,
}) => {

  const dispatch = useDispatch()

  useEffect(() => {
    getAllRecruiterJobs()
    getRecruiterApplications()
  }, [getAllRecruiterJobs, getRecruiterApplications])
  const [itemSel, setItemSel] = useState([])
  const hanleExpand = (ix) => {
    if (itemSel.some((x) => x.key == ix)) {
      setItemSel(itemSel.filter((x) => x.key !== ix))
    } else {
      setItemSel([...itemSel, { key: ix }])
    }
  }
  useEffect(() => {
    console.log(itemSel)
  }, [itemSel])
  const renderJobs = () => {
    const results = []
    jobs.recruiterJobs?.forEach((job, index) => {
      results.push(
        <li key={job._id}>
          <div to={`/jobs/${job._id}/view`} className="block hover:bg-gray-50 cursor-pointer" onClick={() => {
            dispatch({type: 'View Jobs', jobId: job._id})
          }}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-teal-600 truncate">
                  {job.positionTitle}
                </p>
                <div className="flex flex-shrink-0 ml-2">
                  <p className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                    {job.jobType}
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:flex xs:block sm:justify-between">
                <div className="sm:flex xs:block">
                  <p className="flex items-center text-sm text-gray-500">
                    <UsersIcon
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    {job.department ? (
                      <p>{job.department}</p>
                    ) : (
                      <p className="text-gray-400">No department listed</p>
                    )}
                  </p>
                  <p className="flex items-center mt-2 xs:ml-0 text-sm text-gray-500 sm:mt-0 sm:ml-6">
                    <LocationMarkerIcon
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    {job?.location}
                  </p>
                </div>
                <div className="flex items-center mt-2  text-sm text-gray-500 sm:mt-0">
                  <CalendarIcon
                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <p>
                    Closing on{' '}
                    <time
                      dateTime={new Date(job.closingDate).toLocaleDateString()}
                    >
                      {new Date(job.closingDate).toLocaleDateString()}
                    </time>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`${itemSel.some((x) => x.key === index) ? 'acco-btn-active' : ''
              } px-4 py-4 acco-btn`}
          >
            <button
              onClick={() => {
                hanleExpand(index)
              }}
              type="button"
              className="group bg-white rounded-md bg-teal-600  inline-flex items-center text-sm

        font-medium hover:text-white border-0  px-3 py-2 text-white"
            >
              Applications
              <svg
                className="ml-2 h-4 w-4 group-hover:text-white text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <div className="mt-4 sm:w-full sm:overflow-x-auto cus-scroll">
              {itemSel.some((x) => x.key === index) ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        #
                      </th>
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
                        Closing Date
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {job?.applications.length != 0 ? (
                      renderApplications(job)
                    ) : (
                      <tr className="text-center">
                        {' '}
                        <td colSpan="5" className="pt-5 text-gray-500">
                          No applications
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : (
                ''
              )}
            </div>
          </div>
        </li>,
      )
    })
    return results
  }

  const renderApplications = (job) => {
    console.log(job)
    const results = []
    job &&
      job?.applications?.forEach((app, index) => {
        results.push(
          <tr
            key={app._id}
            className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
          >
            <td className="px-6 py-4 text-sm font-medium text-gray-500 whitespace-nowrap">
              {index + 1}
            </td>
            <td className="px-6 py-4 text-sm font-medium text-gray-500 whitespace-nowrap">
              {app?.profile?.fullName}
            </td>
            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
              {job?.positionTitle}
            </td>
            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
              {app?.status}
            </td>
            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
              {new Date(job?.closingDate).toLocaleDateString()}
            </td>
            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
              <Link
                to={`/applications/${app._id}`}
                className="text-teal-600 hover:text-teal-900"
              >
                View
              </Link>
            </td>
          </tr>,
        )
      })
    return results
  }
  return (
    <div>
      <div className="py-10">
        <main className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-700">
            Applications
          </h1>
          <div>
            <div className="flex justify-between gap-6 mt-8">
              <div className="w-full p-4 border rounded">
                <p>{application.recruiterApplications?.length}</p>
                <p>Total Applicants</p>
              </div>
              <div className="w-full p-4 border rounded">
                <p>{jobs.recruiterJobs?.length}</p>
                <p>Open Jobs</p>
              </div>
            </div>

            <p className="mt-12 text-3xl font-bold leading-tight text-gray-700">
              Jobs
            </p>
            <div
              className={`mt-4 overflow-hidden bg-white sm:rounded-md ${jobs.recruiterJobs?.length != 0 ? 'shadow' : ''
                } `}
            >
              {jobs.recruiterJobs?.length != 0 ? (
                <ul className="divide-y divide-gray-200">{renderJobs()}</ul>
              ) : (
                <div className="">
                  <div className="text-center  text-4xl xs:text-2xl sm:text-3xl pt-12">
                    <h1 className="mb-3 xs:mb-0 sm:mb-0">
                      You have no jobs posted.
                    </h1>
                    <h1>
                      Post jobs{' '}
                      <Link
                        to="/jobs/new"
                        className="text-teal-600 underline cursor-pointer"
                      >
                        here.
                      </Link>
                    </h1>
                  </div>
                  <img
                    src={noJobsImg}
                    width="400"
                    heigh=""
                    className="m-auto mt-1"
                  />
                </div>
              )}
              {/* <ul className="divide-y divide-gray-200">{renderJobs()}</ul> */}
            </div>

            {/* <p className="mt-12 text-3xl font-bold leading-tight text-gray-700 none">
              Individual Applications
            </p> */}
            {/* <div className="flex flex-col mt-4 none">
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
                            Closing Date
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>{renderApplications()}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </main>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  jobs: state.jobs,
  application: state.application,
})

export default connect(mapStateToProps, {
  ...jobActions,
  ...applicationActions,
})(RecruiterApplicationContainer)
